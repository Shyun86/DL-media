#!/bin/sh

# Couleurs pour les prompts
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# --- Section de nettoyage global (Optionnel) ---
printf "${YELLOW}❓ Voulez-vous effectuer un nettoyage complet de Docker (supprime conteneurs, réseaux, volumes et images inutilisés SUR TOUT LE SYSTÈME) ? (y/N) ${NC}"
read -r answer_prune
if [ "$answer_prune" = "y" ] || [ "$answer_prune" = "Y" ]; then
    printf "${RED}ATTENTION : Cette action est destructive et affecte tous vos projets Docker, pas seulement celui-ci.${NC}\n"
    printf "${YELLOW}Êtes-vous absolument certain(e) ? (y/N) ${NC}"
    read -r answer_prune_confirm
    if [ "$answer_prune_confirm" = "y" ] || [ "$answer_prune_confirm" = "Y" ]; then
        echo "🧹 Nettoyage complet de Docker en cours..."
        docker system prune -a -f --volumes
    else
        echo "Nettoyage global annulé."
    fi
fi

echo "\n🛑 Arrêt forcé des conteneurs du projet (Kill)..."
docker compose kill

echo "🧹 Suppression des conteneurs et réseaux du projet..."
docker compose down --volumes --remove-orphans

echo "🔥 Réinitialisation du volume de la base de données du projet..."
rm -rf ./data/postgres
mkdir -p ./data/postgres

echo "✨ Nettoyage du projet terminé !"

# --- Section Interactive ---

# Demander pour le build
printf "${YELLOW}❓ Voulez-vous forcer le re-build des images (backend, worker, frontend) ? (y/N) ${NC}"
read -r answer_build
if [ "$answer_build" = "y" ] || [ "$answer_build" = "Y" ]; then
    echo "🗑️ Suppression des anciennes images du projet..."
    docker compose build --no-cache
    docker rmi $(docker images -f "dangling=true" -q) 2>/dev/null || true
else
    echo "Skipping build."
fi

# Demander pour le up
printf "${YELLOW}❓ Voulez-vous démarrer les conteneurs maintenant ? (y/N) ${NC}"
read -r answer_up
if [ "$answer_up" = "y" ] || [ "$answer_up" = "Y" ]; then
    echo "🚀 Démarrage des conteneurs en mode détaché..."
    docker compose up -d
    echo "\n${CYAN}Pour voir les logs, utilisez : docker compose logs -f <nom-du-service>${NC}"
else
    echo "Skipping startup. Vous pouvez lancer les conteneurs avec 'docker compose up -d'."
fi

echo "\n✅ Script terminé."
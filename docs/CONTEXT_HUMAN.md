# MediaFetcher — Project Context (Human)

## 1. Description générale

MediaFetcher est une plateforme web auto-hébergée (Self-hosted) permettant :
- d’agréger des contenus médias (Instagram, TikTok, Reddit, X, YouTube Shorts),
- de **télécharger** ces médias via un site web ou une extension navigateur,
- de les **stocker sur un serveur local** (NAS),
- de les organiser via des **libraries virtuelles** (dossiers),
- de visionner le contenu via un player web compatible.

## 2. Infrastructure & Hardware

Le projet tourne dans un environnement "Homelab" sous **Proxmox**.

### Machine Hôte
- **Type :** Conteneur LXC.
- **OS :** Alpine Linux (léger).
- **Déploiement :** Docker (via Docker Compose) à l'intérieur du LXC (Nesting activé).

### Stockage (NAS)
- **Type :** Machine Virtuelle (VM) TrueNAS Scale hébergée sur le **même serveur Proxmox**.
- **Protocole :** Montage SMB ou NFS monté dans le conteneur LXC MediaFetcher.
- **Avantage :** Vitesse de transfert très élevée (réseau interne au serveur).

### Réseau
- Accès local + Accès distant.
- **Gestion Cookies :** Pour éviter les blocages IP, l'utilisateur activera manuellement son VPN résidentiel avant de rafraîchir les cookies via l'extension s'il est à l'extérieur.

---

## 3. Plateformes supportées (V1)

- Instagram
- TikTok
- Reddit
- Twitter / X
- YouTube (⚠️ uniquement Shorts)

---

## 4. Architecture Logicielle

1. **Frontend Web :** React, UI sombre, lecture vidéo fluide.
2. **Backend API :** Python (FastAPI). Gère les téléchargements, la base de données et le transcodage.
3. **Extension Navigateur :** Sert à l'extraction des cookies et au déclenchement rapide des téléchargements.

---

## 5. Fonctionnalités Clés

### Dashboard & Home
- Vue globale des tâches.
- Feed local des médias téléchargés (Player MP4 intégré).

### Library (Organisation)
- Dossiers virtuels.
- **Suppression intelligente** : Utilisation du "Reference Counting". Le fichier physique sur le TrueNAS n'est supprimé que si plus aucun dossier virtuel ne l'utilise.

### Feed (LIVE - Mode "Hardcore")
- Agrégateur de flux externes.
- **Best Effort :** Si une plateforme casse (API, Bot protection), le module se désactive proprement. Pas d'acharnement technique excessif.

### Settings
- Gestion des comptes.
- Pairing extension.

---

## 6. Extension Navigateur

- **Action :** Clic droit ou Popup -> "Download". Pas de modification du DOM des sites tiers.
- **Cookies :** Export vers le backend. (VPN manuel requis si hors domicile).
- **Stack :** Manifest V3.

---

## 7. Philosophie V1

- **Docker-First :** Tout doit tourner via `docker-compose` pour faciliter la gestion des dépendances (Redis, Postgres, FFmpeg).
- **Stabilité :** On privilégie la fiabilité du téléchargement sur l'agrégation live.
- **Performance :** Le transcodage (FFmpeg) doit être efficace pour rendre les fichiers lisibles sur le web.

---

Fin du fichier.
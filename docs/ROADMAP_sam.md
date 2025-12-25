# 🗺️ ROADMAP & GUIDE : Projet MediaFetcher

Ce document sert de plan de bataille pour le développement du projet MediaFetcher sur Alpine Linux (LXC/Proxmox).

---

## 🛠️ PHASE 0 : Préparation & Configuration (Avant de coder)

**Objectif :** Transformer ton environnement et ton VS Code en cockpit de pilotage pour IA.

### 1. Sur le Serveur (LXC Alpine)
- [ ] Mettre à jour : `apk update && apk upgrade`
- [ ] Installer Docker : `apk add docker docker-cli-compose git`
- [ ] Activer Docker au boot : `rc-update add docker boot && service docker start`
- [ ] Monter le NAS TrueNAS : S'assurer que le dossier `/mnt/media` (ou autre point de montage) est accessible en lecture/écriture.

### 2. Dans VS Code (Configuration IA)
- [ ] **Fichiers de Contexte :**
    - Créer `GEMINI.md` à la racine du projet (copie exacte de `docs/CONTEXT_AI.md`).
    - Vérifier que le dossier `docs/` contient bien `CONTEXT_HUMAN.md` et `CONTEXT_AI.md`.
- [ ] **Extension Codex (OpenAI) :**
    - Aller dans les *Settings* de l'extension.
    - Chercher "System Prompt" ou "Instructions".
    - Coller le résumé des règles (Alpine, Ref Counting, MP4, TrueNAS).
- [ ] **Extension Gemini :**
    - S'assurer que le fichier `GEMINI.md` est bien détecté (ou le garder ouvert en permanence).

---

## 🏗️ PHASE 1 : L'Infrastructure (Docker)

**Prompt IA suggéré (Gemini Agent) :**
> *"En te basant sur GEMINI.md, génère l'arborescence du projet et le fichier `docker-compose.yml` complet. Il nous faut : un service Postgres, un service Redis, un container Backend (Python 3.11-slim ou Alpine) et un container Frontend (Node pour le build). N'oublie pas le mapping du volume NAS."*

**Points de vigilance :**
- Vérifie que le `docker-compose.yml` utilise bien des images légères.
- Vérifie que le volume du NAS est bien monté dans le service Backend.

---

## 🧠 PHASE 2 : Le Backend (Core & Database)

**Objectif :** Créer la logique de "Reference Counting" avant tout le reste.

### 1. Initialisation FastAPI
- [ ] Structure de base FastAPI (main.py, config.py).
- [ ] Connexion DB (SQLAlchemy + Asyncpg).

### 2. Modèles de Données (CRITIQUE)
**Prompt IA suggéré (Codex ou Gemini) :**
> *"Écris les modèles SQLAlchemy pour `MediaFile` et `LibraryItem` en appliquant strictement la logique de Reference Counting décrite dans le contexte. `MediaFile` doit avoir un hash unique."*

### 3. Logique de Gestion de Fichiers
- [ ] Créer les fonctions CRUD : `add_media` (check hash, incrémente ref_count) et `delete_media` (décrémente, supprime fichier si 0).

---

## ⚙️ PHASE 3 : Le Moteur de Téléchargement

**Objectif :** Télécharger proprement et convertir pour le Web.

### 1. Worker System
- [ ] Mettre en place Arq (avec Redis) pour les tâches en arrière-plan.

### 2. Le Wrapper yt-dlp & FFmpeg
**Prompt IA suggéré :**
> *"Crée une task Python qui prend une URL et des cookies. Elle doit : 1. Télécharger avec yt-dlp. 2. Vérifier le format. 3. Si ce n'est pas du MP4/H264, lancer une conversion FFmpeg. 4. Sauvegarder sur le NAS et mettre à jour la BDD."*

**Points de vigilance :**
- Vérifie que l'IA gère les erreurs (try/except) pour ne pas crasher le worker.
- Le transcodage est lourd : surveille le CPU de ton LXC lors des tests.

---

## 🎨 PHASE 4 : Le Frontend (Interface)

**Objectif :** Voir ce qu'on a téléchargé.

### 1. Setup
- [ ] Initialiser React + Vite + Tailwind + Shadcn/ui.

### 2. Features
- [ ] **Dashboard :** Connecter via WebSocket ou Polling pour voir l'avancement des téléchargements.
- [ ] **Player Vidéo :** Un simple tag `<video>` HTML5 suffit car on a forcé le MP4 au backend.
- [ ] **Bibliothèque :** Affichage des dossiers virtuels.

---

## 🧩 PHASE 5 : L'Extension Navigateur

**Objectif :** Envoyer les cookies et les liens.

- [ ] Créer le `manifest.json` (V3).
- [ ] Popup : Bouton "Extract Cookies" (envoi au backend chiffré).
- [ ] Context Menu : "Download to MediaFetcher".

---

## 🤖 GUIDE DE SURVIE IA : Comment leur parler ?

### Règle d'Or : Le "Priming"
Avant de demander du code complexe, rappelle toujours le contexte si tu n'es pas sûr que l'Agent l'a lu.

### Quand utiliser Gemini (Google) ?
Utilise-le en **Mode Agent** pour l'architecture et les liens entre fichiers.
*Exemple :* "J'ai modifié le modèle `MediaFile` dans le backend. Mets à jour les types TypeScript dans le frontend pour correspondre."

### Quand utiliser Codex (OpenAI) ?
Utilise-le pour des algorithmes purs ou des scripts précis.
*Exemple :* "Écris une fonction Python optimisée pour calculer le SHA256 d'un gros fichier par chunks pour ne pas saturer la RAM."

### Les Mots-Clés Magiques à utiliser dans tes prompts
- **"Strictly follow GEMINI.md"** : Pour éviter les hallucinations.
- **"Alpine compatible"** : Pour éviter les erreurs d'installation système.
- **"Self-hosted context"** : Pour qu'il ne te propose pas AWS S3 ou Cloudinary.
- **"Reference Counting Logic"** : À répéter dès qu'on touche à la suppression.

---

## 📝 Check-list de Démarrage Rapide

1.  Créer les fichiers `.md` de doc.
2.  Configurer VS Code (Extensions).
3.  Lancer le prompt pour le `docker-compose.yml`.
4.  Démarrer les conteneurs : `docker compose up -d`.
5.  Vérifier que Postgres et Redis tournent.
6.  Coder !
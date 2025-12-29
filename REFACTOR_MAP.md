# 🗺️ Frontend Refactoring Map

Ce document définit comment transformer les fichiers de maquette (mocks) en une architecture propre.
L'IA doit suivre cette structure pour générer le code.

## 1. Arborescence Cible
Voici la structure exacte attendue pour le dossier `/src` :

```text
/src
├── api/
│   ├── client.ts           # Axios setup
│   └── types.ts            # Interfaces TypeScript (Job, MediaItem, FeedItem, User, Notification)
├── components/
│   ├── layout/
│   │   ├── MainLayout.tsx  # Wrapper (Sidebar + Outlet) - Pour l'app connectée
│   │   ├── AuthLayout.tsx  # Wrapper (Centré + Logo) - Pour Login/Signup
│   │   ├── Sidebar.tsx     # Navigation Desktop
│   │   └── MobileNav.tsx   # Header Mobile + Sheet
│   └── shared/             # Composants réutilisables
│       ├── StatusBadge.tsx
│       ├── PlatformBadge.tsx
│       ├── TypePill.tsx
│       └── ViewerModal.tsx # Visionneuse Média (Commun Home/Feed/Library)
├── features/
│   ├── auth/               # 🔐 NOUVEAU
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── LoginPage.tsx
│   │   └── SignupPage.tsx
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── StatCard.tsx
│   │   │   └── ActivityList.tsx
│   │   └── DashboardPage.tsx
│   ├── feed/
│   │   ├── components/
│   │   │   ├── FeedCard.tsx
│   │   │   └── FeedFilters.tsx
│   │   └── FeedPage.tsx
│   ├── home/
│   │   ├── components/
│   │   │   ├── HeroInput.tsx
│   │   │   ├── HomeFilters.tsx.tsx
│   │   │   └── MediaCard.tsx
│   │   └── HomePage.tsx
│   ├── library/            
│   │   ├── components/
│   │   │   └── LibraryFilters.tsx
│   │   └── LibraryPage.tsx
│   ├── notifications/
│   │   ├── components/
│   │   │   ├── NotificationItem.tsx
│   │   │   └── NotificationFilters.tsx # Pills (All, Unread, Failed...)
│   │   └── NotificationsPage.tsx
│   └── settings/
│       ├── components/
│       │   └── SettingsSection.tsx
│       └── SettingsPage.tsx
├── hooks/
│   └── use-mobile.tsx
├── lib/
│   └── utils.ts
├── App.tsx                 # Routes (React Router)
└── main.tsx

# 2. Instructions Détaillées par Feature
Extraction des Composants (Source -> Destination)
📄 Source: exemple-test-dashboard-page.tsx
Sidebar ➡️ src/components/layout/Sidebar.tsx

Action: Retirer la logique de "collapse" locale, utiliser un Store ou Props.

Action: Retirer la liste nav en dur, la mettre dans une constante globale ou config.

StatusBadge & StatusIcon ➡️ src/components/shared/StatusBadge.tsx

Note: Rendre le composant générique pour accepter le status string.

Card (Stats) ➡️ src/features/dashboard/components/StatCard.tsx

Recent Activity List ➡️ src/features/dashboard/components/ActivityList.tsx

Note: Séparer la logique d'affichage d'un item (JobItem).

Types (Job, JobStatus) ➡️ src/api/types.ts

📄 Source: exemple-test-feed-page.tsx
FeedCard (La carte verticale TikTok-style) ➡️ src/features/feed/components/FeedCard.tsx

Action: Garder la logique d'intersection observer (autoplay) à l'intérieur.

ViewerContent ➡️ src/components/shared/ViewerModal.tsx

Important: Ce composant doit être accessible depuis le Feed ET le Home. Il doit être générique.

PlatformBadge ➡️ src/components/shared/PlatformBadge.tsx

TypePill ➡️ src/components/shared/TypePill.tsx

Types (FeedItem, MediaType) ➡️ src/api/types.ts (Fusionner avec MediaItem).

Home (Galerie)
Image Ref : image-test-page-home.jpg

HomeFilters : Barre contenant un Input Search + 2 Select (Types, Platforms).

MediaCard : Différent de FeedCard. Affiche une miniature 16:9 ou carrée, le titre en gras, les badges en bas, et un bouton "Play/Open" au survol ou en overlay.

📄 Source: exemple-test-settings-page.tsx
Cards sections ➡️ Créer un composant générique SettingsCard ou SettingsSection dans features/settings/components/ pour éviter la répétition du code (Header + Content).

Library (Dossiers)
Image Ref : image-test-page-library.jpg

FolderCard (Complexe) :

Header : Nom du dossier + Tag "Folder" + Badge "X subfolders".

Body : Liste des sous-dossiers (ex: "To sort", "Favorites") avec leur taille.

Footer : Bouton "Open >".

Style : Background sombre (bg-white/5), bordures fines.

🔔 Notifications
Image Ref : image-test-page-notifications.png

NotificationFilters : Liste de "Pills" cliquables (All, Unread, Downloads, Failed) + Icone Filtre à droite.

NotificationItem :

Layout : Flex row. Icone à gauche (status). Contenu au centre (Titre + Description + Timestamp). Actions à droite (Bouton "View" ou "Retry").

Styles : Bordure colorée selon le statut (Rouge pour Failed, Vert pour Completed).

Auth (Login / Signup)
Image Ref : image-test-page-login.png / signup

Composant AuthLayout : Doit centrer le contenu verticalement/horizontalement avec le logo "MediaFetcher" au-dessus.

Forms : Utiliser les composants Shadcn (Card, Input, Button, Checkbox) avec le style violet (accent color).

# 3. Instructions Globales
Icones : Utiliser lucide-react comme dans les mocks.

UI Library : Utiliser les composants src/components/ui/ (Shadcn) déjà installés.

Navigation : MainLayout doit utiliser <Outlet /> de react-router-dom.

Données : Pour l'instant, garder les tableaux const mockData = [...] mais les déplacer dans les fichiers Page respectifs ou un fichier src/api/mocks.ts pour ne pas polluer les composants visuels.
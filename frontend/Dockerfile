# Base image Node 20 sur Alpine (très léger)
FROM node:20-alpine

# Active corepack pour utiliser pnpm sans l'installer manuellement
RUN corepack enable

WORKDIR /app

# Copie uniquement les fichiers de dépendances d'abord (cache docker)
COPY package.json pnpm-lock.yaml* ./

# Installation propre avec pnpm
RUN pnpm install --frozen-lockfile || pnpm install

# Copie le reste du code
COPY . .

# Expose le port Vite
EXPOSE 5173

# Lance le serveur de dev en mode hôte (accessible depuis l'extérieur)
CMD ["pnpm", "run", "dev", "--", "--host"]
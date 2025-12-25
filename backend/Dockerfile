FROM python:3.11-slim

WORKDIR /app

# Installation de ffmpeg et nettoyage pour garder l'image petite
RUN apt-get update && \
    apt-get install -y --no-install-recommends ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Copie des requirements
COPY requirements.txt .

# Installation sans cache pour alléger l'image
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# Attention : Assure-toi que ton fichier principal s'appelle main.py
# Si main.py est à la racine du dossier backend, la commande est :
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
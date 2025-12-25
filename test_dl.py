import asyncio
from arq import create_pool
from arq.connections import RedisSettings

async def main():
    # 1. Connexion à Redis
    # On utilise le nom d'hôte 'redis' défini dans docker-compose
    redis = await create_pool(RedisSettings(host='redis', port=6379))

    # 2. URL de test (Big Buck Bunny, une vidéo courte et libre)
    url = "https://www.youtube.com/watch?v=aqz-KE-bpKQ"

    print(f"Envoi de la demande de téléchargement pour : {url}")

    # 3. Envoi de la tâche au Worker
    await redis.enqueue_job('download_media_task', url)

    print("✅ Tâche envoyée avec succès !")
    await redis.close()

# Lancement
asyncio.run(main())
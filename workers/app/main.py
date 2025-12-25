# Placeholder for worker settings
async def startup(ctx):
    print("Worker starting up")

async def shutdown(ctx):
    print("Worker shutting down")

class WorkerSettings:
    on_startup = startup
    on_shutdown = shutdown
    # Add your worker functions here
    # functions = [your_function]

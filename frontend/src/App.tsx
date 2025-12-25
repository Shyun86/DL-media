import { useState } from 'react'

// Types TypeScript
type StatusType = {
  type: 'success' | 'error';
  msg: string;
} | null;

type BackendResponse = {
  status: string;
  message: string;
  url: string;
}

function App() {
  const [url, setUrl] = useState<string>('')
  const [status, setStatus] = useState<StatusType>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setStatus(null);

    try {
      // Construction dynamique de l'URL
      const backendUrl = `http://${window.location.hostname}:8000/api/download`;
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url })
      });

      if (response.ok) {
        // On ignore le warning de variable inutilisée car on veut juste confirmer le succès
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _data: BackendResponse = await response.json();
        setStatus({ type: 'success', msg: '🚀 Téléchargement lancé sur le NAS !' });
        setUrl('');
      } else {
        setStatus({ type: 'error', msg: 'Le backend a refusé la demande.' });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', msg: 'Backend injoignable (Vérifie le port 8000).' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-700">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-400 mb-2 tracking-tight">MediaFetcher</h1>
          <p className="text-slate-400 text-sm font-medium">Downloader Centralisé (TS Edition)</p>
        </div>
        
        <div className="flex flex-col gap-5">
          <div className="relative">
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Colle un lien YouTube, TikTok, Reddit..." 
              className="w-full p-4 pl-5 rounded-xl bg-slate-900 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-white placeholder-slate-500 transition-all"
            />
          </div>
          
          <button 
            onClick={handleDownload} 
            disabled={loading}
            className={`w-full p-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
              loading 
                ? 'bg-slate-600 cursor-not-allowed text-slate-400' 
                : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-blue-500/25'
            }`}
          >
            {loading ? 'Traitement en cours...' : 'Télécharger maintenant 📥'}
          </button>
        </div>

        {status && (
          <div className={`mt-8 p-4 rounded-lg text-center font-medium border animate-pulse ${
            status.type === 'success' 
              ? 'bg-green-500/10 text-green-400 border-green-500/20' 
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
            {status.msg}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
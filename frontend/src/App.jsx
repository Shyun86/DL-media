import { useState } from 'react'

function App() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setStatus(null);

    try {
      const backendUrl = `http://${window.location.hostname}:8000/api/download`;
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url })
      });

      if (response.ok) {
        setStatus({ type: 'success', msg: '🚀 Téléchargement lancé sur le NAS !' });
        setUrl('');
      } else {
        setStatus({ type: 'error', msg: 'Erreur backend.' });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', msg: 'Backend injoignable (Port 8000 fermé ?).' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-700">
        <h1 className="text-4xl font-extrabold text-blue-400 mb-2 text-center">MediaFetcher</h1>
        <p className="text-slate-400 text-sm font-medium text-center mb-8">Downloader Centralisé</p>
        
        <div className="flex flex-col gap-5">
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Lien YouTube, TikTok..." 
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-600 focus:border-blue-500 outline-none text-white transition-all"
          />
          
          <button 
            onClick={handleDownload} 
            disabled={loading}
            className={`w-full p-4 rounded-xl font-bold text-lg transition-all ${
              loading 
                ? 'bg-slate-600 cursor-not-allowed text-slate-400' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
            }`}
          >
            {loading ? 'Envoi...' : 'Télécharger 📥'}
          </button>
        </div>

        {status && (
          <div className={`mt-8 p-4 rounded-lg text-center font-medium border ${
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

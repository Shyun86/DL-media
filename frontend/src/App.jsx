import { useState } from 'react'
import './App.css' // Assure-toi que ce fichier existe, même vide

function App() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fonction appelée quand on clique sur le bouton
  const handleDownload = async () => {
    if (!url) return;
    
    setLoading(true);
    setStatus(null);

    try {
      // On construit l'URL du backend dynamiquement
      // (Prend l'IP du navigateur et tape sur le port 8000)
      const backendUrl = `http://${window.location.hostname}:8000/api/download`;

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url })
      });

      if (response.ok) {
        setStatus({ type: 'success', msg: '🚀 Téléchargement lancé ! Vérifie le dossier Media.' });
        setUrl(''); // Vide le champ
      } else {
        setStatus({ type: 'error', msg: 'Erreur lors de l\'envoi de la commande.' });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', msg: 'Impossible de contacter le serveur Backend.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>📺 App-DL Media Downloader</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Colle un lien YouTube ici..." 
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button 
          onClick={handleDownload} 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            fontSize: '16px', 
            backgroundColor: loading ? '#ccc' : '#007bff', 
            color: 'white', 
            border: 'none', 
            cursor: loading ? 'not-allowed' : 'pointer' 
          }}
        >
          {loading ? 'Envoi...' : 'Télécharger'}
        </button>
      </div>

      {status && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da',
          color: status.type === 'success' ? '#155724' : '#721c24',
          borderRadius: '5px'
        }}>
          {status.msg}
        </div>
      )}
    </div>
  )
}

export default App
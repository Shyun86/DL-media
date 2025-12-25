document.getElementById('sendBtn').addEventListener('click', async () => {
  const status = document.getElementById('status');
  status.textContent = "Analyse...";
  status.className = "";

  try {
    // 1. Récupérer l'onglet actif
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab || !tab.url) {
      status.textContent = "Impossible de lire l'URL (Page vide ?)";
      return;
    }

    // 2. CORRECTION MAJEURE : On récupère par URL et non par Domaine
    // Cela inclut automatiquement www.youtube.com ET .youtube.com
    const cookies = await chrome.cookies.getAll({ url: tab.url });
    
    if (cookies.length === 0) {
      status.textContent = "0 cookie trouvé 🤷‍♂️ (Es-tu connecté ?)";
      status.className = "error";
      return;
    }

    // 3. Envoyer au Backend
    const API_URL = "http://192.168.1.252:8000/api/update-cookies";
    
    status.textContent = `Envoi de ${cookies.length} cookies...`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: tab.url,
        cookies: cookies
      })
    });

    if (response.ok) {
      status.textContent = `Succès ! ${cookies.length} cookies transférés ✅`;
      status.className = "success";
    } else {
      status.textContent = "Erreur Backend (Vérifie le port 8000)";
      status.className = "error";
    }

  } catch (error) {
    console.error(error);
    status.textContent = "Erreur : " + error.message;
    status.className = "error";
  }
});
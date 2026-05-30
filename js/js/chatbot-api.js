// Module API pour Chatbot
async function callGeminiAPI(message) {
  if (!API_CONFIG.GEMINI_API_KEY) {
    return "Veuillez configurer votre clé Gemini API dans les paramètres.";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_CONFIG.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: message
            }]
          }]
        })
      }
    );

    const data = await response.json();
    return data.candidates[0].content.parts[0].text || "Pas de réponse";
  } catch (error) {
    console.error('Erreur Gemini:', error);
    return "Erreur lors de l'appel API. Vérifiez votre clé.";
  }
}

async function generateImageWithHuggingFace(prompt) {
  if (!API_CONFIG.HUGGINGFACE_API_KEY) {
    return null;
  }

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
      {
        headers: { Authorization: `Bearer ${API_CONFIG.HUGGINGFACE_API_KEY}` },
        method: 'POST',
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const result = await response.blob();
    return URL.createObjectURL(result);
  } catch (error) {
    console.error('Erreur image generation:', error);
    return null;
  }
}

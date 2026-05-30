// Configuration des APIs Gratuites
const API_CONFIG = {
  GEMINI_API_KEY: '', // À obtenir gratuitement
  HUGGINGFACE_API_KEY: '', // À obtenir gratuitement
};

function loadAPIKeys() {
  const savedKeys = localStorage.getItem('api-keys');
  if (savedKeys) {
    try {
      const keys = JSON.parse(savedKeys);
      Object.assign(API_CONFIG, keys);
    } catch (e) {
      console.log('Erreur chargement clés API');
    }
  }
}

function saveAPIKeys(keys) {
  try {
    localStorage.setItem('api-keys', JSON.stringify(keys));
    Object.assign(API_CONFIG, keys);
    return true;
  } catch (e) {
    return false;
  }
}

loadAPIKeys();
window.API_CONFIG = API_CONFIG;
window.saveAPIKeys = saveAPIKeys;

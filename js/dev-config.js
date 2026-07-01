/**
 * Konfiguracja deweloperska
 * Ustaw DEV_MODE = true aby wyłączyć zabezpieczenia podczas testowania
 */

window.DEV_CONFIG = {
  // UWAGA: NIGDY nie wdrażaj z DEV_MODE = true na produkcję!
  DEV_MODE: true, // Zmień na true aby wyłączyć zabezpieczenia

  // Opcje deweloperskie
  SKIP_AUTH_CHECK: true, // Pomija sprawdzanie autentykacji
  SKIP_PWA_CHECK: true, // Pomija sprawdzanie trybu PWA
  SKIP_MOBILE_CHECK: true, // Pomija sprawdzanie urządzenia mobilnego
  ALLOW_DESKTOP: true, // Pozwala na dostęp z desktopa
  LOG_VERBOSE: true, // Szczegółowe logi w konsoli
};

// Auto-konfiguracja dla DEV_MODE
if (window.DEV_CONFIG.DEV_MODE) {
  console.warn("🔧 DEV_MODE AKTYWNY - Wszystkie zabezpieczenia WYŁĄCZONE!");
  console.warn("⚠️ NIE WDRAŻAJ na produkcję w tym trybie!");

  window.DEV_CONFIG.SKIP_AUTH_CHECK = true;
  window.DEV_CONFIG.SKIP_PWA_CHECK = true;
  window.DEV_CONFIG.SKIP_MOBILE_CHECK = true;
  window.DEV_CONFIG.ALLOW_DESKTOP = true;
  window.DEV_CONFIG.LOG_VERBOSE = true;
}

console.log("[Dev Config] Loaded:", window.DEV_CONFIG);

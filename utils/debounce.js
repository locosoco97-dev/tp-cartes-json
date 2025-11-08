/**
 * Fonction de debounce pour optimiser les performances
 * @param {Function} func - La fonction à debouncer
 * @param {number} wait - Temps d'attente en millisecondes
 * @returns {Function} Fonction debouncée
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}


/**
 * Utilitaires pour la gestion des images
 */

/**
 * Vérifie si l'image est une URI ou une référence locale
 * @param {string|number} image - Source de l'image
 * @returns {object} Source formatée pour Image component
 */
export const getImageSource = (image) => {
  if (typeof image === 'number') {
    return image;
  }
  if (typeof image === 'string' && image.startsWith('http')) {
    return { uri: image };
  }
  return image;
};


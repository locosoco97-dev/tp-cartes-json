# TP Cartes JSON - Application React Native

Application mobile développée avec Expo et React Native pour afficher des cartes d'information sur différentes technologies.

## 🚀 Améliorations de Performance

### Optimisations Implementées

1. **Memoization des Composants**
   - Utilisation de `React.memo()` pour `CardItem` afin d'éviter les re-renders inutiles
   - `useCallback()` pour toutes les fonctions de gestion d'événements
   - `useMemo()` pour les calculs coûteux (filtrage, tri, couleurs)

2. **Optimisation de FlatList**
   - `removeClippedSubviews={true}` pour améliorer les performances de scroll
   - `maxToRenderPerBatch={10}` pour limiter le nombre d'éléments rendus par batch
   - `initialNumToRender={10}` pour un chargement initial optimisé
   - `windowSize={10}` pour un rendu efficace

3. **Debouncing de la Recherche**
   - Implémentation d'un debounce de 300ms sur la barre de recherche
   - Réduction significative des calculs de filtrage

4. **Gestion Optimisée des Images**
   - Fonction utilitaire `getImageSource()` pour gérer les sources d'image
   - Support des images locales et distantes

## 🏗️ Structure du Code

### Organisation

```
tp-cartes-json/
├── components/          # Composants React
│   ├── CardItem.js      # Composant de carte individuelle
│   └── CardList.js      # Liste des cartes avec filtres
├── constants/           # Constantes réutilisables
│   ├── colors.js        # Palette de couleurs
│   └── spacing.js        # Espacements et dimensions
├── data/                # Données statiques
│   └── cards.json       # Données des cartes
├── utils/               # Utilitaires
│   ├── debounce.js      # Fonction de debounce
│   └── imageUtils.js    # Utilitaires pour images
├── App.js              # Composant principal
└── index.js            # Point d'entrée
```

### Améliorations Structurelles

1. **Séparation des Constantes**
   - Palette de couleurs centralisée dans `constants/colors.js`
   - Espacements standardisés dans `constants/spacing.js`

2. **Utilitaires Réutilisables**
   - Fonction `debounce()` pour optimiser les performances
   - Utilitaires pour la gestion des images

3. **Code Maintenable**
   - Styles utilisant les constantes au lieu de valeurs hardcodées
   - Props d'accessibilité ajoutées partout
   - Gestion d'erreurs améliorée

## ♿ Accessibilité

- Ajout de `accessibilityLabel` sur tous les éléments interactifs
- Utilisation de `accessibilityRole` pour une meilleure compatibilité
- Labels descriptifs pour les lecteurs d'écran

## 📦 Dépendances

- `expo` ~54.0.20
- `react` 19.1.0
- `react-native` 0.81.5
- `@expo/vector-icons` (inclus dans Expo)

## 🎯 Scripts Disponibles

```bash
# Démarrer le serveur de développement
npm start

# Démarrer sur Android
npm run android

# Démarrer sur iOS
npm run ios

# Démarrer sur Web
npm run web
```

## 📝 Notes Techniques

- Les cartes utilisent des animations natives avec `useNativeDriver: true`
- La recherche est optimisée avec un debounce de 300ms
- Le filtrage et le tri sont memoïsés pour éviter les recalculs inutiles
- Support des images locales (require) et distantes (URI)


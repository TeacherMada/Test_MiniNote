# 🪄 Mini Note Magique

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Status](https://img.shields.io/badge/status-active-success.svg) ![AI](https://img.shields.io/badge/AI-Gemini%203.0-purple)

Bienvenue dans votre application de bloc-notes **Magique** ! Chaque nouvelle note reçoit une couleur d'accentuation aléatoire, rendant votre tableau d'affichage plus vibrant.

## ✨ Fonctionnalités Magiques
- 🌈 **Couleurs Aléatoires** : Chaque note (et sa bordure) reçoit une couleur d'accentuation vibrante tirée d'une palette prédéfinie.
- 🌗 **Thème Sombre/Clair Dynamique** : Amélioration de l'esthétique avec des accents violets pour la magie.
- 🔔 **Notifications Toast** : Feedback visuel moderne pour les actions critiques (ajout/suppression de note).
- 🔮 **Design Amélioré** : Utilisation de styles de titre dégradés et d'un design de carte amélioré (Glassmorphism).
- 📝 **Interface Glassmorphism** : Un panneau de saisie moderne et transparent.
- 💾 **Persistance** : Les notes et le thème sont sauvegardés dans le `localStorage`.

## 🛠️ Stack Technique
- **HTML5 & Vanilla JS (ES6+)** : Logique sans dépendance externe lourde.
- **Tailwind CSS (CDN)** : Styling moderne et rapide.

## 🚀 Démarrage Rapide (Local)

1. **Ouvrir** le fichier `index.html` dans votre navigateur web.

## 🔮 Changements Majeurs par rapport à la version précédente
*   **Ajout des Toasts Notifications** : Implémentation d'un système de notifications de type 'toast' (succès/erreur) pour un meilleur feedback utilisateur.
*   Le bouton d'ajout affiche désormais des icônes d'étincelles (`sparkles`).
*   Les couleurs de thème (surtout le violet) ont été intégrées dans le CSS et JS pour renforcer l'aspect "magique".
*   Chaque note stocke désormais une `colorClass` pour que sa bordure reste la même, quel que soit le thème sélectionné.
*   Styling des titres (H1/P) et des champs de saisie affinés pour mieux correspondre au look Glassmorphism et aux thèmes.

---
*Généré avec ❤️ par TsantaBot AI*

# NinjaKana - Apprends le Japonais

Application mobile React Native / Expo pour apprendre le japonais (Hiragana, Katakana, Kanji N5).

## Version

**Version** : 1.0.0
**Status** : Production - Prêt pour Google Play Store

## Fonctionnalités

### Contenu
- 22 leçons (Hiragana, Katakana, Vocabulaire)
- 100 Kanji essentiels JLPT N5
- Audio japonais (VOICEVOX)

### Apprentissage
- Système SRS (répétition espacée - algorithme SM-2)
- Exercices variés (QCM, transcription, reconnaissance)
- Progression sauvegardée localement

### Gamification
- Système de vies avec récupération gratuite
- Streak quotidien avec protection Bouclier Ninja
- Quêtes quotidiennes
- Badges et rangs ninja

### Monétisation
- Version gratuite avec publicités (AdMob)
- Premium : exercices illimités, vies illimitées, sans pub
- Gestion abonnements via RevenueCat

## Structure

```
JaponaisApp/
├── mobile-app/          # Application React Native / Expo
│   ├── src/
│   │   ├── screens/     # Écrans de l'app
│   │   ├── components/  # Composants réutilisables
│   │   ├── services/    # Logique métier (SRS, lives, premium...)
│   │   ├── data/        # Données des leçons
│   │   └── styles/      # Thème et styles
│   └── assets/          # Images, icônes, audio
├── docs/                # GitHub Pages (Privacy Policy)
├── play-store-assets/   # Assets pour le Play Store
└── scripts/             # Scripts utilitaires (génération audio)
```

## Installation

```bash
cd mobile-app
npm install
npx expo start
```

## Build Production

```bash
cd mobile-app
npx eas build --platform android --profile production
```

## Liens

- **Privacy Policy** : https://ninjakana.github.io/App/privacy-policy.html
- **Contact** : contact.ninjakana@gmail.com

## Licence

Propriétaire - Tous droits réservés - NinjaKana 2026

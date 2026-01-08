# Play Store Assets - NinjaKana

## Structure du dossier

```
play-store-assets/
├── icon-512.png              ← Icône (redimensionner à 512x512)
├── feature-graphic.png       ← Feature Graphic (1024x500) ⚠️ À SAUVEGARDER ICI
├── feature-graphic.html      ← Template HTML (source)
├── screenshots/              ← Screenshots de l'app
│   ├── 01-accueil.png
│   ├── 02-lecon.png
│   ├── 03-exercice.png
│   └── 04-premium.png
└── README.md
```

## Checklist des assets

### Obligatoires
- [ ] **Icône** : 512x512 PNG (icon-512.png - redimensionner depuis 1024x1024)
- [ ] **Feature Graphic** : 1024x500 PNG
- [ ] **Screenshots** : Minimum 2, recommandé 4-8

### Spécifications

| Asset | Dimensions | Format |
|-------|------------|--------|
| Icône | 512x512 | PNG 32-bit |
| Feature Graphic | 1024x500 | PNG ou JPG |
| Screenshots Phone | 16:9 ou 9:16 | PNG ou JPG |

### Screenshots recommandés
1. **Accueil** - Dashboard avec streak et quêtes
2. **Leçon** - Apprentissage Hiragana/Katakana
3. **Exercice** - QCM ou transcription
4. **Premium** - Écran Paywall avec fonctionnalités

## Instructions

### Feature Graphic
1. Ouvrir `feature-graphic.html` dans Chrome
2. F12 → Inspecteur → Clic droit sur `<div class="feature-graphic">`
3. "Capturer une capture d'écran du nœud"
4. Sauvegarder comme `feature-graphic.png` dans ce dossier

### Icône 512x512
L'icône source est 1024x1024. Pour redimensionner :
- Utiliser un éditeur d'image (Paint, Photoshop, GIMP)
- Ou en ligne : https://www.iloveimg.com/resize-image

### Screenshots
- Prendre directement depuis le téléphone via Expo Go
- Format portrait (9:16) recommandé
- Résolution minimum : 320px, maximum : 3840px

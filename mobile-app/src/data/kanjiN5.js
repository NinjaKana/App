/**
 * Kanji N5 Data - 100 Kanji JLPT N5
 * Organisés en 20 leçons de 5 kanji chacune
 */

export const kanjiN5Lessons = [
  // Leçon 1 : Nombres 1-10
  {
    id: 23,
    title: 'Kanji N5 - Leçon 1 : Nombres (1-5)',
    category: 'kanji',
    type: 'kanji',
    description: 'Apprends les 5 premiers nombres en kanji',
    kanji: [
      {
        kanji: '一',
        onyomi: ['イチ', 'イツ'],
        kunyomi: ['ひと(つ)', 'ひと'],
        meaning: 'un, 1',
        strokes: 1,
        examples: [
          { word: '一つ', reading: 'ひとつ', meaning: 'un (objet)' },
          { word: '一人', reading: 'ひとり', meaning: 'une personne' },
          { word: '一月', reading: 'いちがつ', meaning: 'janvier' }
        ],
        mnemonic: 'Une seule ligne horizontale = le chiffre 1',
        romaji: 'ichi'
      },
      {
        kanji: '二',
        onyomi: ['ニ'],
        kunyomi: ['ふた(つ)', 'ふた'],
        meaning: 'deux, 2',
        strokes: 2,
        examples: [
          { word: '二つ', reading: 'ふたつ', meaning: 'deux (objets)' },
          { word: '二人', reading: 'ふたり', meaning: 'deux personnes' },
          { word: '二月', reading: 'にがつ', meaning: 'février' }
        ],
        mnemonic: 'Deux lignes horizontales = le chiffre 2',
        romaji: 'ni'
      },
      {
        kanji: '三',
        onyomi: ['サン'],
        kunyomi: ['みっ(つ)', 'み'],
        meaning: 'trois, 3',
        strokes: 3,
        examples: [
          { word: '三つ', reading: 'みっつ', meaning: 'trois (objets)' },
          { word: '三人', reading: 'さんにん', meaning: 'trois personnes' },
          { word: '三月', reading: 'さんがつ', meaning: 'mars' }
        ],
        mnemonic: 'Trois lignes horizontales = le chiffre 3',
        romaji: 'san'
      },
      {
        kanji: '四',
        onyomi: ['シ'],
        kunyomi: ['よ(つ)', 'よん', 'よ'],
        meaning: 'quatre, 4',
        strokes: 5,
        examples: [
          { word: '四つ', reading: 'よっつ', meaning: 'quatre (objets)' },
          { word: '四人', reading: 'よにん', meaning: 'quatre personnes' },
          { word: '四月', reading: 'しがつ', meaning: 'avril' }
        ],
        mnemonic: 'Une boîte fermée avec quatre côtés',
        romaji: 'shi'
      },
      {
        kanji: '五',
        onyomi: ['ゴ'],
        kunyomi: ['いつ(つ)', 'いつ'],
        meaning: 'cinq, 5',
        strokes: 4,
        examples: [
          { word: '五つ', reading: 'いつつ', meaning: 'cinq (objets)' },
          { word: '五人', reading: 'ごにん', meaning: 'cinq personnes' },
          { word: '五月', reading: 'ごがつ', meaning: 'mai' }
        ],
        mnemonic: 'Cinq traits formant un pentagramme',
        romaji: 'go'
      }
    ]
  },

  // Leçon 2 : Nombres (6-10)
  {
    id: 24,
    title: 'Kanji N5 - Leçon 2 : Nombres (6-10)',
    category: 'kanji',
    type: 'kanji',
    description: 'Continues avec les nombres de 6 à 10',
    kanji: [
      {
        kanji: '六',
        onyomi: ['ロク'],
        kunyomi: ['む(つ)', 'む', 'むい'],
        meaning: 'six, 6',
        strokes: 4,
        examples: [
          { word: '六つ', reading: 'むっつ', meaning: 'six (objets)' },
          { word: '六月', reading: 'ろくがつ', meaning: 'juin' },
          { word: '六人', reading: 'ろくにん', meaning: 'six personnes' }
        ],
        mnemonic: 'Un chapeau pointu sur une base = 6',
        romaji: 'roku'
      },
      {
        kanji: '七',
        onyomi: ['シチ'],
        kunyomi: ['なな(つ)', 'なな', 'なの'],
        meaning: 'sept, 7',
        strokes: 2,
        examples: [
          { word: '七つ', reading: 'ななつ', meaning: 'sept (objets)' },
          { word: '七月', reading: 'しちがつ', meaning: 'juillet' },
          { word: '七人', reading: 'しちにん', meaning: 'sept personnes' }
        ],
        mnemonic: 'Une croix coupée en deux = 7',
        romaji: 'shichi'
      },
      {
        kanji: '八',
        onyomi: ['ハチ'],
        kunyomi: ['や(つ)', 'や', 'よう'],
        meaning: 'huit, 8',
        strokes: 2,
        examples: [
          { word: '八つ', reading: 'やっつ', meaning: 'huit (objets)' },
          { word: '八月', reading: 'はちがつ', meaning: 'août' },
          { word: '八百屋', reading: 'やおや', meaning: 'marchand de légumes' }
        ],
        mnemonic: 'Deux traits qui s\'écartent = expansion, prospérité (8)',
        romaji: 'hachi'
      },
      {
        kanji: '九',
        onyomi: ['キュウ', 'ク'],
        kunyomi: ['ここの(つ)', 'ここの'],
        meaning: 'neuf, 9',
        strokes: 2,
        examples: [
          { word: '九つ', reading: 'ここのつ', meaning: 'neuf (objets)' },
          { word: '九月', reading: 'くがつ', meaning: 'septembre' },
          { word: '九州', reading: 'きゅうしゅう', meaning: 'Kyushu (région)' }
        ],
        mnemonic: 'Un coude plié = presque 10, donc 9',
        romaji: 'kyuu'
      },
      {
        kanji: '十',
        onyomi: ['ジュウ', 'ジッ'],
        kunyomi: ['とお', 'と'],
        meaning: 'dix, 10',
        strokes: 2,
        examples: [
          { word: '十', reading: 'じゅう', meaning: 'dix' },
          { word: '十月', reading: 'じゅうがつ', meaning: 'octobre' },
          { word: '二十歳', reading: 'はたち', meaning: '20 ans' }
        ],
        mnemonic: 'Une croix (+) = addition jusqu\'à 10',
        romaji: 'juu'
      }
    ]
  },

  // Leçon 3 : Nombres Grands & Temps
  {
    id: 25,
    title: 'Kanji N5 - Leçon 3 : Grands Nombres',
    category: 'kanji',
    type: 'kanji',
    description: 'Apprends les grands nombres : 100, 1000, 10000, yen, temps',
    kanji: [
      {
        kanji: '百',
        onyomi: ['ヒャク'],
        kunyomi: ['もも'],
        meaning: 'cent, 100',
        strokes: 6,
        examples: [
          { word: '百円', reading: 'ひゃくえん', meaning: '100 yens' },
          { word: '三百', reading: 'さんびゃく', meaning: '300' },
          { word: '八百屋', reading: 'やおや', meaning: 'marchand de légumes' }
        ],
        mnemonic: 'Un (一) blanc (白) = cent',
        romaji: 'hyaku'
      },
      {
        kanji: '千',
        onyomi: ['セン'],
        kunyomi: ['ち'],
        meaning: 'mille, 1000',
        strokes: 3,
        examples: [
          { word: '千円', reading: 'せんえん', meaning: '1000 yens' },
          { word: '三千', reading: 'さんぜん', meaning: '3000' },
          { word: '千葉', reading: 'ちば', meaning: 'Chiba (ville)' }
        ],
        mnemonic: 'Dix (十) personnes (人) = mille',
        romaji: 'sen'
      },
      {
        kanji: '万',
        onyomi: ['マン', 'バン'],
        kunyomi: [],
        meaning: 'dix mille, 10000',
        strokes: 3,
        examples: [
          { word: '一万', reading: 'いちまん', meaning: '10000' },
          { word: '万年筆', reading: 'まんねんひつ', meaning: 'stylo plume' },
          { word: '十万', reading: 'じゅうまん', meaning: '100000' }
        ],
        mnemonic: 'Une couronne (⺈) sur une base = 10000, grand nombre',
        romaji: 'man'
      },
      {
        kanji: '円',
        onyomi: ['エン'],
        kunyomi: ['まる(い)', 'まる', 'まど'],
        meaning: 'yen, cercle, rond',
        strokes: 4,
        examples: [
          { word: '百円', reading: 'ひゃくえん', meaning: '100 yens' },
          { word: '円い', reading: 'まるい', meaning: 'rond' },
          { word: '千円', reading: 'せんえん', meaning: '1000 yens' }
        ],
        mnemonic: 'Un cercle (囗) avec une barre au milieu = pièce de monnaie',
        romaji: 'en'
      },
      {
        kanji: '時',
        onyomi: ['ジ'],
        kunyomi: ['とき'],
        meaning: 'temps, heure',
        strokes: 10,
        examples: [
          { word: '時間', reading: 'じかん', meaning: 'temps, heure' },
          { word: '一時', reading: 'いちじ', meaning: '1 heure' },
          { word: '時々', reading: 'ときどき', meaning: 'parfois' }
        ],
        mnemonic: 'Le soleil (日) et le temple (寺) = l\'heure du temple',
        romaji: 'ji'
      }
    ]
  },

  // Leçon 4 : Jours & Calendrier
  {
    id: 26,
    title: 'Kanji N5 - Leçon 4 : Jours de la Semaine',
    category: 'kanji',
    type: 'kanji',
    description: 'Les kanji pour les jours : soleil, lune, feu, eau, bois',
    kanji: [
      {
        kanji: '日',
        onyomi: ['ニチ', 'ジツ'],
        kunyomi: ['ひ', 'か'],
        meaning: 'soleil, jour',
        strokes: 4,
        examples: [
          { word: '日本', reading: 'にほん', meaning: 'Japon' },
          { word: '今日', reading: 'きょう', meaning: 'aujourd\'hui' },
          { word: '日曜日', reading: 'にちようび', meaning: 'dimanche' }
        ],
        mnemonic: 'Un rectangle avec une barre = le soleil',
        romaji: 'nichi'
      },
      {
        kanji: '月',
        onyomi: ['ゲツ', 'ガツ'],
        kunyomi: ['つき'],
        meaning: 'lune, mois',
        strokes: 4,
        examples: [
          { word: '月曜日', reading: 'げつようび', meaning: 'lundi' },
          { word: '一月', reading: 'いちがつ', meaning: 'janvier' },
          { word: '今月', reading: 'こんげつ', meaning: 'ce mois-ci' }
        ],
        mnemonic: 'Un croissant de lune',
        romaji: 'getsu'
      },
      {
        kanji: '火',
        onyomi: ['カ'],
        kunyomi: ['ひ', 'ほ'],
        meaning: 'feu',
        strokes: 4,
        examples: [
          { word: '火曜日', reading: 'かようび', meaning: 'mardi' },
          { word: '火事', reading: 'かじ', meaning: 'incendie' },
          { word: '花火', reading: 'はなび', meaning: 'feu d\'artifice' }
        ],
        mnemonic: 'Une personne (人) avec deux flammes',
        romaji: 'ka'
      },
      {
        kanji: '水',
        onyomi: ['スイ'],
        kunyomi: ['みず'],
        meaning: 'eau',
        strokes: 4,
        examples: [
          { word: '水曜日', reading: 'すいようび', meaning: 'mercredi' },
          { word: '水', reading: 'みず', meaning: 'eau' },
          { word: '水泳', reading: 'すいえい', meaning: 'natation' }
        ],
        mnemonic: 'Des gouttes d\'eau qui coulent',
        romaji: 'sui'
      },
      {
        kanji: '木',
        onyomi: ['モク', 'ボク'],
        kunyomi: ['き', 'こ'],
        meaning: 'arbre, bois',
        strokes: 4,
        examples: [
          { word: '木曜日', reading: 'もくようび', meaning: 'jeudi' },
          { word: '木', reading: 'き', meaning: 'arbre' },
          { word: '大木', reading: 'たいぼく', meaning: 'grand arbre' }
        ],
        mnemonic: 'Un arbre avec son tronc et ses branches',
        romaji: 'moku'
      }
    ]
  },

  // Leçon 5 : Métaux & Terre
  {
    id: 27,
    title: 'Kanji N5 - Leçon 5 : Éléments Naturels',
    category: 'kanji',
    type: 'kanji',
    description: 'Or/métal, terre, montagne, rivière, champ',
    kanji: [
      {
        kanji: '金',
        onyomi: ['キン', 'コン'],
        kunyomi: ['かね', 'かな'],
        meaning: 'or, argent, métal',
        strokes: 8,
        examples: [
          { word: '金曜日', reading: 'きんようび', meaning: 'vendredi' },
          { word: 'お金', reading: 'おかね', meaning: 'argent (monnaie)' },
          { word: '金色', reading: 'きんいろ', meaning: 'couleur or' }
        ],
        mnemonic: 'Quatre pépites (点) sous un toit = or précieux',
        romaji: 'kin'
      },
      {
        kanji: '土',
        onyomi: ['ド', 'ト'],
        kunyomi: ['つち'],
        meaning: 'terre, sol',
        strokes: 3,
        examples: [
          { word: '土曜日', reading: 'どようび', meaning: 'samedi' },
          { word: '土地', reading: 'とち', meaning: 'terrain' },
          { word: '土産', reading: 'みやげ', meaning: 'souvenir' }
        ],
        mnemonic: 'Dix (十) sur un (一) = couches de terre',
        romaji: 'do'
      },
      {
        kanji: '山',
        onyomi: ['サン'],
        kunyomi: ['やま'],
        meaning: 'montagne',
        strokes: 3,
        examples: [
          { word: '山', reading: 'やま', meaning: 'montagne' },
          { word: '富士山', reading: 'ふじさん', meaning: 'Mont Fuji' },
          { word: '登山', reading: 'とざん', meaning: 'alpinisme' }
        ],
        mnemonic: 'Trois pics de montagne',
        romaji: 'san'
      },
      {
        kanji: '川',
        onyomi: ['セン'],
        kunyomi: ['かわ'],
        meaning: 'rivière',
        strokes: 3,
        examples: [
          { word: '川', reading: 'かわ', meaning: 'rivière' },
          { word: '小川', reading: 'おがわ', meaning: 'ruisseau' },
          { word: '河川', reading: 'かせん', meaning: 'cours d\'eau' }
        ],
        mnemonic: 'Trois lignes qui coulent = une rivière',
        romaji: 'kawa'
      },
      {
        kanji: '田',
        onyomi: ['デン'],
        kunyomi: ['た'],
        meaning: 'rizière, champ',
        strokes: 5,
        examples: [
          { word: '田んぼ', reading: 'たんぼ', meaning: 'rizière' },
          { word: '田中', reading: 'たなか', meaning: 'Tanaka (nom)' },
          { word: '水田', reading: 'すいでん', meaning: 'rizière inondée' }
        ],
        mnemonic: 'Un champ divisé en parcelles',
        romaji: 'ta'
      }
    ]
  },

  // Leçon 6 : Personnes
  {
    id: 28,
    title: 'Kanji N5 - Leçon 6 : Les Personnes',
    category: 'kanji',
    type: 'kanji',
    description: 'Personne, homme, femme, enfant, force',
    kanji: [
      {
        kanji: '人',
        onyomi: ['ジン', 'ニン'],
        kunyomi: ['ひと'],
        meaning: 'personne, humain',
        strokes: 2,
        examples: [
          { word: '人', reading: 'ひと', meaning: 'personne' },
          { word: '日本人', reading: 'にほんじん', meaning: 'Japonais' },
          { word: '二人', reading: 'ふたり', meaning: 'deux personnes' }
        ],
        mnemonic: 'Une personne vue de profil',
        romaji: 'hito'
      },
      {
        kanji: '男',
        onyomi: ['ダン', 'ナン'],
        kunyomi: ['おとこ'],
        meaning: 'homme, mâle',
        strokes: 7,
        examples: [
          { word: '男', reading: 'おとこ', meaning: 'homme' },
          { word: '男の子', reading: 'おとこのこ', meaning: 'garçon' },
          { word: '長男', reading: 'ちょうなん', meaning: 'fils aîné' }
        ],
        mnemonic: 'Force (力) dans le champ (田) = homme qui travaille',
        romaji: 'otoko'
      },
      {
        kanji: '女',
        onyomi: ['ジョ', 'ニョ'],
        kunyomi: ['おんな'],
        meaning: 'femme, féminin',
        strokes: 3,
        examples: [
          { word: '女', reading: 'おんな', meaning: 'femme' },
          { word: '女の子', reading: 'おんなのこ', meaning: 'fille' },
          { word: '長女', reading: 'ちょうじょ', meaning: 'fille aînée' }
        ],
        mnemonic: 'Une femme agenouillée (posture traditionnelle)',
        romaji: 'onna'
      },
      {
        kanji: '子',
        onyomi: ['シ', 'ス'],
        kunyomi: ['こ'],
        meaning: 'enfant',
        strokes: 3,
        examples: [
          { word: '子供', reading: 'こども', meaning: 'enfant' },
          { word: '女の子', reading: 'おんなのこ', meaning: 'fille' },
          { word: '椅子', reading: 'いす', meaning: 'chaise' }
        ],
        mnemonic: 'Un bébé emmailloté avec les bras levés',
        romaji: 'ko'
      },
      {
        kanji: '力',
        onyomi: ['リョク', 'リキ'],
        kunyomi: ['ちから'],
        meaning: 'force, pouvoir',
        strokes: 2,
        examples: [
          { word: '力', reading: 'ちから', meaning: 'force' },
          { word: '努力', reading: 'どりょく', meaning: 'effort' },
          { word: '能力', reading: 'のうりょく', meaning: 'capacité' }
        ],
        mnemonic: 'Un bras musclé qui montre sa force',
        romaji: 'chikara'
      }
    ]
  },

  // Leçon 7 : Taille & Position
  {
    id: 29,
    title: 'Kanji N5 - Leçon 7 : Taille & Position',
    category: 'kanji',
    type: 'kanji',
    description: 'Grand, petit, haut, bas, milieu',
    kanji: [
      {
        kanji: '大',
        onyomi: ['ダイ', 'タイ'],
        kunyomi: ['おお(きい)', 'おお'],
        meaning: 'grand, gros',
        strokes: 3,
        examples: [
          { word: '大きい', reading: 'おおきい', meaning: 'grand' },
          { word: '大学', reading: 'だいがく', meaning: 'université' },
          { word: '大人', reading: 'おとな', meaning: 'adulte' }
        ],
        mnemonic: 'Une personne (人) les bras écartés = grand',
        romaji: 'dai'
      },
      {
        kanji: '小',
        onyomi: ['ショウ'],
        kunyomi: ['ちい(さい)', 'こ', 'お'],
        meaning: 'petit',
        strokes: 3,
        examples: [
          { word: '小さい', reading: 'ちいさい', meaning: 'petit' },
          { word: '小学校', reading: 'しょうがっこう', meaning: 'école primaire' },
          { word: '小川', reading: 'おがわ', meaning: 'ruisseau' }
        ],
        mnemonic: 'Trois petits points = petit',
        romaji: 'shou'
      },
      {
        kanji: '上',
        onyomi: ['ジョウ'],
        kunyomi: ['うえ', 'うわ', 'かみ', 'あ(げる)', 'のぼ(る)'],
        meaning: 'dessus, haut, monter',
        strokes: 3,
        examples: [
          { word: '上', reading: 'うえ', meaning: 'dessus' },
          { word: '上手', reading: 'じょうず', meaning: 'doué, habile' },
          { word: '机の上', reading: 'つくえのうえ', meaning: 'sur le bureau' }
        ],
        mnemonic: 'Une ligne au-dessus d\'une autre = dessus',
        romaji: 'ue'
      },
      {
        kanji: '下',
        onyomi: ['カ', 'ゲ'],
        kunyomi: ['した', 'しも', 'もと', 'さ(げる)', 'くだ(る)'],
        meaning: 'dessous, bas, descendre',
        strokes: 3,
        examples: [
          { word: '下', reading: 'した', meaning: 'dessous' },
          { word: '下手', reading: 'へた', meaning: 'maladroit' },
          { word: '地下', reading: 'ちか', meaning: 'sous-sol' }
        ],
        mnemonic: 'Un point sous une ligne = dessous',
        romaji: 'shita'
      },
      {
        kanji: '中',
        onyomi: ['チュウ'],
        kunyomi: ['なか'],
        meaning: 'milieu, intérieur, dedans',
        strokes: 4,
        examples: [
          { word: '中', reading: 'なか', meaning: 'intérieur' },
          { word: '中国', reading: 'ちゅうごく', meaning: 'Chine' },
          { word: '一日中', reading: 'いちにちじゅう', meaning: 'toute la journée' }
        ],
        mnemonic: 'Une ligne au milieu d\'un carré = centre',
        romaji: 'naka'
      }
    ]
  },

  // Leçon 8 : Directions
  {
    id: 30,
    title: 'Kanji N5 - Leçon 8 : Directions',
    category: 'kanji',
    type: 'kanji',
    description: 'Gauche, droite, entrer, sortir, livre/origine',
    kanji: [
      {
        kanji: '左',
        onyomi: ['サ'],
        kunyomi: ['ひだり'],
        meaning: 'gauche',
        strokes: 5,
        examples: [
          { word: '左', reading: 'ひだり', meaning: 'gauche' },
          { word: '左側', reading: 'ひだりがわ', meaning: 'côté gauche' },
          { word: '左手', reading: 'ひだりて', meaning: 'main gauche' }
        ],
        mnemonic: 'La main (手) avec le pouce à gauche',
        romaji: 'hidari'
      },
      {
        kanji: '右',
        onyomi: ['ウ', 'ユウ'],
        kunyomi: ['みぎ'],
        meaning: 'droite',
        strokes: 5,
        examples: [
          { word: '右', reading: 'みぎ', meaning: 'droite' },
          { word: '右側', reading: 'みぎがわ', meaning: 'côté droit' },
          { word: '右手', reading: 'みぎて', meaning: 'main droite' }
        ],
        mnemonic: 'Bouche (口) + main = on mange avec la main droite',
        romaji: 'migi'
      },
      {
        kanji: '入',
        onyomi: ['ニュウ'],
        kunyomi: ['い(る)', 'い(れる)', 'はい(る)'],
        meaning: 'entrer',
        strokes: 2,
        examples: [
          { word: '入る', reading: 'はいる', meaning: 'entrer' },
          { word: '入口', reading: 'いりぐち', meaning: 'entrée' },
          { word: '入学', reading: 'にゅうがく', meaning: 'admission (école)' }
        ],
        mnemonic: 'Une flèche qui entre dans un espace',
        romaji: 'hairu'
      },
      {
        kanji: '出',
        onyomi: ['シュツ', 'スイ'],
        kunyomi: ['で(る)', 'だ(す)'],
        meaning: 'sortir, apparaître',
        strokes: 5,
        examples: [
          { word: '出る', reading: 'でる', meaning: 'sortir' },
          { word: '出口', reading: 'でぐち', meaning: 'sortie' },
          { word: '出発', reading: 'しゅっぱつ', meaning: 'départ' }
        ],
        mnemonic: 'Montagne (山) empilée = sortir, jaillir',
        romaji: 'deru'
      },
      {
        kanji: '本',
        onyomi: ['ホン'],
        kunyomi: ['もと'],
        meaning: 'livre, origine, compteur',
        strokes: 5,
        examples: [
          { word: '本', reading: 'ほん', meaning: 'livre' },
          { word: '日本', reading: 'にほん', meaning: 'Japon' },
          { word: '三本', reading: 'さんぼん', meaning: 'trois (objets longs)' }
        ],
        mnemonic: 'Un arbre (木) avec une marque à la racine = origine',
        romaji: 'hon'
      }
    ]
  },

  // Leçon 9 : Noms & École
  {
    id: 31,
    title: 'Kanji N5 - Leçon 9 : Noms & École',
    category: 'kanji',
    type: 'kanji',
    description: 'Nom, avant, après, année, étude',
    kanji: [
      {
        kanji: '名',
        onyomi: ['メイ', 'ミョウ'],
        kunyomi: ['な'],
        meaning: 'nom',
        strokes: 6,
        examples: [
          { word: '名前', reading: 'なまえ', meaning: 'nom' },
          { word: '有名', reading: 'ゆうめい', meaning: 'célèbre' },
          { word: '名刺', reading: 'めいし', meaning: 'carte de visite' }
        ],
        mnemonic: 'Bouche (口) sous la lune (夕) = dire son nom le soir',
        romaji: 'na'
      },
      {
        kanji: '前',
        onyomi: ['ゼン'],
        kunyomi: ['まえ'],
        meaning: 'avant, devant',
        strokes: 9,
        examples: [
          { word: '前', reading: 'まえ', meaning: 'avant, devant' },
          { word: '名前', reading: 'なまえ', meaning: 'nom' },
          { word: '午前', reading: 'ごぜん', meaning: 'matin (AM)' }
        ],
        mnemonic: 'Marcher (月) avec un couteau (刂) devant soi',
        romaji: 'mae'
      },
      {
        kanji: '後',
        onyomi: ['ゴ', 'コウ'],
        kunyomi: ['あと', 'うし(ろ)', 'のち'],
        meaning: 'après, derrière',
        strokes: 9,
        examples: [
          { word: '後', reading: 'あと', meaning: 'après' },
          { word: '後ろ', reading: 'うしろ', meaning: 'derrière' },
          { word: '午後', reading: 'ごご', meaning: 'après-midi (PM)' }
        ],
        mnemonic: 'Marcher (彳) en retard (⺅) = être derrière',
        romaji: 'ato'
      },
      {
        kanji: '年',
        onyomi: ['ネン'],
        kunyomi: ['とし'],
        meaning: 'année',
        strokes: 6,
        examples: [
          { word: '今年', reading: 'ことし', meaning: 'cette année' },
          { word: '一年', reading: 'いちねん', meaning: 'un an' },
          { word: '年齢', reading: 'ねんれい', meaning: 'âge' }
        ],
        mnemonic: 'Personne (人) portant quelque chose = récolte annuelle',
        romaji: 'toshi'
      },
      {
        kanji: '学',
        onyomi: ['ガク'],
        kunyomi: ['まな(ぶ)'],
        meaning: 'étude, étudier',
        strokes: 8,
        examples: [
          { word: '学生', reading: 'がくせい', meaning: 'étudiant' },
          { word: '学校', reading: 'がっこう', meaning: 'école' },
          { word: '大学', reading: 'だいがく', meaning: 'université' }
        ],
        mnemonic: 'Enfant (子) sous un toit = école',
        romaji: 'gaku'
      }
    ]
  },

  // Leçon 10 : École & Vie
  {
    id: 32,
    title: 'Kanji N5 - Leçon 10 : Vie & École',
    category: 'kanji',
    type: 'kanji',
    description: 'Vie/naître, étudiant, professeur, école',
    kanji: [
      {
        kanji: '生',
        onyomi: ['セイ', 'ショウ'],
        kunyomi: ['い(きる)', 'い(かす)', 'う(まれる)', 'なま'],
        meaning: 'vie, naître, vivre, cru',
        strokes: 5,
        examples: [
          { word: '学生', reading: 'がくせい', meaning: 'étudiant' },
          { word: '先生', reading: 'せんせい', meaning: 'professeur' },
          { word: '生まれる', reading: 'うまれる', meaning: 'naître' }
        ],
        mnemonic: 'Une plante qui pousse de la terre = vie',
        romaji: 'sei'
      },
      {
        kanji: '先',
        onyomi: ['セン'],
        kunyomi: ['さき'],
        meaning: 'avant, précédent, avenir',
        strokes: 6,
        examples: [
          { word: '先生', reading: 'せんせい', meaning: 'professeur' },
          { word: '先週', reading: 'せんしゅう', meaning: 'semaine dernière' },
          { word: '先月', reading: 'せんげつ', meaning: 'mois dernier' }
        ],
        mnemonic: 'Personne avec une jambe en avant = celui qui va devant',
        romaji: 'sen'
      },
      {
        kanji: '校',
        onyomi: ['コウ'],
        kunyomi: [],
        meaning: 'école',
        strokes: 10,
        examples: [
          { word: '学校', reading: 'がっこう', meaning: 'école' },
          { word: '高校', reading: 'こうこう', meaning: 'lycée' },
          { word: '小学校', reading: 'しょうがっこう', meaning: 'école primaire' }
        ],
        mnemonic: 'Bois (木) + échanger (交) = lieu d\'apprentissage',
        romaji: 'kou'
      },
      {
        kanji: '分',
        onyomi: ['ブン', 'フン', 'ブ'],
        kunyomi: ['わ(ける)', 'わ(かる)', 'わ(かれる)'],
        meaning: 'diviser, minute, comprendre',
        strokes: 4,
        examples: [
          { word: '分かる', reading: 'わかる', meaning: 'comprendre' },
          { word: '十分', reading: 'じゅっぷん', meaning: 'dix minutes' },
          { word: '自分', reading: 'じぶん', meaning: 'soi-même' }
        ],
        mnemonic: 'Couper (八) avec un couteau (刀) = diviser',
        romaji: 'fun'
      },
      {
        kanji: '半',
        onyomi: ['ハン'],
        kunyomi: ['なか(ば)'],
        meaning: 'moitié, demi',
        strokes: 5,
        examples: [
          { word: '半分', reading: 'はんぶん', meaning: 'moitié' },
          { word: '半日', reading: 'はんにち', meaning: 'demi-journée' },
          { word: '一時半', reading: 'いちじはん', meaning: '1h30' }
        ],
        mnemonic: 'Un bœuf (牛) coupé en deux par une ligne',
        romaji: 'han'
      }
    ]
  },

  // Leçon 11 : Météo & Nature
  {
    id: 33,
    title: 'Kanji N5 - Leçon 11 : Météo & Nature',
    category: 'kanji',
    type: 'kanji',
    description: 'Ciel, énergie, pluie, vide et fleur',
    kanji: [
      {
        kanji: '天',
        onyomi: ['テン'],
        kunyomi: ['あま', 'あめ'],
        meaning: 'ciel, paradis',
        strokes: 4,
        examples: [
          { word: '天気', reading: 'てんき', meaning: 'temps (météo)' },
          { word: '天国', reading: 'てんごく', meaning: 'paradis' },
          { word: '天才', reading: 'てんさい', meaning: 'génie' }
        ],
        mnemonic: 'Une personne (大) avec une ligne au-dessus = le ciel',
        romaji: 'ten'
      },
      {
        kanji: '気',
        onyomi: ['キ', 'ケ'],
        kunyomi: [],
        meaning: 'esprit, énergie, humeur',
        strokes: 6,
        examples: [
          { word: '天気', reading: 'てんき', meaning: 'temps (météo)' },
          { word: '元気', reading: 'げんき', meaning: 'en forme, énergique' },
          { word: '気持ち', reading: 'きもち', meaning: 'sentiment' }
        ],
        mnemonic: 'Vapeur (气) de riz (米) = énergie vitale',
        romaji: 'ki'
      },
      {
        kanji: '雨',
        onyomi: ['ウ'],
        kunyomi: ['あめ', 'あま'],
        meaning: 'pluie',
        strokes: 8,
        examples: [
          { word: '雨', reading: 'あめ', meaning: 'pluie' },
          { word: '大雨', reading: 'おおあめ', meaning: 'forte pluie' },
          { word: '梅雨', reading: 'つゆ', meaning: 'saison des pluies' }
        ],
        mnemonic: 'Des gouttes tombant du ciel dans un cadre',
        romaji: 'ame'
      },
      {
        kanji: '空',
        onyomi: ['クウ'],
        kunyomi: ['そら', 'あ(く)', 'から'],
        meaning: 'ciel, vide',
        strokes: 8,
        examples: [
          { word: '空', reading: 'そら', meaning: 'ciel' },
          { word: '空港', reading: 'くうこう', meaning: 'aéroport' },
          { word: '空気', reading: 'くうき', meaning: 'air' }
        ],
        mnemonic: 'Toit (穴) + travail (工) = espace vide sous le toit',
        romaji: 'sora'
      },
      {
        kanji: '花',
        onyomi: ['カ'],
        kunyomi: ['はな'],
        meaning: 'fleur',
        strokes: 7,
        examples: [
          { word: '花', reading: 'はな', meaning: 'fleur' },
          { word: '花火', reading: 'はなび', meaning: 'feu d\'artifice' },
          { word: '花見', reading: 'はなみ', meaning: 'contemplation des fleurs' }
        ],
        mnemonic: 'Herbe (艹) qui change (化) = fleur qui s\'épanouit',
        romaji: 'hana'
      }
    ]
  },

  // Leçon 12 : Communication
  {
    id: 34,
    title: 'Kanji N5 - Leçon 12 : Communication',
    category: 'kanji',
    type: 'kanji',
    description: 'Voir, entendre, parler, lire et écrire',
    kanji: [
      {
        kanji: '見',
        onyomi: ['ケン'],
        kunyomi: ['み(る)', 'み(える)', 'み(せる)'],
        meaning: 'voir, regarder',
        strokes: 7,
        examples: [
          { word: '見る', reading: 'みる', meaning: 'voir, regarder' },
          { word: '花見', reading: 'はなみ', meaning: 'contemplation des fleurs' },
          { word: '意見', reading: 'いけん', meaning: 'opinion' }
        ],
        mnemonic: 'Un œil (目) sur des jambes (儿) = regarder',
        romaji: 'miru'
      },
      {
        kanji: '聞',
        onyomi: ['ブン', 'モン'],
        kunyomi: ['き(く)', 'き(こえる)'],
        meaning: 'entendre, demander',
        strokes: 14,
        examples: [
          { word: '聞く', reading: 'きく', meaning: 'entendre, demander' },
          { word: '新聞', reading: 'しんぶん', meaning: 'journal' },
          { word: '聞こえる', reading: 'きこえる', meaning: 'être audible' }
        ],
        mnemonic: 'Oreille (耳) à la porte (門) = écouter',
        romaji: 'kiku'
      },
      {
        kanji: '話',
        onyomi: ['ワ'],
        kunyomi: ['はな(す)', 'はなし'],
        meaning: 'parler, histoire',
        strokes: 13,
        examples: [
          { word: '話す', reading: 'はなす', meaning: 'parler' },
          { word: '電話', reading: 'でんわ', meaning: 'téléphone' },
          { word: '会話', reading: 'かいわ', meaning: 'conversation' }
        ],
        mnemonic: 'Parole (言) + langue (舌) = parler',
        romaji: 'hanasu'
      },
      {
        kanji: '読',
        onyomi: ['ドク', 'トク', 'トウ'],
        kunyomi: ['よ(む)'],
        meaning: 'lire',
        strokes: 14,
        examples: [
          { word: '読む', reading: 'よむ', meaning: 'lire' },
          { word: '読書', reading: 'どくしょ', meaning: 'lecture' },
          { word: '読者', reading: 'どくしゃ', meaning: 'lecteur' }
        ],
        mnemonic: 'Parole (言) + vendre (売) = lire des mots vendus (livres)',
        romaji: 'yomu'
      },
      {
        kanji: '書',
        onyomi: ['ショ'],
        kunyomi: ['か(く)'],
        meaning: 'écrire',
        strokes: 10,
        examples: [
          { word: '書く', reading: 'かく', meaning: 'écrire' },
          { word: '辞書', reading: 'じしょ', meaning: 'dictionnaire' },
          { word: '図書館', reading: 'としょかん', meaning: 'bibliothèque' }
        ],
        mnemonic: 'Pinceau (聿) qui écrit le soleil (日)',
        romaji: 'kaku'
      }
    ]
  },

  // Leçon 13 : Langues & Mouvement
  {
    id: 35,
    title: 'Kanji N5 - Leçon 13 : Langues & Mouvement',
    category: 'kanji',
    type: 'kanji',
    description: 'Langue, dire, aller, venir et manger',
    kanji: [
      {
        kanji: '語',
        onyomi: ['ゴ'],
        kunyomi: ['かた(る)', 'かた(らう)'],
        meaning: 'langue, mot',
        strokes: 14,
        examples: [
          { word: '日本語', reading: 'にほんご', meaning: 'japonais (langue)' },
          { word: '英語', reading: 'えいご', meaning: 'anglais' },
          { word: '物語', reading: 'ものがたり', meaning: 'histoire, conte' }
        ],
        mnemonic: 'Parole (言) + je (吾) = ma langue',
        romaji: 'go'
      },
      {
        kanji: '言',
        onyomi: ['ゲン', 'ゴン'],
        kunyomi: ['い(う)', 'こと'],
        meaning: 'dire, mot',
        strokes: 7,
        examples: [
          { word: '言う', reading: 'いう', meaning: 'dire' },
          { word: '言葉', reading: 'ことば', meaning: 'mot, parole' },
          { word: '方言', reading: 'ほうげん', meaning: 'dialecte' }
        ],
        mnemonic: 'Des lignes sortant d\'une bouche = parler',
        romaji: 'iu'
      },
      {
        kanji: '行',
        onyomi: ['コウ', 'ギョウ'],
        kunyomi: ['い(く)', 'ゆ(く)', 'おこな(う)'],
        meaning: 'aller, faire',
        strokes: 6,
        examples: [
          { word: '行く', reading: 'いく', meaning: 'aller' },
          { word: '旅行', reading: 'りょこう', meaning: 'voyage' },
          { word: '銀行', reading: 'ぎんこう', meaning: 'banque' }
        ],
        mnemonic: 'Un carrefour = où aller',
        romaji: 'iku'
      },
      {
        kanji: '来',
        onyomi: ['ライ'],
        kunyomi: ['く(る)', 'きた(る)', 'きた(す)'],
        meaning: 'venir',
        strokes: 7,
        examples: [
          { word: '来る', reading: 'くる', meaning: 'venir' },
          { word: '来年', reading: 'らいねん', meaning: 'année prochaine' },
          { word: '来週', reading: 'らいしゅう', meaning: 'semaine prochaine' }
        ],
        mnemonic: 'Blé (麦) qui vient à maturité',
        romaji: 'kuru'
      },
      {
        kanji: '食',
        onyomi: ['ショク', 'ジキ'],
        kunyomi: ['た(べる)', 'く(う)'],
        meaning: 'manger, nourriture',
        strokes: 9,
        examples: [
          { word: '食べる', reading: 'たべる', meaning: 'manger' },
          { word: '食事', reading: 'しょくじ', meaning: 'repas' },
          { word: '食堂', reading: 'しょくどう', meaning: 'cantine, restaurant' }
        ],
        mnemonic: 'Personne (人) + bien (良) = manger fait du bien',
        romaji: 'taberu'
      }
    ]
  },

  // Leçon 14 : Actions Quotidiennes
  {
    id: 36,
    title: 'Kanji N5 - Leçon 14 : Actions Quotidiennes',
    category: 'kanji',
    type: 'kanji',
    description: 'Boire, acheter, repos, quoi et maintenant',
    kanji: [
      {
        kanji: '飲',
        onyomi: ['イン'],
        kunyomi: ['の(む)'],
        meaning: 'boire',
        strokes: 12,
        examples: [
          { word: '飲む', reading: 'のむ', meaning: 'boire' },
          { word: '飲み物', reading: 'のみもの', meaning: 'boisson' },
          { word: '飲料', reading: 'いんりょう', meaning: 'boisson' }
        ],
        mnemonic: 'Nourriture (食) + manquer (欠) = besoin de boire',
        romaji: 'nomu'
      },
      {
        kanji: '買',
        onyomi: ['バイ'],
        kunyomi: ['か(う)'],
        meaning: 'acheter',
        strokes: 12,
        examples: [
          { word: '買う', reading: 'かう', meaning: 'acheter' },
          { word: '買い物', reading: 'かいもの', meaning: 'shopping' },
          { word: '売買', reading: 'ばいばい', meaning: 'achat et vente' }
        ],
        mnemonic: 'Filet (罒) + coquillage/argent (貝) = acheter avec de l\'argent',
        romaji: 'kau'
      },
      {
        kanji: '休',
        onyomi: ['キュウ'],
        kunyomi: ['やす(む)', 'やす(まる)'],
        meaning: 'repos, vacances',
        strokes: 6,
        examples: [
          { word: '休む', reading: 'やすむ', meaning: 'se reposer' },
          { word: '休日', reading: 'きゅうじつ', meaning: 'jour de repos' },
          { word: '夏休み', reading: 'なつやすみ', meaning: 'vacances d\'été' }
        ],
        mnemonic: 'Personne (亻) contre un arbre (木) = se reposer',
        romaji: 'yasumu'
      },
      {
        kanji: '何',
        onyomi: ['カ'],
        kunyomi: ['なに', 'なん'],
        meaning: 'quoi, quel',
        strokes: 7,
        examples: [
          { word: '何', reading: 'なに', meaning: 'quoi' },
          { word: '何人', reading: 'なんにん', meaning: 'combien de personnes' },
          { word: '何時', reading: 'なんじ', meaning: 'quelle heure' }
        ],
        mnemonic: 'Personne (亻) + possible (可) = quoi est possible?',
        romaji: 'nani'
      },
      {
        kanji: '今',
        onyomi: ['コン', 'キン'],
        kunyomi: ['いま'],
        meaning: 'maintenant, présent',
        strokes: 4,
        examples: [
          { word: '今', reading: 'いま', meaning: 'maintenant' },
          { word: '今日', reading: 'きょう', meaning: 'aujourd\'hui' },
          { word: '今年', reading: 'ことし', meaning: 'cette année' }
        ],
        mnemonic: 'Un toit (亼) couvrant le moment présent',
        romaji: 'ima'
      }
    ]
  },

  // Leçon 15 : Temps & Cycle
  {
    id: 37,
    title: 'Kanji N5 - Leçon 15 : Temps & Cycle',
    category: 'kanji',
    type: 'kanji',
    description: 'Chaque, semaine, nouveau, ancien et long',
    kanji: [
      {
        kanji: '毎',
        onyomi: ['マイ'],
        kunyomi: ['ごと'],
        meaning: 'chaque, tous les',
        strokes: 6,
        examples: [
          { word: '毎日', reading: 'まいにち', meaning: 'chaque jour' },
          { word: '毎週', reading: 'まいしゅう', meaning: 'chaque semaine' },
          { word: '毎朝', reading: 'まいあさ', meaning: 'chaque matin' }
        ],
        mnemonic: 'Mère (母) qui fait la même chose chaque jour',
        romaji: 'mai'
      },
      {
        kanji: '週',
        onyomi: ['シュウ'],
        kunyomi: [],
        meaning: 'semaine',
        strokes: 11,
        examples: [
          { word: '週末', reading: 'しゅうまつ', meaning: 'week-end' },
          { word: '今週', reading: 'こんしゅう', meaning: 'cette semaine' },
          { word: '先週', reading: 'せんしゅう', meaning: 'semaine dernière' }
        ],
        mnemonic: 'Route (辶) + tour (周) = cycle de la semaine',
        romaji: 'shuu'
      },
      {
        kanji: '新',
        onyomi: ['シン'],
        kunyomi: ['あたら(しい)', 'あら(た)', 'にい'],
        meaning: 'nouveau',
        strokes: 13,
        examples: [
          { word: '新しい', reading: 'あたらしい', meaning: 'nouveau' },
          { word: '新聞', reading: 'しんぶん', meaning: 'journal' },
          { word: '新年', reading: 'しんねん', meaning: 'nouvel an' }
        ],
        mnemonic: 'Arbre (木) + hache (斤) + debout (立) = couper pour renouveler',
        romaji: 'atarashii'
      },
      {
        kanji: '古',
        onyomi: ['コ'],
        kunyomi: ['ふる(い)', 'ふる(す)'],
        meaning: 'ancien, vieux',
        strokes: 5,
        examples: [
          { word: '古い', reading: 'ふるい', meaning: 'ancien, vieux' },
          { word: '中古', reading: 'ちゅうこ', meaning: 'd\'occasion' },
          { word: '古本', reading: 'ふるほん', meaning: 'livre d\'occasion' }
        ],
        mnemonic: 'Dix (十) bouches (口) = transmis depuis dix générations',
        romaji: 'furui'
      },
      {
        kanji: '長',
        onyomi: ['チョウ'],
        kunyomi: ['なが(い)'],
        meaning: 'long, chef',
        strokes: 8,
        examples: [
          { word: '長い', reading: 'ながい', meaning: 'long' },
          { word: '社長', reading: 'しゃちょう', meaning: 'président (entreprise)' },
          { word: '長男', reading: 'ちょうなん', meaning: 'fils aîné' }
        ],
        mnemonic: 'Longs cheveux d\'un ancien = chef avec sagesse',
        romaji: 'nagai'
      }
    ]
  },

  // Leçon 16 : Adjectifs
  {
    id: 38,
    title: 'Kanji N5 - Leçon 16 : Adjectifs',
    category: 'kanji',
    type: 'kanji',
    description: 'Haut/cher, pas cher, beaucoup, peu et blanc',
    kanji: [
      {
        kanji: '高',
        onyomi: ['コウ'],
        kunyomi: ['たか(い)', 'たか(まる)', 'たか(める)'],
        meaning: 'haut, cher',
        strokes: 10,
        examples: [
          { word: '高い', reading: 'たかい', meaning: 'haut, cher' },
          { word: '高校', reading: 'こうこう', meaning: 'lycée' },
          { word: '最高', reading: 'さいこう', meaning: 'le meilleur' }
        ],
        mnemonic: 'Une tour haute avec un toit',
        romaji: 'takai'
      },
      {
        kanji: '安',
        onyomi: ['アン'],
        kunyomi: ['やす(い)', 'やす(らか)'],
        meaning: 'pas cher, paisible',
        strokes: 6,
        examples: [
          { word: '安い', reading: 'やすい', meaning: 'pas cher' },
          { word: '安心', reading: 'あんしん', meaning: 'tranquillité d\'esprit' },
          { word: '安全', reading: 'あんぜん', meaning: 'sécurité' }
        ],
        mnemonic: 'Femme (女) sous un toit (宀) = en sécurité, abordable',
        romaji: 'yasui'
      },
      {
        kanji: '多',
        onyomi: ['タ'],
        kunyomi: ['おお(い)'],
        meaning: 'beaucoup, nombreux',
        strokes: 6,
        examples: [
          { word: '多い', reading: 'おおい', meaning: 'nombreux' },
          { word: '多分', reading: 'たぶん', meaning: 'probablement' },
          { word: '多少', reading: 'たしょう', meaning: 'plus ou moins' }
        ],
        mnemonic: 'Deux soirs (夕夕) = beaucoup de temps',
        romaji: 'ooi'
      },
      {
        kanji: '少',
        onyomi: ['ショウ'],
        kunyomi: ['すく(ない)', 'すこ(し)'],
        meaning: 'peu, un peu',
        strokes: 4,
        examples: [
          { word: '少ない', reading: 'すくない', meaning: 'peu nombreux' },
          { word: '少し', reading: 'すこし', meaning: 'un peu' },
          { word: '少年', reading: 'しょうねん', meaning: 'garçon, jeune' }
        ],
        mnemonic: 'Petit (小) coupé = encore moins',
        romaji: 'sukunai'
      },
      {
        kanji: '白',
        onyomi: ['ハク', 'ビャク'],
        kunyomi: ['しろ', 'しろ(い)', 'しら'],
        meaning: 'blanc',
        strokes: 5,
        examples: [
          { word: '白い', reading: 'しろい', meaning: 'blanc' },
          { word: '白人', reading: 'はくじん', meaning: 'personne blanche' },
          { word: '白紙', reading: 'はくし', meaning: 'papier blanc' }
        ],
        mnemonic: 'Un rayon de soleil (日) blanc',
        romaji: 'shiroi'
      }
    ]
  },

  // Leçon 17 : Couleurs & Points cardinaux
  {
    id: 39,
    title: 'Kanji N5 - Leçon 17 : Couleurs & Points cardinaux',
    category: 'kanji',
    type: 'kanji',
    description: 'Noir, rouge, nord, sud et est',
    kanji: [
      {
        kanji: '黒',
        onyomi: ['コク'],
        kunyomi: ['くろ', 'くろ(い)'],
        meaning: 'noir',
        strokes: 11,
        examples: [
          { word: '黒い', reading: 'くろい', meaning: 'noir' },
          { word: '黒人', reading: 'こくじん', meaning: 'personne noire' },
          { word: '真っ黒', reading: 'まっくろ', meaning: 'tout noir' }
        ],
        mnemonic: 'Terre (土) brûlée par le feu (灬) = noir',
        romaji: 'kuroi'
      },
      {
        kanji: '赤',
        onyomi: ['セキ', 'シャク'],
        kunyomi: ['あか', 'あか(い)', 'あか(らむ)'],
        meaning: 'rouge',
        strokes: 7,
        examples: [
          { word: '赤い', reading: 'あかい', meaning: 'rouge' },
          { word: '赤ちゃん', reading: 'あかちゃん', meaning: 'bébé' },
          { word: '赤道', reading: 'せきどう', meaning: 'équateur' }
        ],
        mnemonic: 'Terre (土) + feu (火) = rouge comme la braise',
        romaji: 'akai'
      },
      {
        kanji: '北',
        onyomi: ['ホク'],
        kunyomi: ['きた'],
        meaning: 'nord',
        strokes: 5,
        examples: [
          { word: '北', reading: 'きた', meaning: 'nord' },
          { word: '北海道', reading: 'ほっかいどう', meaning: 'Hokkaido' },
          { word: '東北', reading: 'とうほく', meaning: 'Tohoku (région)' }
        ],
        mnemonic: 'Deux personnes dos à dos fuyant le froid du nord',
        romaji: 'kita'
      },
      {
        kanji: '南',
        onyomi: ['ナン', 'ナ'],
        kunyomi: ['みなみ'],
        meaning: 'sud',
        strokes: 9,
        examples: [
          { word: '南', reading: 'みなみ', meaning: 'sud' },
          { word: '南米', reading: 'なんべい', meaning: 'Amérique du Sud' },
          { word: '南口', reading: 'みなみぐち', meaning: 'sortie sud' }
        ],
        mnemonic: 'Plantes (艹) qui poussent vers le sud chaud',
        romaji: 'minami'
      },
      {
        kanji: '東',
        onyomi: ['トウ'],
        kunyomi: ['ひがし'],
        meaning: 'est',
        strokes: 8,
        examples: [
          { word: '東', reading: 'ひがし', meaning: 'est' },
          { word: '東京', reading: 'とうきょう', meaning: 'Tokyo' },
          { word: '東口', reading: 'ひがしぐち', meaning: 'sortie est' }
        ],
        mnemonic: 'Le soleil (日) se lève à travers les arbres (木) à l\'est',
        romaji: 'higashi'
      }
    ]
  },

  // Leçon 18 : Pays & Chemins
  {
    id: 40,
    title: 'Kanji N5 - Leçon 18 : Pays & Chemins',
    category: 'kanji',
    type: 'kanji',
    description: 'Ouest, pays, extérieur, chemin et intervalle',
    kanji: [
      {
        kanji: '西',
        onyomi: ['セイ', 'サイ'],
        kunyomi: ['にし'],
        meaning: 'ouest',
        strokes: 6,
        examples: [
          { word: '西', reading: 'にし', meaning: 'ouest' },
          { word: '西口', reading: 'にしぐち', meaning: 'sortie ouest' },
          { word: '関西', reading: 'かんさい', meaning: 'Kansai (région)' }
        ],
        mnemonic: 'Un oiseau (鳥) rentrant à l\'ouest au coucher du soleil',
        romaji: 'nishi'
      },
      {
        kanji: '国',
        onyomi: ['コク'],
        kunyomi: ['くに'],
        meaning: 'pays',
        strokes: 8,
        examples: [
          { word: '国', reading: 'くに', meaning: 'pays' },
          { word: '外国', reading: 'がいこく', meaning: 'pays étranger' },
          { word: '中国', reading: 'ちゅうごく', meaning: 'Chine' }
        ],
        mnemonic: 'Jade (玉) protégé par des frontières (囗) = pays',
        romaji: 'kuni'
      },
      {
        kanji: '外',
        onyomi: ['ガイ', 'ゲ'],
        kunyomi: ['そと', 'ほか', 'はず(す)'],
        meaning: 'extérieur, autre',
        strokes: 5,
        examples: [
          { word: '外', reading: 'そと', meaning: 'extérieur' },
          { word: '外国人', reading: 'がいこくじん', meaning: 'étranger' },
          { word: '外出', reading: 'がいしゅつ', meaning: 'sortie' }
        ],
        mnemonic: 'Soir (夕) + divination (卜) = chercher dehors la nuit',
        romaji: 'soto'
      },
      {
        kanji: '道',
        onyomi: ['ドウ', 'トウ'],
        kunyomi: ['みち'],
        meaning: 'chemin, voie',
        strokes: 12,
        examples: [
          { word: '道', reading: 'みち', meaning: 'chemin' },
          { word: '道路', reading: 'どうろ', meaning: 'route' },
          { word: '北海道', reading: 'ほっかいどう', meaning: 'Hokkaido' }
        ],
        mnemonic: 'Tête (首) sur une route (辶) = suivre le chemin',
        romaji: 'michi'
      },
      {
        kanji: '間',
        onyomi: ['カン', 'ケン'],
        kunyomi: ['あいだ', 'ま'],
        meaning: 'entre, intervalle',
        strokes: 12,
        examples: [
          { word: '間', reading: 'あいだ', meaning: 'entre' },
          { word: '時間', reading: 'じかん', meaning: 'temps' },
          { word: '人間', reading: 'にんげん', meaning: 'être humain' }
        ],
        mnemonic: 'Soleil (日) visible par la porte (門) = espace entre',
        romaji: 'aida'
      }
    ]
  },

  // Leçon 19 : Lieux & Transport
  {
    id: 41,
    title: 'Kanji N5 - Leçon 19 : Lieux & Transport',
    category: 'kanji',
    type: 'kanji',
    description: 'Magasin, gare, électricité, voiture et porte',
    kanji: [
      {
        kanji: '店',
        onyomi: ['テン'],
        kunyomi: ['みせ'],
        meaning: 'magasin, boutique',
        strokes: 8,
        examples: [
          { word: '店', reading: 'みせ', meaning: 'magasin' },
          { word: '喫茶店', reading: 'きっさてん', meaning: 'café (lieu)' },
          { word: '店員', reading: 'てんいん', meaning: 'vendeur' }
        ],
        mnemonic: 'Toit (广) + divination (占) = lieu pour acheter',
        romaji: 'mise'
      },
      {
        kanji: '駅',
        onyomi: ['エキ'],
        kunyomi: [],
        meaning: 'gare',
        strokes: 14,
        examples: [
          { word: '駅', reading: 'えき', meaning: 'gare' },
          { word: '東京駅', reading: 'とうきょうえき', meaning: 'gare de Tokyo' },
          { word: '駅前', reading: 'えきまえ', meaning: 'devant la gare' }
        ],
        mnemonic: 'Cheval (馬) + relais (尺) = relais de chevaux = gare',
        romaji: 'eki'
      },
      {
        kanji: '電',
        onyomi: ['デン'],
        kunyomi: [],
        meaning: 'électricité',
        strokes: 13,
        examples: [
          { word: '電車', reading: 'でんしゃ', meaning: 'train électrique' },
          { word: '電話', reading: 'でんわ', meaning: 'téléphone' },
          { word: '電気', reading: 'でんき', meaning: 'électricité' }
        ],
        mnemonic: 'Pluie (雨) + éclair = électricité',
        romaji: 'den'
      },
      {
        kanji: '車',
        onyomi: ['シャ'],
        kunyomi: ['くるま'],
        meaning: 'voiture, véhicule',
        strokes: 7,
        examples: [
          { word: '車', reading: 'くるま', meaning: 'voiture' },
          { word: '電車', reading: 'でんしゃ', meaning: 'train' },
          { word: '自転車', reading: 'じてんしゃ', meaning: 'vélo' }
        ],
        mnemonic: 'Une roue de char vue de dessus',
        romaji: 'kuruma'
      },
      {
        kanji: '門',
        onyomi: ['モン'],
        kunyomi: ['かど'],
        meaning: 'porte, portail',
        strokes: 8,
        examples: [
          { word: '門', reading: 'もん', meaning: 'porte' },
          { word: '専門', reading: 'せんもん', meaning: 'spécialité' },
          { word: '正門', reading: 'せいもん', meaning: 'porte principale' }
        ],
        mnemonic: 'Deux battants de porte',
        romaji: 'mon'
      }
    ]
  },

  // Leçon 20 : Corps & Famille
  {
    id: 42,
    title: 'Kanji N5 - Leçon 20 : Corps & Famille',
    category: 'kanji',
    type: 'kanji',
    description: 'Œil, bouche, main, pied, père, mère et ami',
    kanji: [
      {
        kanji: '目',
        onyomi: ['モク', 'ボク'],
        kunyomi: ['め', 'ま'],
        meaning: 'œil',
        strokes: 5,
        examples: [
          { word: '目', reading: 'め', meaning: 'œil' },
          { word: '目的', reading: 'もくてき', meaning: 'but, objectif' },
          { word: '一番目', reading: 'いちばんめ', meaning: 'premier' }
        ],
        mnemonic: 'Un œil tourné sur le côté',
        romaji: 'me'
      },
      {
        kanji: '口',
        onyomi: ['コウ', 'ク'],
        kunyomi: ['くち'],
        meaning: 'bouche',
        strokes: 3,
        examples: [
          { word: '口', reading: 'くち', meaning: 'bouche' },
          { word: '入口', reading: 'いりぐち', meaning: 'entrée' },
          { word: '出口', reading: 'でぐち', meaning: 'sortie' }
        ],
        mnemonic: 'Une bouche ouverte',
        romaji: 'kuchi'
      },
      {
        kanji: '手',
        onyomi: ['シュ'],
        kunyomi: ['て', 'た'],
        meaning: 'main',
        strokes: 4,
        examples: [
          { word: '手', reading: 'て', meaning: 'main' },
          { word: '上手', reading: 'じょうず', meaning: 'doué' },
          { word: '手紙', reading: 'てがみ', meaning: 'lettre' }
        ],
        mnemonic: 'Une main avec ses doigts',
        romaji: 'te'
      },
      {
        kanji: '足',
        onyomi: ['ソク'],
        kunyomi: ['あし', 'た(りる)', 'た(す)'],
        meaning: 'pied, jambe, suffisant',
        strokes: 7,
        examples: [
          { word: '足', reading: 'あし', meaning: 'pied, jambe' },
          { word: '足りる', reading: 'たりる', meaning: 'suffire' },
          { word: '遠足', reading: 'えんそく', meaning: 'excursion' }
        ],
        mnemonic: 'Bouche (口) + arrêter (止) = pied au sol',
        romaji: 'ashi'
      },
      {
        kanji: '父',
        onyomi: ['フ'],
        kunyomi: ['ちち'],
        meaning: 'père',
        strokes: 4,
        examples: [
          { word: '父', reading: 'ちち', meaning: 'père (le mien)' },
          { word: 'お父さん', reading: 'おとうさん', meaning: 'père (poli)' },
          { word: '父母', reading: 'ふぼ', meaning: 'parents' }
        ],
        mnemonic: 'Deux mains croisées d\'un père protecteur',
        romaji: 'chichi'
      },
      {
        kanji: '母',
        onyomi: ['ボ'],
        kunyomi: ['はは'],
        meaning: 'mère',
        strokes: 5,
        examples: [
          { word: '母', reading: 'はは', meaning: 'mère (la mienne)' },
          { word: 'お母さん', reading: 'おかあさん', meaning: 'mère (poli)' },
          { word: '母国', reading: 'ぼこく', meaning: 'patrie' }
        ],
        mnemonic: 'Une femme qui allaite (deux points = seins)',
        romaji: 'haha'
      },
      {
        kanji: '友',
        onyomi: ['ユウ'],
        kunyomi: ['とも'],
        meaning: 'ami',
        strokes: 4,
        examples: [
          { word: '友達', reading: 'ともだち', meaning: 'ami' },
          { word: '友人', reading: 'ゆうじん', meaning: 'ami (formel)' },
          { word: '親友', reading: 'しんゆう', meaning: 'meilleur ami' }
        ],
        mnemonic: 'Deux mains (又又) qui se rejoignent = amitié',
        romaji: 'tomo'
      }
    ]
  }
];

// Export également un tableau plat de tous les kanji pour un accès facile
export const allKanjiN5 = kanjiN5Lessons.reduce((acc, lesson) => {
  return [...acc, ...lesson.kanji];
}, []);

/**
 * Mélange un tableau (Fisher-Yates)
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Récupère N éléments aléatoires d'un tableau (différents de l'élément exclu)
 */
const getRandomItems = (array, count, excludeItem) => {
  const filtered = array.filter(item => item !== excludeItem);
  const shuffled = shuffleArray(filtered);
  return shuffled.slice(0, count);
};

/**
 * Génère des exercices pour une leçon de kanji
 * Crée 3 types d'exercices pour chaque kanji
 */
export const generateKanjiExercises = (kanjiLesson) => {
  const exercises = [];
  const kanjiList = kanjiLesson.kanji;

  // Collecter toutes les significations et lectures pour générer les mauvaises réponses
  const allMeanings = allKanjiN5.map(k => k.meaning);
  const allReadings = allKanjiN5.flatMap(k => [...(k.onyomi || []), ...(k.kunyomi || [])]);
  const allExampleMeanings = allKanjiN5.flatMap(k => k.examples?.map(ex => ex.meaning) || []);

  kanjiList.forEach((kanji) => {
    // ============================================
    // Type 1: RECONNAISSANCE (Quelle est la signification ?)
    // ============================================
    const wrongMeanings = getRandomItems(allMeanings, 3, kanji.meaning);
    const recognitionOptions = shuffleArray([kanji.meaning, ...wrongMeanings]);

    exercises.push({
      type: 'kanji_recognition',
      question: 'Quelle est la signification de ce kanji ?',
      character: kanji.kanji,
      correct: kanji.meaning,
      options: recognitionOptions,
      hint: `${kanji.strokes} traits`,
      audio: kanji.romaji,
    });

    // ============================================
    // Type 2: LECTURE (Comment se lit ce kanji ?)
    // ============================================
    // Utiliser la première lecture ON ou KUN
    const primaryReading = kanji.kunyomi?.[0] || kanji.onyomi?.[0];
    if (primaryReading) {
      const wrongReadings = getRandomItems(allReadings, 3, primaryReading);
      const readingOptions = shuffleArray([primaryReading, ...wrongReadings]);

      exercises.push({
        type: 'kanji_reading',
        question: 'Comment se lit ce kanji ?',
        character: kanji.kanji,
        correct: primaryReading,
        options: readingOptions,
        hint: kanji.meaning,
        audio: kanji.romaji,
      });
    }

    // ============================================
    // Type 3: SIGNIFICATION MOT (Que signifie ce mot ?)
    // ============================================
    // Pour chaque exemple, créer un exercice
    if (kanji.examples && kanji.examples.length > 0) {
      // Prendre 1-2 exemples par kanji pour ne pas surcharger
      const selectedExamples = kanji.examples.slice(0, 2);

      selectedExamples.forEach((example) => {
        const wrongExampleMeanings = getRandomItems(allExampleMeanings, 3, example.meaning);
        const meaningOptions = shuffleArray([example.meaning, ...wrongExampleMeanings]);

        exercises.push({
          type: 'kanji_meaning',
          question: 'Que signifie ce mot ?',
          word: example.word,
          reading: example.reading,
          character: example.word,
          correct: example.meaning,
          options: meaningOptions,
          hint: `Lecture: ${example.reading}`,
        });
      });
    }
  });

  return shuffleArray(exercises);
};

/**
 * Ajoute les exercices générés à chaque leçon kanji
 * Cette fonction modifie les leçons en place
 */
export const addExercisesToKanjiLessons = () => {
  kanjiN5Lessons.forEach(lesson => {
    if (!lesson.exercises || lesson.exercises.length === 0) {
      lesson.exercises = generateKanjiExercises(lesson);
    }
  });
};

// Générer automatiquement les exercices au chargement
addExercisesToKanjiLessons();

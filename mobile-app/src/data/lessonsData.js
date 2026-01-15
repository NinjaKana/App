/**
 * Lessons Data - Structure des leçons Hiragana/Katakana/Vocabulaire/Kanji
 * Converti automatiquement depuis html-version/lessons-data.js
 * Date de conversion: 13/12/2025 08:54:39
 * Kanji N5 ajouté: 15/12/2025
 */

import { kanjiN5Lessons } from './kanjiN5';

// ========================================
// HIRAGANA LESSONS (11 leçons)
// ========================================

export const hiraganaLessons = [
  {
    "id": 1,
    "title": "Les Voyelles",
    "description": "a, i, u, e, o",
    "difficulty": "Débutant",
    "category": "hiragana",
    "free": true,
    "characters": [
      {
        "hiragana": "あ",
        "romaji": "a",
        "pronunciation": "a",
        "mnemonic": "Caractère あ",
        "examples": [],
        "audio": "a.mp3"
      },
      {
        "hiragana": "い",
        "romaji": "i",
        "pronunciation": "i",
        "mnemonic": "Caractère い",
        "examples": [],
        "audio": "i.mp3"
      },
      {
        "hiragana": "う",
        "romaji": "u",
        "pronunciation": "u",
        "mnemonic": "Caractère う",
        "examples": [],
        "audio": "u.mp3"
      },
      {
        "hiragana": "え",
        "romaji": "e",
        "pronunciation": "e",
        "mnemonic": "Caractère え",
        "examples": [],
        "audio": "e.mp3"
      },
      {
        "hiragana": "お",
        "romaji": "o",
        "pronunciation": "o",
        "mnemonic": "Caractère お",
        "examples": [],
        "audio": "o.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de あ ?",
        "options": [
          "a",
          "i",
          "u",
          "e"
        ],
        "correct": "a",
        "character": "あ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de い ?",
        "options": [
          "i",
          "a",
          "e",
          "o"
        ],
        "correct": "i",
        "character": "い"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de う ?",
        "options": [
          "u",
          "o",
          "a",
          "i"
        ],
        "correct": "u",
        "character": "う"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de え ?",
        "options": [
          "e",
          "i",
          "a",
          "o"
        ],
        "correct": "e",
        "character": "え"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de お ?",
        "options": [
          "o",
          "u",
          "a",
          "e"
        ],
        "correct": "o",
        "character": "お"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: あい",
        "correct": "ai",
        "character": "あい",
        "meaning": "amour"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: いえ",
        "correct": "ie",
        "character": "いえ",
        "meaning": "maison"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: うえ",
        "correct": "ue",
        "character": "うえ",
        "meaning": "dessus"
      }
    ]
  },
  {
    "id": 2,
    "title": "Colonne KA",
    "description": "ka, ki, ku, ke, ko",
    "difficulty": "Débutant",
    "category": "hiragana",
    "free": true,
    "characters": [
      {
        "hiragana": "か",
        "romaji": "ka",
        "pronunciation": "ka",
        "mnemonic": "Caractère か",
        "examples": [],
        "audio": "ka.mp3"
      },
      {
        "hiragana": "き",
        "romaji": "ki",
        "pronunciation": "ki",
        "mnemonic": "Caractère き",
        "examples": [],
        "audio": "ki.mp3"
      },
      {
        "hiragana": "く",
        "romaji": "ku",
        "pronunciation": "ku",
        "mnemonic": "Caractère く",
        "examples": [],
        "audio": "ku.mp3"
      },
      {
        "hiragana": "け",
        "romaji": "ke",
        "pronunciation": "ke",
        "mnemonic": "Caractère け",
        "examples": [],
        "audio": "ke.mp3"
      },
      {
        "hiragana": "こ",
        "romaji": "ko",
        "pronunciation": "ko",
        "mnemonic": "Caractère こ",
        "examples": [],
        "audio": "ko.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de か ?",
        "options": [
          "ka",
          "ki",
          "ku",
          "ke"
        ],
        "correct": "ka",
        "character": "か"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de き ?",
        "options": [
          "ki",
          "ka",
          "ku",
          "ke"
        ],
        "correct": "ki",
        "character": "き"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de く ?",
        "options": [
          "ku",
          "ka",
          "ki",
          "ko"
        ],
        "correct": "ku",
        "character": "く"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de け ?",
        "options": [
          "ke",
          "ka",
          "ki",
          "ko"
        ],
        "correct": "ke",
        "character": "け"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de こ ?",
        "options": [
          "ko",
          "ku",
          "ka",
          "ke"
        ],
        "correct": "ko",
        "character": "こ"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: かお",
        "correct": "kao",
        "character": "かお",
        "meaning": "visage"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: おか",
        "correct": "oka",
        "character": "おか",
        "meaning": "colline"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: いけ",
        "correct": "ike",
        "character": "いけ",
        "meaning": "étang"
      }
    ]
  },
  {
    "id": 3,
    "title": "S + T",
    "description": "sa, shi, su, se, so, ta, chi, tsu, te, to",
    "difficulty": "Débutant",
    "category": "hiragana",
    "free": true,
    "characters": [
      {
        "hiragana": "さ",
        "romaji": "sa",
        "pronunciation": "sa",
        "mnemonic": "Caractère さ",
        "examples": [],
        "audio": "sa.mp3"
      },
      {
        "hiragana": "し",
        "romaji": "shi",
        "pronunciation": "shi",
        "mnemonic": "Caractère し",
        "examples": [],
        "audio": "shi.mp3"
      },
      {
        "hiragana": "す",
        "romaji": "su",
        "pronunciation": "su",
        "mnemonic": "Caractère す",
        "examples": [],
        "audio": "su.mp3"
      },
      {
        "hiragana": "せ",
        "romaji": "se",
        "pronunciation": "se",
        "mnemonic": "Caractère せ",
        "examples": [],
        "audio": "se.mp3"
      },
      {
        "hiragana": "そ",
        "romaji": "so",
        "pronunciation": "so",
        "mnemonic": "Caractère そ",
        "examples": [],
        "audio": "so.mp3"
      },
      {
        "hiragana": "た",
        "romaji": "ta",
        "pronunciation": "ta",
        "mnemonic": "Caractère た",
        "examples": [],
        "audio": "ta.mp3"
      },
      {
        "hiragana": "ち",
        "romaji": "chi",
        "pronunciation": "chi",
        "mnemonic": "Caractère ち",
        "examples": [],
        "audio": "chi.mp3"
      },
      {
        "hiragana": "つ",
        "romaji": "tsu",
        "pronunciation": "tsu",
        "mnemonic": "Caractère つ",
        "examples": [],
        "audio": "tsu.mp3"
      },
      {
        "hiragana": "て",
        "romaji": "te",
        "pronunciation": "te",
        "mnemonic": "Caractère て",
        "examples": [],
        "audio": "te.mp3"
      },
      {
        "hiragana": "と",
        "romaji": "to",
        "pronunciation": "to",
        "mnemonic": "Caractère と",
        "examples": [],
        "audio": "to.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de さ ?",
        "options": [
          "sa",
          "shi",
          "su",
          "se"
        ],
        "correct": "sa",
        "character": "さ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de し ?",
        "options": [
          "shi",
          "sa",
          "su",
          "se"
        ],
        "correct": "shi",
        "character": "し"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de す ?",
        "options": [
          "su",
          "sa",
          "shi",
          "so"
        ],
        "correct": "su",
        "character": "す"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de た ?",
        "options": [
          "ta",
          "chi",
          "tsu",
          "te"
        ],
        "correct": "ta",
        "character": "た"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ち ?",
        "options": [
          "chi",
          "ta",
          "tsu",
          "te"
        ],
        "correct": "chi",
        "character": "ち"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de つ ?",
        "options": [
          "tsu",
          "ta",
          "chi",
          "to"
        ],
        "correct": "tsu",
        "character": "つ"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "さ",
          "し",
          "た",
          "そ"
        ],
        "correct": "た",
        "explanation": "'た' (ta) appartient à la série T, pas S"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: さけ",
        "correct": "sake",
        "character": "さけ",
        "meaning": "saké/alcool"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: した",
        "correct": "shita",
        "character": "した",
        "meaning": "sous/langue"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: すし",
        "correct": "sushi",
        "character": "すし",
        "meaning": "sushi"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: たこ",
        "correct": "tako",
        "character": "たこ",
        "meaning": "poulpe"
      }
    ]
  },
  {
    "id": 4,
    "title": "N + H",
    "description": "na, ni, nu, ne, no, ha, hi, fu, he, ho",
    "difficulty": "Débutant",
    "category": "hiragana",
    "free": true,
    "characters": [
      {
        "hiragana": "な",
        "romaji": "na",
        "pronunciation": "na",
        "mnemonic": "Caractère な",
        "examples": [],
        "audio": "na.mp3"
      },
      {
        "hiragana": "に",
        "romaji": "ni",
        "pronunciation": "ni",
        "mnemonic": "Caractère に",
        "examples": [],
        "audio": "ni.mp3"
      },
      {
        "hiragana": "ぬ",
        "romaji": "nu",
        "pronunciation": "nu",
        "mnemonic": "Caractère ぬ",
        "examples": [],
        "audio": "nu.mp3"
      },
      {
        "hiragana": "ね",
        "romaji": "ne",
        "pronunciation": "ne",
        "mnemonic": "Caractère ね",
        "examples": [],
        "audio": "ne.mp3"
      },
      {
        "hiragana": "の",
        "romaji": "no",
        "pronunciation": "no",
        "mnemonic": "Caractère の",
        "examples": [],
        "audio": "no.mp3"
      },
      {
        "hiragana": "は",
        "romaji": "ha",
        "pronunciation": "ha",
        "mnemonic": "Caractère は",
        "examples": [],
        "audio": "ha.mp3"
      },
      {
        "hiragana": "ひ",
        "romaji": "hi",
        "pronunciation": "hi",
        "mnemonic": "Caractère ひ",
        "examples": [],
        "audio": "hi.mp3"
      },
      {
        "hiragana": "ふ",
        "romaji": "fu",
        "pronunciation": "fu",
        "mnemonic": "Caractère ふ",
        "examples": [],
        "audio": "fu.mp3"
      },
      {
        "hiragana": "へ",
        "romaji": "he",
        "pronunciation": "he",
        "mnemonic": "Caractère へ",
        "examples": [],
        "audio": "he.mp3"
      },
      {
        "hiragana": "ほ",
        "romaji": "ho",
        "pronunciation": "ho",
        "mnemonic": "Caractère ほ",
        "examples": [],
        "audio": "ho.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de な ?",
        "options": [
          "na",
          "ni",
          "nu",
          "ne"
        ],
        "correct": "na",
        "character": "な"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de に ?",
        "options": [
          "ni",
          "na",
          "nu",
          "no"
        ],
        "correct": "ni",
        "character": "に"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de は ?",
        "options": [
          "ha",
          "hi",
          "fu",
          "he"
        ],
        "correct": "ha",
        "character": "は"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ひ ?",
        "options": [
          "hi",
          "ha",
          "fu",
          "ho"
        ],
        "correct": "hi",
        "character": "ひ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ふ ?",
        "options": [
          "fu",
          "ha",
          "hi",
          "ho"
        ],
        "correct": "fu",
        "character": "ふ"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "な",
          "に",
          "は",
          "ね"
        ],
        "correct": "は",
        "explanation": "'は' (ha) appartient à la série H, pas N"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: なに",
        "correct": "nani",
        "character": "なに",
        "meaning": "quoi"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ねこ",
        "correct": "neko",
        "character": "ねこ",
        "meaning": "chat"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: はな",
        "correct": "hana",
        "character": "はな",
        "meaning": "fleur/nez"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ひと",
        "correct": "hito",
        "character": "ひと",
        "meaning": "personne"
      }
    ]
  },
  {
    "id": 5,
    "title": "M + Y + R",
    "description": "ma, mi, mu, me, mo, ya, yu, yo, ra, ri, ru, re, ro",
    "difficulty": "Intermédiaire",
    "category": "hiragana",
    "free": true,
    "characters": [
      {
        "hiragana": "ま",
        "romaji": "ma",
        "pronunciation": "ma",
        "mnemonic": "Caractère ま",
        "examples": [],
        "audio": "ma.mp3"
      },
      {
        "hiragana": "み",
        "romaji": "mi",
        "pronunciation": "mi",
        "mnemonic": "Caractère み",
        "examples": [],
        "audio": "mi.mp3"
      },
      {
        "hiragana": "む",
        "romaji": "mu",
        "pronunciation": "mu",
        "mnemonic": "Caractère む",
        "examples": [],
        "audio": "mu.mp3"
      },
      {
        "hiragana": "め",
        "romaji": "me",
        "pronunciation": "me",
        "mnemonic": "Caractère め",
        "examples": [],
        "audio": "me.mp3"
      },
      {
        "hiragana": "も",
        "romaji": "mo",
        "pronunciation": "mo",
        "mnemonic": "Caractère も",
        "examples": [],
        "audio": "mo.mp3"
      },
      {
        "hiragana": "や",
        "romaji": "ya",
        "pronunciation": "ya",
        "mnemonic": "Caractère や",
        "examples": [],
        "audio": "ya.mp3"
      },
      {
        "hiragana": "ゆ",
        "romaji": "yu",
        "pronunciation": "yu",
        "mnemonic": "Caractère ゆ",
        "examples": [],
        "audio": "yu.mp3"
      },
      {
        "hiragana": "よ",
        "romaji": "yo",
        "pronunciation": "yo",
        "mnemonic": "Caractère よ",
        "examples": [],
        "audio": "yo.mp3"
      },
      {
        "hiragana": "ら",
        "romaji": "ra",
        "pronunciation": "ra",
        "mnemonic": "Caractère ら",
        "examples": [],
        "audio": "ra.mp3"
      },
      {
        "hiragana": "り",
        "romaji": "ri",
        "pronunciation": "ri",
        "mnemonic": "Caractère り",
        "examples": [],
        "audio": "ri.mp3"
      },
      {
        "hiragana": "る",
        "romaji": "ru",
        "pronunciation": "ru",
        "mnemonic": "Caractère る",
        "examples": [],
        "audio": "ru.mp3"
      },
      {
        "hiragana": "れ",
        "romaji": "re",
        "pronunciation": "re",
        "mnemonic": "Caractère れ",
        "examples": [],
        "audio": "re.mp3"
      },
      {
        "hiragana": "ろ",
        "romaji": "ro",
        "pronunciation": "ro",
        "mnemonic": "Caractère ろ",
        "examples": [],
        "audio": "ro.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de ま ?",
        "options": [
          "ma",
          "mi",
          "mu",
          "me"
        ],
        "correct": "ma",
        "character": "ま"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de や ?",
        "options": [
          "ya",
          "yu",
          "yo",
          "ra"
        ],
        "correct": "ya",
        "character": "や"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ら ?",
        "options": [
          "ra",
          "ri",
          "ru",
          "re"
        ],
        "correct": "ra",
        "character": "ら"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de り ?",
        "options": [
          "ri",
          "ra",
          "ru",
          "ro"
        ],
        "correct": "ri",
        "character": "り"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "ま",
          "み",
          "や",
          "も"
        ],
        "correct": "や",
        "explanation": "'や' (ya) appartient à la série Y, pas M"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: まち",
        "correct": "machi",
        "character": "まち",
        "meaning": "ville"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: やま",
        "correct": "yama",
        "character": "やま",
        "meaning": "montagne"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ゆき",
        "correct": "yuki",
        "character": "ゆき",
        "meaning": "neige"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: りんご",
        "correct": "ringo",
        "character": "りんご",
        "meaning": "pomme"
      }
    ]
  },
  {
    "id": 6,
    "title": "W + N",
    "description": "wa, wo, n",
    "difficulty": "Intermédiaire",
    "category": "hiragana",
    "free": true,
    "characters": [
      {
        "hiragana": "わ",
        "romaji": "wa",
        "pronunciation": "wa",
        "mnemonic": "Caractère わ",
        "examples": [],
        "audio": "wa.mp3"
      },
      {
        "hiragana": "を",
        "romaji": "wo",
        "pronunciation": "wo",
        "mnemonic": "Caractère を",
        "examples": [],
        "audio": "wo.mp3"
      },
      {
        "hiragana": "ん",
        "romaji": "n",
        "pronunciation": "n",
        "mnemonic": "Caractère ん",
        "examples": [],
        "audio": "n.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de わ ?",
        "options": [
          "wa",
          "wo",
          "n",
          "o"
        ],
        "correct": "wa",
        "character": "わ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de を ?",
        "options": [
          "wo",
          "wa",
          "o",
          "n"
        ],
        "correct": "wo",
        "character": "を"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ん ?",
        "options": [
          "n",
          "wa",
          "wo",
          "shi"
        ],
        "correct": "n",
        "character": "ん"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: わたし",
        "correct": "watashi",
        "character": "わたし",
        "meaning": "je/moi"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: にほん",
        "correct": "nihon",
        "character": "にほん",
        "meaning": "Japon"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: せんせい",
        "correct": "sensei",
        "character": "せんせい",
        "meaning": "professeur"
      }
    ]
  },
  {
    "id": 7,
    "title": "Dakuten G + Z",
    "description": "ga, gi, gu, ge, go, za, ji, zu, ze, zo",
    "difficulty": "Intermédiaire",
    "category": "hiragana",
    "free": false,
    "characters": [
      {
        "hiragana": "が",
        "romaji": "ga",
        "pronunciation": "ga",
        "mnemonic": "Caractère が",
        "examples": [],
        "audio": "ga.mp3"
      },
      {
        "hiragana": "ぎ",
        "romaji": "gi",
        "pronunciation": "gi",
        "mnemonic": "Caractère ぎ",
        "examples": [],
        "audio": "gi.mp3"
      },
      {
        "hiragana": "ぐ",
        "romaji": "gu",
        "pronunciation": "gu",
        "mnemonic": "Caractère ぐ",
        "examples": [],
        "audio": "gu.mp3"
      },
      {
        "hiragana": "げ",
        "romaji": "ge",
        "pronunciation": "ge",
        "mnemonic": "Caractère げ",
        "examples": [],
        "audio": "ge.mp3"
      },
      {
        "hiragana": "ご",
        "romaji": "go",
        "pronunciation": "go",
        "mnemonic": "Caractère ご",
        "examples": [],
        "audio": "go.mp3"
      },
      {
        "hiragana": "ざ",
        "romaji": "za",
        "pronunciation": "za",
        "mnemonic": "Caractère ざ",
        "examples": [],
        "audio": "za.mp3"
      },
      {
        "hiragana": "じ",
        "romaji": "ji",
        "pronunciation": "ji",
        "mnemonic": "Caractère じ",
        "examples": [],
        "audio": "ji.mp3"
      },
      {
        "hiragana": "ず",
        "romaji": "zu",
        "pronunciation": "zu",
        "mnemonic": "Caractère ず",
        "examples": [],
        "audio": "zu.mp3"
      },
      {
        "hiragana": "ぜ",
        "romaji": "ze",
        "pronunciation": "ze",
        "mnemonic": "Caractère ぜ",
        "examples": [],
        "audio": "ze.mp3"
      },
      {
        "hiragana": "ぞ",
        "romaji": "zo",
        "pronunciation": "zo",
        "mnemonic": "Caractère ぞ",
        "examples": [],
        "audio": "zo.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de が ?",
        "options": [
          "ga",
          "ka",
          "gi",
          "ki"
        ],
        "correct": "ga",
        "character": "が"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ぎ ?",
        "options": [
          "gi",
          "ki",
          "ga",
          "gu"
        ],
        "correct": "gi",
        "character": "ぎ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ざ ?",
        "options": [
          "za",
          "sa",
          "ji",
          "shi"
        ],
        "correct": "za",
        "character": "ざ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de じ ?",
        "options": [
          "ji",
          "shi",
          "za",
          "zu"
        ],
        "correct": "ji",
        "character": "じ"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: かぎ",
        "correct": "kagi",
        "character": "かぎ",
        "meaning": "clé"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: たまご",
        "correct": "tamago",
        "character": "たまご",
        "meaning": "œuf"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ざっし",
        "correct": "zasshi",
        "character": "ざっし",
        "meaning": "magazine"
      }
    ]
  },
  {
    "id": 8,
    "title": "Dakuten D + B",
    "description": "da, ji, zu, de, do, ba, bi, bu, be, bo",
    "difficulty": "Intermédiaire",
    "category": "hiragana",
    "free": false,
    "characters": [
      {
        "hiragana": "だ",
        "romaji": "da",
        "pronunciation": "da",
        "mnemonic": "Caractère だ",
        "examples": [],
        "audio": "da.mp3"
      },
      {
        "hiragana": "ぢ",
        "romaji": "ji",
        "pronunciation": "ji",
        "mnemonic": "Caractère ぢ",
        "examples": [],
        "audio": "ji.mp3"
      },
      {
        "hiragana": "づ",
        "romaji": "zu",
        "pronunciation": "zu",
        "mnemonic": "Caractère づ",
        "examples": [],
        "audio": "zu.mp3"
      },
      {
        "hiragana": "で",
        "romaji": "de",
        "pronunciation": "de",
        "mnemonic": "Caractère で",
        "examples": [],
        "audio": "de.mp3"
      },
      {
        "hiragana": "ど",
        "romaji": "do",
        "pronunciation": "do",
        "mnemonic": "Caractère ど",
        "examples": [],
        "audio": "do.mp3"
      },
      {
        "hiragana": "ば",
        "romaji": "ba",
        "pronunciation": "ba",
        "mnemonic": "Caractère ば",
        "examples": [],
        "audio": "ba.mp3"
      },
      {
        "hiragana": "び",
        "romaji": "bi",
        "pronunciation": "bi",
        "mnemonic": "Caractère び",
        "examples": [],
        "audio": "bi.mp3"
      },
      {
        "hiragana": "ぶ",
        "romaji": "bu",
        "pronunciation": "bu",
        "mnemonic": "Caractère ぶ",
        "examples": [],
        "audio": "bu.mp3"
      },
      {
        "hiragana": "べ",
        "romaji": "be",
        "pronunciation": "be",
        "mnemonic": "Caractère べ",
        "examples": [],
        "audio": "be.mp3"
      },
      {
        "hiragana": "ぼ",
        "romaji": "bo",
        "pronunciation": "bo",
        "mnemonic": "Caractère ぼ",
        "examples": [],
        "audio": "bo.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de だ ?",
        "options": [
          "da",
          "ta",
          "de",
          "te"
        ],
        "correct": "da",
        "character": "だ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ば ?",
        "options": [
          "ba",
          "ha",
          "bi",
          "hi"
        ],
        "correct": "ba",
        "character": "ば"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de で ?",
        "options": [
          "de",
          "te",
          "da",
          "do"
        ],
        "correct": "de",
        "character": "で"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: だいがく",
        "correct": "daigaku",
        "character": "だいがく",
        "meaning": "université"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ばんごはん",
        "correct": "bangohan",
        "character": "ばんごはん",
        "meaning": "dîner"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: てぶくろ",
        "correct": "tebukuro",
        "character": "てぶくろ",
        "meaning": "gants"
      }
    ]
  },
  {
    "id": 9,
    "title": "Handakuten P",
    "description": "pa, pi, pu, pe, po",
    "difficulty": "Avancé",
    "category": "hiragana",
    "free": false,
    "characters": [
      {
        "hiragana": "ぱ",
        "romaji": "pa",
        "pronunciation": "pa",
        "mnemonic": "Caractère ぱ",
        "examples": [],
        "audio": "pa.mp3"
      },
      {
        "hiragana": "ぴ",
        "romaji": "pi",
        "pronunciation": "pi",
        "mnemonic": "Caractère ぴ",
        "examples": [],
        "audio": "pi.mp3"
      },
      {
        "hiragana": "ぷ",
        "romaji": "pu",
        "pronunciation": "pu",
        "mnemonic": "Caractère ぷ",
        "examples": [],
        "audio": "pu.mp3"
      },
      {
        "hiragana": "ぺ",
        "romaji": "pe",
        "pronunciation": "pe",
        "mnemonic": "Caractère ぺ",
        "examples": [],
        "audio": "pe.mp3"
      },
      {
        "hiragana": "ぽ",
        "romaji": "po",
        "pronunciation": "po",
        "mnemonic": "Caractère ぽ",
        "examples": [],
        "audio": "po.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de ぱ ?",
        "options": [
          "pa",
          "ha",
          "ba",
          "pi"
        ],
        "correct": "pa",
        "character": "ぱ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ぴ ?",
        "options": [
          "pi",
          "hi",
          "bi",
          "pa"
        ],
        "correct": "pi",
        "character": "ぴ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ぷ ?",
        "options": [
          "pu",
          "hu",
          "bu",
          "po"
        ],
        "correct": "pu",
        "character": "ぷ"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ぱん",
        "correct": "pan",
        "character": "ぱん",
        "meaning": "pain"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: かっぱ",
        "correct": "kappa",
        "character": "かっぱ",
        "meaning": "kappa (créature)"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: さんぽ",
        "correct": "sanpo",
        "character": "さんぽ",
        "meaning": "promenade"
      }
    ]
  },
  {
    "id": 10,
    "title": "Combinaisons",
    "description": "kya, kyu, kyo, sha, shu, sho...",
    "difficulty": "Avancé",
    "category": "hiragana",
    "free": false,
    "characters": [
      {
        "hiragana": "きゃ",
        "romaji": "kya",
        "pronunciation": "kya",
        "mnemonic": "Caractère きゃ",
        "examples": [],
        "audio": "kya.mp3"
      },
      {
        "hiragana": "きゅ",
        "romaji": "kyu",
        "pronunciation": "kyu",
        "mnemonic": "Caractère きゅ",
        "examples": [],
        "audio": "kyu.mp3"
      },
      {
        "hiragana": "きょ",
        "romaji": "kyo",
        "pronunciation": "kyo",
        "mnemonic": "Caractère きょ",
        "examples": [],
        "audio": "kyo.mp3"
      },
      {
        "hiragana": "しゃ",
        "romaji": "sha",
        "pronunciation": "sha",
        "mnemonic": "Caractère しゃ",
        "examples": [],
        "audio": "sha.mp3"
      },
      {
        "hiragana": "しゅ",
        "romaji": "shu",
        "pronunciation": "shu",
        "mnemonic": "Caractère しゅ",
        "examples": [],
        "audio": "shu.mp3"
      },
      {
        "hiragana": "しょ",
        "romaji": "sho",
        "pronunciation": "sho",
        "mnemonic": "Caractère しょ",
        "examples": [],
        "audio": "sho.mp3"
      },
      {
        "hiragana": "ちゃ",
        "romaji": "cha",
        "pronunciation": "cha",
        "mnemonic": "Caractère ちゃ",
        "examples": [],
        "audio": "cha.mp3"
      },
      {
        "hiragana": "ちゅ",
        "romaji": "chu",
        "pronunciation": "chu",
        "mnemonic": "Caractère ちゅ",
        "examples": [],
        "audio": "chu.mp3"
      },
      {
        "hiragana": "ちょ",
        "romaji": "cho",
        "pronunciation": "cho",
        "mnemonic": "Caractère ちょ",
        "examples": [],
        "audio": "cho.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de きゃ ?",
        "options": [
          "kya",
          "kiya",
          "ka",
          "ki"
        ],
        "correct": "kya",
        "character": "きゃ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de しゃ ?",
        "options": [
          "sha",
          "sa",
          "shiya",
          "shi"
        ],
        "correct": "sha",
        "character": "しゃ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ちゅ ?",
        "options": [
          "chu",
          "chiyu",
          "tsu",
          "chi"
        ],
        "correct": "chu",
        "character": "ちゅ"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: きゃく",
        "correct": "kyaku",
        "character": "きゃく",
        "meaning": "client"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: しゃしん",
        "correct": "shashin",
        "character": "しゃしん",
        "meaning": "photo"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ちゃ",
        "correct": "cha",
        "character": "ちゃ",
        "meaning": "thé"
      }
    ]
  },
  {
    "id": 11,
    "title": "Révision",
    "description": "Révision complète de tous les hiragana",
    "difficulty": "Avancé",
    "category": "hiragana",
    "free": false,
    "characters": [],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de あ ?",
        "options": [
          "a",
          "i",
          "u",
          "e"
        ],
        "correct": "a",
        "character": "あ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de さ ?",
        "options": [
          "sa",
          "shi",
          "su",
          "se"
        ],
        "correct": "sa",
        "character": "さ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de な ?",
        "options": [
          "na",
          "ni",
          "nu",
          "ne"
        ],
        "correct": "na",
        "character": "な"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ま ?",
        "options": [
          "ma",
          "mi",
          "mu",
          "me"
        ],
        "correct": "ma",
        "character": "ま"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de が ?",
        "options": [
          "ga",
          "ka",
          "gi",
          "ki"
        ],
        "correct": "ga",
        "character": "が"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ば ?",
        "options": [
          "ba",
          "ha",
          "pa",
          "bi"
        ],
        "correct": "ba",
        "character": "ば"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ぱ ?",
        "options": [
          "pa",
          "ha",
          "ba",
          "pi"
        ],
        "correct": "pa",
        "character": "ぱ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de きゃ ?",
        "options": [
          "kya",
          "kiya",
          "ka",
          "ki"
        ],
        "correct": "kya",
        "character": "きゃ"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: こんにちは",
        "correct": "konnichiwa",
        "character": "こんにちは",
        "meaning": "bonjour"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ありがとう",
        "correct": "arigatou",
        "character": "ありがとう",
        "meaning": "merci"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: さようなら",
        "correct": "sayounara",
        "character": "さようなら",
        "meaning": "au revoir"
      }
    ]
  }
];

// ========================================
// KATAKANA LESSONS (11 leçons)
// ========================================

export const katakanaLessons = [
  {
    "id": 12,
    "title": "Katakana 1 : Voyelles + K",
    "description": "ア, イ, ウ, エ, オ, カ, キ, ク, ケ, コ",
    "difficulty": "Débutant",
    "category": "katakana",
    "free": true,
    "characters": [
      {
        "katakana": "ア",
        "romaji": "a",
        "pronunciation": "a",
        "mnemonic": "Caractère ア",
        "examples": [],
        "audio": "a.mp3"
      },
      {
        "katakana": "イ",
        "romaji": "i",
        "pronunciation": "i",
        "mnemonic": "Caractère イ",
        "examples": [],
        "audio": "i.mp3"
      },
      {
        "katakana": "ウ",
        "romaji": "u",
        "pronunciation": "u",
        "mnemonic": "Caractère ウ",
        "examples": [],
        "audio": "u.mp3"
      },
      {
        "katakana": "エ",
        "romaji": "e",
        "pronunciation": "e",
        "mnemonic": "Caractère エ",
        "examples": [],
        "audio": "e.mp3"
      },
      {
        "katakana": "オ",
        "romaji": "o",
        "pronunciation": "o",
        "mnemonic": "Caractère オ",
        "examples": [],
        "audio": "o.mp3"
      },
      {
        "katakana": "カ",
        "romaji": "ka",
        "pronunciation": "ka",
        "mnemonic": "Caractère カ",
        "examples": [],
        "audio": "ka.mp3"
      },
      {
        "katakana": "キ",
        "romaji": "ki",
        "pronunciation": "ki",
        "mnemonic": "Caractère キ",
        "examples": [],
        "audio": "ki.mp3"
      },
      {
        "katakana": "ク",
        "romaji": "ku",
        "pronunciation": "ku",
        "mnemonic": "Caractère ク",
        "examples": [],
        "audio": "ku.mp3"
      },
      {
        "katakana": "ケ",
        "romaji": "ke",
        "pronunciation": "ke",
        "mnemonic": "Caractère ケ",
        "examples": [],
        "audio": "ke.mp3"
      },
      {
        "katakana": "コ",
        "romaji": "ko",
        "pronunciation": "ko",
        "mnemonic": "Caractère コ",
        "examples": [],
        "audio": "ko.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de ア ?",
        "options": [
          "a",
          "i",
          "u",
          "e"
        ],
        "correct": "a",
        "character": "ア"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de イ ?",
        "options": [
          "i",
          "a",
          "e",
          "o"
        ],
        "correct": "i",
        "character": "イ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ウ ?",
        "options": [
          "u",
          "o",
          "a",
          "i"
        ],
        "correct": "u",
        "character": "ウ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de エ ?",
        "options": [
          "e",
          "i",
          "a",
          "o"
        ],
        "correct": "e",
        "character": "エ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de オ ?",
        "options": [
          "o",
          "u",
          "a",
          "e"
        ],
        "correct": "o",
        "character": "オ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de カ ?",
        "options": [
          "ka",
          "ki",
          "ku",
          "ke"
        ],
        "correct": "ka",
        "character": "カ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de キ ?",
        "options": [
          "ki",
          "ka",
          "ku",
          "ke"
        ],
        "correct": "ki",
        "character": "キ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ク ?",
        "options": [
          "ku",
          "ka",
          "ki",
          "ko"
        ],
        "correct": "ku",
        "character": "ク"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ケ ?",
        "options": [
          "ke",
          "ka",
          "ki",
          "ko"
        ],
        "correct": "ke",
        "character": "ケ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de コ ?",
        "options": [
          "ko",
          "ku",
          "ka",
          "ke"
        ],
        "correct": "ko",
        "character": "コ"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "ア",
          "イ",
          "カ",
          "オ"
        ],
        "correct": "カ",
        "explanation": "'カ' (ka) est une consonne, les autres sont des voyelles"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "カ",
          "キ",
          "ス",
          "コ"
        ],
        "correct": "ス",
        "explanation": "'ス' (su) n'appartient pas à la série K"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: アイス",
        "correct": "aisu",
        "character": "アイス",
        "meaning": "glace/ice cream"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ケーキ",
        "correct": "keeki",
        "character": "ケーキ",
        "meaning": "gâteau"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: コーヒー",
        "correct": "koohii",
        "character": "コーヒー",
        "meaning": "café"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: カー",
        "correct": "kaa",
        "character": "カー",
        "meaning": "voiture"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: オーケー",
        "correct": "ookee",
        "character": "オーケー",
        "meaning": "OK"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: エアコン",
        "correct": "eakon",
        "character": "エアコン",
        "meaning": "climatisation"
      }
    ]
  },
  {
    "id": 13,
    "title": "Katakana 2 : S + T",
    "description": "サ, シ, ス, セ, ソ, タ, チ, ツ, テ, ト",
    "difficulty": "Débutant",
    "category": "katakana",
    "free": true,
    "characters": [
      {
        "katakana": "サ",
        "romaji": "sa",
        "pronunciation": "sa",
        "mnemonic": "Caractère サ",
        "examples": [],
        "audio": "sa.mp3"
      },
      {
        "katakana": "シ",
        "romaji": "shi",
        "pronunciation": "shi",
        "mnemonic": "Caractère シ",
        "examples": [],
        "audio": "shi.mp3"
      },
      {
        "katakana": "ス",
        "romaji": "su",
        "pronunciation": "su",
        "mnemonic": "Caractère ス",
        "examples": [],
        "audio": "su.mp3"
      },
      {
        "katakana": "セ",
        "romaji": "se",
        "pronunciation": "se",
        "mnemonic": "Caractère セ",
        "examples": [],
        "audio": "se.mp3"
      },
      {
        "katakana": "ソ",
        "romaji": "so",
        "pronunciation": "so",
        "mnemonic": "Caractère ソ",
        "examples": [],
        "audio": "so.mp3"
      },
      {
        "katakana": "タ",
        "romaji": "ta",
        "pronunciation": "ta",
        "mnemonic": "Caractère タ",
        "examples": [],
        "audio": "ta.mp3"
      },
      {
        "katakana": "チ",
        "romaji": "chi",
        "pronunciation": "chi",
        "mnemonic": "Caractère チ",
        "examples": [],
        "audio": "chi.mp3"
      },
      {
        "katakana": "ツ",
        "romaji": "tsu",
        "pronunciation": "tsu",
        "mnemonic": "Caractère ツ",
        "examples": [],
        "audio": "tsu.mp3"
      },
      {
        "katakana": "テ",
        "romaji": "te",
        "pronunciation": "te",
        "mnemonic": "Caractère テ",
        "examples": [],
        "audio": "te.mp3"
      },
      {
        "katakana": "ト",
        "romaji": "to",
        "pronunciation": "to",
        "mnemonic": "Caractère ト",
        "examples": [],
        "audio": "to.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de サ ?",
        "options": [
          "sa",
          "shi",
          "su",
          "se"
        ],
        "correct": "sa",
        "character": "サ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de シ ?",
        "options": [
          "shi",
          "sa",
          "chi",
          "se"
        ],
        "correct": "shi",
        "character": "シ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ス ?",
        "options": [
          "su",
          "sa",
          "shi",
          "se"
        ],
        "correct": "su",
        "character": "ス"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de セ ?",
        "options": [
          "se",
          "sa",
          "shi",
          "so"
        ],
        "correct": "se",
        "character": "セ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ソ ?",
        "options": [
          "so",
          "su",
          "sa",
          "se"
        ],
        "correct": "so",
        "character": "ソ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de タ ?",
        "options": [
          "ta",
          "chi",
          "tsu",
          "te"
        ],
        "correct": "ta",
        "character": "タ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de チ ?",
        "options": [
          "chi",
          "ta",
          "shi",
          "tsu"
        ],
        "correct": "chi",
        "character": "チ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ツ ?",
        "options": [
          "tsu",
          "ta",
          "chi",
          "to"
        ],
        "correct": "tsu",
        "character": "ツ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de テ ?",
        "options": [
          "te",
          "ta",
          "chi",
          "to"
        ],
        "correct": "te",
        "character": "テ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ト ?",
        "options": [
          "to",
          "tsu",
          "ta",
          "te"
        ],
        "correct": "to",
        "character": "ト"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "サ",
          "シ",
          "ス",
          "タ"
        ],
        "correct": "タ",
        "explanation": "'タ' (ta) appartient à la série T, les autres à la série S"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "タ",
          "チ",
          "ツ",
          "セ"
        ],
        "correct": "セ",
        "explanation": "'セ' (se) appartient à la série S, les autres à la série T"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "シ",
          "チ",
          "ツ",
          "ス"
        ],
        "correct": "ス",
        "explanation": "'ス' (su) ne se prononce pas avec 'i', contrairement aux autres"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: スーツ",
        "correct": "suutsu",
        "character": "スーツ",
        "meaning": "costume"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: シャツ",
        "correct": "shatsu",
        "character": "シャツ",
        "meaning": "chemise"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ソース",
        "correct": "soosu",
        "character": "ソース",
        "meaning": "sauce"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: チーズ",
        "correct": "chiizu",
        "character": "チーズ",
        "meaning": "fromage"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: タクシー",
        "correct": "takushii",
        "character": "タクシー",
        "meaning": "taxi"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: テスト",
        "correct": "tesuto",
        "character": "テスト",
        "meaning": "test"
      }
    ]
  },
  {
    "id": 14,
    "title": "Katakana 3 : N + H",
    "description": "ナ, ニ, ヌ, ネ, ノ, ハ, ヒ, フ, ヘ, ホ",
    "difficulty": "Débutant",
    "category": "katakana",
    "free": true,
    "characters": [
      {
        "katakana": "ナ",
        "romaji": "na",
        "pronunciation": "na",
        "mnemonic": "Caractère ナ",
        "examples": [],
        "audio": "na.mp3"
      },
      {
        "katakana": "ニ",
        "romaji": "ni",
        "pronunciation": "ni",
        "mnemonic": "Caractère ニ",
        "examples": [],
        "audio": "ni.mp3"
      },
      {
        "katakana": "ヌ",
        "romaji": "nu",
        "pronunciation": "nu",
        "mnemonic": "Caractère ヌ",
        "examples": [],
        "audio": "nu.mp3"
      },
      {
        "katakana": "ネ",
        "romaji": "ne",
        "pronunciation": "ne",
        "mnemonic": "Caractère ネ",
        "examples": [],
        "audio": "ne.mp3"
      },
      {
        "katakana": "ノ",
        "romaji": "no",
        "pronunciation": "no",
        "mnemonic": "Caractère ノ",
        "examples": [],
        "audio": "no.mp3"
      },
      {
        "katakana": "ハ",
        "romaji": "ha",
        "pronunciation": "ha",
        "mnemonic": "Caractère ハ",
        "examples": [],
        "audio": "ha.mp3"
      },
      {
        "katakana": "ヒ",
        "romaji": "hi",
        "pronunciation": "hi",
        "mnemonic": "Caractère ヒ",
        "examples": [],
        "audio": "hi.mp3"
      },
      {
        "katakana": "フ",
        "romaji": "fu",
        "pronunciation": "fu",
        "mnemonic": "Caractère フ",
        "examples": [],
        "audio": "fu.mp3"
      },
      {
        "katakana": "ヘ",
        "romaji": "he",
        "pronunciation": "he",
        "mnemonic": "Caractère ヘ",
        "examples": [],
        "audio": "he.mp3"
      },
      {
        "katakana": "ホ",
        "romaji": "ho",
        "pronunciation": "ho",
        "mnemonic": "Caractère ホ",
        "examples": [],
        "audio": "ho.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de ナ ?",
        "options": [
          "na",
          "ni",
          "nu",
          "ne"
        ],
        "correct": "na",
        "character": "ナ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ニ ?",
        "options": [
          "ni",
          "na",
          "ne",
          "no"
        ],
        "correct": "ni",
        "character": "ニ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ヌ ?",
        "options": [
          "nu",
          "na",
          "ni",
          "ne"
        ],
        "correct": "nu",
        "character": "ヌ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ネ ?",
        "options": [
          "ne",
          "na",
          "ni",
          "no"
        ],
        "correct": "ne",
        "character": "ネ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ノ ?",
        "options": [
          "no",
          "nu",
          "na",
          "ne"
        ],
        "correct": "no",
        "character": "ノ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ハ ?",
        "options": [
          "ha",
          "hi",
          "fu",
          "he"
        ],
        "correct": "ha",
        "character": "ハ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ヒ ?",
        "options": [
          "hi",
          "ha",
          "fu",
          "he"
        ],
        "correct": "hi",
        "character": "ヒ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de フ ?",
        "options": [
          "fu",
          "ha",
          "hi",
          "ho"
        ],
        "correct": "fu",
        "character": "フ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ヘ ?",
        "options": [
          "he",
          "ha",
          "hi",
          "ho"
        ],
        "correct": "he",
        "character": "ヘ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ホ ?",
        "options": [
          "ho",
          "fu",
          "ha",
          "he"
        ],
        "correct": "ho",
        "character": "ホ"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "ナ",
          "ニ",
          "ヌ",
          "ハ"
        ],
        "correct": "ハ",
        "explanation": "'ハ' (ha) appartient à la série H, les autres à la série N"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "ハ",
          "ヒ",
          "フ",
          "ノ"
        ],
        "correct": "ノ",
        "explanation": "'ノ' (no) appartient à la série N, les autres à la série H"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "ニ",
          "ヒ",
          "フ",
          "ホ"
        ],
        "correct": "ニ",
        "explanation": "'ニ' (ni) appartient à la série N, les autres à la série H"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ナイフ",
        "correct": "naifu",
        "character": "ナイフ",
        "meaning": "couteau"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ノート",
        "correct": "nooto",
        "character": "ノート",
        "meaning": "cahier"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ハンバーガー",
        "correct": "hanbaagaa",
        "character": "ハンバーガー",
        "meaning": "hamburger"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ホテル",
        "correct": "hoteru",
        "character": "ホテル",
        "meaning": "hôtel"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: フォーク",
        "correct": "fooku",
        "character": "フォーク",
        "meaning": "fourchette"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ヒーター",
        "correct": "hiitaa",
        "character": "ヒーター",
        "meaning": "chauffage"
      }
    ]
  },
  {
    "id": 15,
    "title": "Katakana 4 : M + Y",
    "description": "マ, ミ, ム, メ, モ, ヤ, ユ, ヨ",
    "difficulty": "Débutant",
    "category": "katakana",
    "free": true,
    "characters": [
      {
        "katakana": "マ",
        "romaji": "ma",
        "pronunciation": "ma",
        "mnemonic": "Caractère マ",
        "examples": [],
        "audio": "ma.mp3"
      },
      {
        "katakana": "ミ",
        "romaji": "mi",
        "pronunciation": "mi",
        "mnemonic": "Caractère ミ",
        "examples": [],
        "audio": "mi.mp3"
      },
      {
        "katakana": "ム",
        "romaji": "mu",
        "pronunciation": "mu",
        "mnemonic": "Caractère ム",
        "examples": [],
        "audio": "mu.mp3"
      },
      {
        "katakana": "メ",
        "romaji": "me",
        "pronunciation": "me",
        "mnemonic": "Caractère メ",
        "examples": [],
        "audio": "me.mp3"
      },
      {
        "katakana": "モ",
        "romaji": "mo",
        "pronunciation": "mo",
        "mnemonic": "Caractère モ",
        "examples": [],
        "audio": "mo.mp3"
      },
      {
        "katakana": "ヤ",
        "romaji": "ya",
        "pronunciation": "ya",
        "mnemonic": "Caractère ヤ",
        "examples": [],
        "audio": "ya.mp3"
      },
      {
        "katakana": "ユ",
        "romaji": "yu",
        "pronunciation": "yu",
        "mnemonic": "Caractère ユ",
        "examples": [],
        "audio": "yu.mp3"
      },
      {
        "katakana": "ヨ",
        "romaji": "yo",
        "pronunciation": "yo",
        "mnemonic": "Caractère ヨ",
        "examples": [],
        "audio": "yo.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de マ ?",
        "options": [
          "ma",
          "mi",
          "mu",
          "me"
        ],
        "correct": "ma",
        "character": "マ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ミ ?",
        "options": [
          "mi",
          "ma",
          "me",
          "mo"
        ],
        "correct": "mi",
        "character": "ミ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ム ?",
        "options": [
          "mu",
          "ma",
          "mi",
          "me"
        ],
        "correct": "mu",
        "character": "ム"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de メ ?",
        "options": [
          "me",
          "ma",
          "mi",
          "mo"
        ],
        "correct": "me",
        "character": "メ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de モ ?",
        "options": [
          "mo",
          "mu",
          "ma",
          "me"
        ],
        "correct": "mo",
        "character": "モ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ヤ ?",
        "options": [
          "ya",
          "yu",
          "yo",
          "ma"
        ],
        "correct": "ya",
        "character": "ヤ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ユ ?",
        "options": [
          "yu",
          "ya",
          "yo",
          "mu"
        ],
        "correct": "yu",
        "character": "ユ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ヨ ?",
        "options": [
          "yo",
          "ya",
          "yu",
          "mo"
        ],
        "correct": "yo",
        "character": "ヨ"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "マ",
          "ミ",
          "ム",
          "ヤ"
        ],
        "correct": "ヤ",
        "explanation": "'ヤ' (ya) appartient à la série Y, les autres à la série M"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "ヤ",
          "ユ",
          "ヨ",
          "メ"
        ],
        "correct": "メ",
        "explanation": "'メ' (me) appartient à la série M, les autres à la série Y"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "マ",
          "メ",
          "モ",
          "ム"
        ],
        "correct": "ム",
        "explanation": "'ム' (mu) ne se termine pas par un son de voyelle 'a', 'e' ou 'o', contrairement aux autres"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: メール",
        "correct": "meeru",
        "character": "メール",
        "meaning": "email"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: マウス",
        "correct": "mausu",
        "character": "マウス",
        "meaning": "souris"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ミルク",
        "correct": "miruku",
        "character": "ミルク",
        "meaning": "lait"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ヨーグルト",
        "correct": "yooguruto",
        "character": "ヨーグルト",
        "meaning": "yaourt"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: メニュー",
        "correct": "menyuu",
        "character": "メニュー",
        "meaning": "menu"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ムービー",
        "correct": "muubii",
        "character": "ムービー",
        "meaning": "film"
      }
    ]
  },
  {
    "id": 16,
    "title": "Katakana 5 : R + W + N",
    "description": "ラ, リ, ル, レ, ロ, ワ, ヲ, ン",
    "difficulty": "Débutant",
    "category": "katakana",
    "free": true,
    "characters": [
      {
        "katakana": "ラ",
        "romaji": "ra",
        "pronunciation": "ra",
        "mnemonic": "Caractère ラ",
        "examples": [],
        "audio": "ra.mp3"
      },
      {
        "katakana": "リ",
        "romaji": "ri",
        "pronunciation": "ri",
        "mnemonic": "Caractère リ",
        "examples": [],
        "audio": "ri.mp3"
      },
      {
        "katakana": "ル",
        "romaji": "ru",
        "pronunciation": "ru",
        "mnemonic": "Caractère ル",
        "examples": [],
        "audio": "ru.mp3"
      },
      {
        "katakana": "レ",
        "romaji": "re",
        "pronunciation": "re",
        "mnemonic": "Caractère レ",
        "examples": [],
        "audio": "re.mp3"
      },
      {
        "katakana": "ロ",
        "romaji": "ro",
        "pronunciation": "ro",
        "mnemonic": "Caractère ロ",
        "examples": [],
        "audio": "ro.mp3"
      },
      {
        "katakana": "ワ",
        "romaji": "wa",
        "pronunciation": "wa",
        "mnemonic": "Caractère ワ",
        "examples": [],
        "audio": "wa.mp3"
      },
      {
        "katakana": "ヲ",
        "romaji": "wo",
        "pronunciation": "wo",
        "mnemonic": "Caractère ヲ",
        "examples": [],
        "audio": "wo.mp3"
      },
      {
        "katakana": "ン",
        "romaji": "n",
        "pronunciation": "n",
        "mnemonic": "Caractère ン",
        "examples": [],
        "audio": "n.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de ラ ?",
        "options": [
          "ra",
          "ri",
          "ru",
          "re"
        ],
        "correct": "ra",
        "character": "ラ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de リ ?",
        "options": [
          "ri",
          "ra",
          "re",
          "ro"
        ],
        "correct": "ri",
        "character": "リ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ル ?",
        "options": [
          "ru",
          "ra",
          "ri",
          "re"
        ],
        "correct": "ru",
        "character": "ル"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de レ ?",
        "options": [
          "re",
          "ra",
          "ri",
          "ro"
        ],
        "correct": "re",
        "character": "レ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ロ ?",
        "options": [
          "ro",
          "ru",
          "ra",
          "re"
        ],
        "correct": "ro",
        "character": "ロ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ワ ?",
        "options": [
          "wa",
          "ra",
          "wo",
          "n"
        ],
        "correct": "wa",
        "character": "ワ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ヲ ?",
        "options": [
          "wo",
          "wa",
          "ro",
          "n"
        ],
        "correct": "wo",
        "character": "ヲ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ン ?",
        "options": [
          "n",
          "wa",
          "wo",
          "no"
        ],
        "correct": "n",
        "character": "ン"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "ラ",
          "リ",
          "ル",
          "ワ"
        ],
        "correct": "ワ",
        "explanation": "'ワ' (wa) appartient à la série W, les autres à la série R"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "ワ",
          "ヲ",
          "ン",
          "レ"
        ],
        "correct": "レ",
        "explanation": "'レ' (re) appartient à la série R, les autres sont des caractères spéciaux"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "ラ",
          "レ",
          "ロ",
          "リ"
        ],
        "correct": "リ",
        "explanation": "'リ' (ri) se prononce avec 'i', les autres se terminent par 'a', 'e' ou 'o'"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ラーメン",
        "correct": "raamen",
        "character": "ラーメン",
        "meaning": "ramen"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: リスト",
        "correct": "risuto",
        "character": "リスト",
        "meaning": "liste"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ルール",
        "correct": "ruuru",
        "character": "ルール",
        "meaning": "règle"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: レストラン",
        "correct": "resutoran",
        "character": "レストラン",
        "meaning": "restaurant"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ロボット",
        "correct": "robotto",
        "character": "ロボット",
        "meaning": "robot"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ワイン",
        "correct": "wain",
        "character": "ワイン",
        "meaning": "vin"
      }
    ]
  },
  {
    "id": 17,
    "title": "Katakana 6 : G + Z (Voisées)",
    "description": "ガ, ギ, グ, ゲ, ゴ, ザ, ジ, ズ, ゼ, ゾ",
    "difficulty": "Intermédiaire",
    "category": "katakana",
    "free": true,
    "characters": [
      {
        "katakana": "ガ",
        "romaji": "ga",
        "pronunciation": "ga",
        "mnemonic": "Caractère ガ",
        "examples": [],
        "audio": "ga.mp3"
      },
      {
        "katakana": "ギ",
        "romaji": "gi",
        "pronunciation": "gi",
        "mnemonic": "Caractère ギ",
        "examples": [],
        "audio": "gi.mp3"
      },
      {
        "katakana": "グ",
        "romaji": "gu",
        "pronunciation": "gu",
        "mnemonic": "Caractère グ",
        "examples": [],
        "audio": "gu.mp3"
      },
      {
        "katakana": "ゲ",
        "romaji": "ge",
        "pronunciation": "ge",
        "mnemonic": "Caractère ゲ",
        "examples": [],
        "audio": "ge.mp3"
      },
      {
        "katakana": "ゴ",
        "romaji": "go",
        "pronunciation": "go",
        "mnemonic": "Caractère ゴ",
        "examples": [],
        "audio": "go.mp3"
      },
      {
        "katakana": "ザ",
        "romaji": "za",
        "pronunciation": "za",
        "mnemonic": "Caractère ザ",
        "examples": [],
        "audio": "za.mp3"
      },
      {
        "katakana": "ジ",
        "romaji": "ji",
        "pronunciation": "ji",
        "mnemonic": "Caractère ジ",
        "examples": [],
        "audio": "ji.mp3"
      },
      {
        "katakana": "ズ",
        "romaji": "zu",
        "pronunciation": "zu",
        "mnemonic": "Caractère ズ",
        "examples": [],
        "audio": "zu.mp3"
      },
      {
        "katakana": "ゼ",
        "romaji": "ze",
        "pronunciation": "ze",
        "mnemonic": "Caractère ゼ",
        "examples": [],
        "audio": "ze.mp3"
      },
      {
        "katakana": "ゾ",
        "romaji": "zo",
        "pronunciation": "zo",
        "mnemonic": "Caractère ゾ",
        "examples": [],
        "audio": "zo.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de ガ ?",
        "options": [
          "ga",
          "gi",
          "gu",
          "ka"
        ],
        "correct": "ga",
        "character": "ガ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ギ ?",
        "options": [
          "gi",
          "ga",
          "ge",
          "ki"
        ],
        "correct": "gi",
        "character": "ギ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de グ ?",
        "options": [
          "gu",
          "ga",
          "gi",
          "ku"
        ],
        "correct": "gu",
        "character": "グ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ゲ ?",
        "options": [
          "ge",
          "ga",
          "gi",
          "ke"
        ],
        "correct": "ge",
        "character": "ゲ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ゴ ?",
        "options": [
          "go",
          "gu",
          "ga",
          "ko"
        ],
        "correct": "go",
        "character": "ゴ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ザ ?",
        "options": [
          "za",
          "ji",
          "zu",
          "sa"
        ],
        "correct": "za",
        "character": "ザ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ジ ?",
        "options": [
          "ji",
          "za",
          "zu",
          "shi"
        ],
        "correct": "ji",
        "character": "ジ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ズ ?",
        "options": [
          "zu",
          "za",
          "ji",
          "su"
        ],
        "correct": "zu",
        "character": "ズ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ゼ ?",
        "options": [
          "ze",
          "za",
          "ji",
          "se"
        ],
        "correct": "ze",
        "character": "ゼ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ゾ ?",
        "options": [
          "zo",
          "zu",
          "za",
          "so"
        ],
        "correct": "zo",
        "character": "ゾ"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "ガ",
          "ギ",
          "グ",
          "ザ"
        ],
        "correct": "ザ",
        "explanation": "'ザ' (za) appartient à la série Z, les autres à la série G"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "ザ",
          "ジ",
          "ズ",
          "ゲ"
        ],
        "correct": "ゲ",
        "explanation": "'ゲ' (ge) appartient à la série G, les autres à la série Z"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "ガ",
          "ゴ",
          "ゲ",
          "ギ"
        ],
        "correct": "ギ",
        "explanation": "'ギ' (gi) se prononce avec 'i', les autres se terminent par 'a', 'e' ou 'o'"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ガス",
        "correct": "gasu",
        "character": "ガス",
        "meaning": "gaz"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ギター",
        "correct": "gitaa",
        "character": "ギター",
        "meaning": "guitare"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ゲーム",
        "correct": "geemu",
        "character": "ゲーム",
        "meaning": "jeu"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ジュース",
        "correct": "juusu",
        "character": "ジュース",
        "meaning": "jus"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ゼロ",
        "correct": "zero",
        "character": "ゼロ",
        "meaning": "zéro"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ゴール",
        "correct": "gooru",
        "character": "ゴール",
        "meaning": "but"
      }
    ]
  },
  {
    "id": 18,
    "title": "Katakana 7 : D + B (Voisées)",
    "description": "ダ, ヂ, ヅ, デ, ド, バ, ビ, ブ, ベ, ボ",
    "difficulty": "Intermédiaire",
    "category": "katakana",
    "free": true,
    "characters": [
      {
        "katakana": "ダ",
        "romaji": "da",
        "pronunciation": "da",
        "mnemonic": "Caractère ダ",
        "examples": [],
        "audio": "da.mp3"
      },
      {
        "katakana": "ヂ",
        "romaji": "ji",
        "pronunciation": "ji",
        "mnemonic": "Caractère ヂ",
        "examples": [],
        "audio": "ji.mp3"
      },
      {
        "katakana": "ヅ",
        "romaji": "zu",
        "pronunciation": "zu",
        "mnemonic": "Caractère ヅ",
        "examples": [],
        "audio": "zu.mp3"
      },
      {
        "katakana": "デ",
        "romaji": "de",
        "pronunciation": "de",
        "mnemonic": "Caractère デ",
        "examples": [],
        "audio": "de.mp3"
      },
      {
        "katakana": "ド",
        "romaji": "do",
        "pronunciation": "do",
        "mnemonic": "Caractère ド",
        "examples": [],
        "audio": "do.mp3"
      },
      {
        "katakana": "バ",
        "romaji": "ba",
        "pronunciation": "ba",
        "mnemonic": "Caractère バ",
        "examples": [],
        "audio": "ba.mp3"
      },
      {
        "katakana": "ビ",
        "romaji": "bi",
        "pronunciation": "bi",
        "mnemonic": "Caractère ビ",
        "examples": [],
        "audio": "bi.mp3"
      },
      {
        "katakana": "ブ",
        "romaji": "bu",
        "pronunciation": "bu",
        "mnemonic": "Caractère ブ",
        "examples": [],
        "audio": "bu.mp3"
      },
      {
        "katakana": "ベ",
        "romaji": "be",
        "pronunciation": "be",
        "mnemonic": "Caractère ベ",
        "examples": [],
        "audio": "be.mp3"
      },
      {
        "katakana": "ボ",
        "romaji": "bo",
        "pronunciation": "bo",
        "mnemonic": "Caractère ボ",
        "examples": [],
        "audio": "bo.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de ダ ?",
        "options": [
          "da",
          "de",
          "do",
          "ta"
        ],
        "correct": "da",
        "character": "ダ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de デ ?",
        "options": [
          "de",
          "da",
          "do",
          "te"
        ],
        "correct": "de",
        "character": "デ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ド ?",
        "options": [
          "do",
          "da",
          "de",
          "to"
        ],
        "correct": "do",
        "character": "ド"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de バ ?",
        "options": [
          "ba",
          "bi",
          "bu",
          "ha"
        ],
        "correct": "ba",
        "character": "バ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ビ ?",
        "options": [
          "bi",
          "ba",
          "be",
          "hi"
        ],
        "correct": "bi",
        "character": "ビ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ブ ?",
        "options": [
          "bu",
          "ba",
          "bi",
          "fu"
        ],
        "correct": "bu",
        "character": "ブ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ベ ?",
        "options": [
          "be",
          "ba",
          "bi",
          "he"
        ],
        "correct": "be",
        "character": "ベ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ボ ?",
        "options": [
          "bo",
          "bu",
          "ba",
          "ho"
        ],
        "correct": "bo",
        "character": "ボ"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "ダ",
          "デ",
          "ド",
          "バ"
        ],
        "correct": "バ",
        "explanation": "'バ' (ba) appartient à la série B, les autres à la série D"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "バ",
          "ビ",
          "ブ",
          "デ"
        ],
        "correct": "デ",
        "explanation": "'デ' (de) appartient à la série D, les autres à la série B"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "ダ",
          "ド",
          "デ",
          "ヂ"
        ],
        "correct": "ヂ",
        "explanation": "'ヂ' (ji) se prononce 'ji', les autres se prononcent avec 'd'"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ドア",
        "correct": "doa",
        "character": "ドア",
        "meaning": "porte"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: データ",
        "correct": "deeta",
        "character": "データ",
        "meaning": "données"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: バス",
        "correct": "basu",
        "character": "バス",
        "meaning": "bus"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ビール",
        "correct": "biiru",
        "character": "ビール",
        "meaning": "bière"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ブログ",
        "correct": "burogu",
        "character": "ブログ",
        "meaning": "blog"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ベッド",
        "correct": "beddo",
        "character": "ベッド",
        "meaning": "lit"
      }
    ]
  },
  {
    "id": 19,
    "title": "Katakana 8 : P (Semi-voisées)",
    "description": "パ, ピ, プ, ペ, ポ",
    "difficulty": "Intermédiaire",
    "category": "katakana",
    "free": true,
    "characters": [
      {
        "katakana": "パ",
        "romaji": "pa",
        "pronunciation": "pa",
        "mnemonic": "Caractère パ",
        "examples": [],
        "audio": "pa.mp3"
      },
      {
        "katakana": "ピ",
        "romaji": "pi",
        "pronunciation": "pi",
        "mnemonic": "Caractère ピ",
        "examples": [],
        "audio": "pi.mp3"
      },
      {
        "katakana": "プ",
        "romaji": "pu",
        "pronunciation": "pu",
        "mnemonic": "Caractère プ",
        "examples": [],
        "audio": "pu.mp3"
      },
      {
        "katakana": "ペ",
        "romaji": "pe",
        "pronunciation": "pe",
        "mnemonic": "Caractère ペ",
        "examples": [],
        "audio": "pe.mp3"
      },
      {
        "katakana": "ポ",
        "romaji": "po",
        "pronunciation": "po",
        "mnemonic": "Caractère ポ",
        "examples": [],
        "audio": "po.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de パ ?",
        "options": [
          "pa",
          "pi",
          "pu",
          "ba"
        ],
        "correct": "pa",
        "character": "パ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ピ ?",
        "options": [
          "pi",
          "pa",
          "pe",
          "bi"
        ],
        "correct": "pi",
        "character": "ピ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de プ ?",
        "options": [
          "pu",
          "pa",
          "pi",
          "bu"
        ],
        "correct": "pu",
        "character": "プ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ペ ?",
        "options": [
          "pe",
          "pa",
          "pi",
          "be"
        ],
        "correct": "pe",
        "character": "ペ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ポ ?",
        "options": [
          "po",
          "pu",
          "pa",
          "bo"
        ],
        "correct": "po",
        "character": "ポ"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "パ",
          "ピ",
          "プ",
          "バ"
        ],
        "correct": "バ",
        "explanation": "'バ' (ba) a un dakuten (゛), les autres ont un handakuten (゜)"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "パ",
          "ペ",
          "ポ",
          "ピ"
        ],
        "correct": "ピ",
        "explanation": "'ピ' (pi) se prononce avec 'i', les autres se terminent par 'a', 'e' ou 'o'"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "プ",
          "ブ",
          "フ",
          "パ"
        ],
        "correct": "パ",
        "explanation": "'パ' (pa) se termine par 'a', les autres par 'u'"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: パン",
        "correct": "pan",
        "character": "パン",
        "meaning": "pain"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ピザ",
        "correct": "piza",
        "character": "ピザ",
        "meaning": "pizza"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: プール",
        "correct": "puuru",
        "character": "プール",
        "meaning": "piscine"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ペン",
        "correct": "pen",
        "character": "ペン",
        "meaning": "stylo"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ポスト",
        "correct": "posuto",
        "character": "ポスト",
        "meaning": "poste/boîte aux lettres"
      }
    ]
  },
  {
    "id": 20,
    "title": "Katakana 9 : Combinaisons",
    "description": "キャ, シャ, チャ, ニャ, ヒャ, ミャ, リャ, ギャ, ジャ, ビャ, ピャ",
    "difficulty": "Intermédiaire",
    "category": "katakana",
    "free": true,
    "characters": [
      {
        "katakana": "キャ",
        "romaji": "kya",
        "pronunciation": "kya",
        "mnemonic": "Caractère キャ",
        "examples": [],
        "audio": "kya.mp3"
      },
      {
        "katakana": "シャ",
        "romaji": "sha",
        "pronunciation": "sha",
        "mnemonic": "Caractère シャ",
        "examples": [],
        "audio": "sha.mp3"
      },
      {
        "katakana": "チャ",
        "romaji": "cha",
        "pronunciation": "cha",
        "mnemonic": "Caractère チャ",
        "examples": [],
        "audio": "cha.mp3"
      },
      {
        "katakana": "ニャ",
        "romaji": "nya",
        "pronunciation": "nya",
        "mnemonic": "Caractère ニャ",
        "examples": [],
        "audio": "nya.mp3"
      },
      {
        "katakana": "ヒャ",
        "romaji": "hya",
        "pronunciation": "hya",
        "mnemonic": "Caractère ヒャ",
        "examples": [],
        "audio": "hya.mp3"
      },
      {
        "katakana": "ミャ",
        "romaji": "mya",
        "pronunciation": "mya",
        "mnemonic": "Caractère ミャ",
        "examples": [],
        "audio": "mya.mp3"
      },
      {
        "katakana": "リャ",
        "romaji": "rya",
        "pronunciation": "rya",
        "mnemonic": "Caractère リャ",
        "examples": [],
        "audio": "rya.mp3"
      },
      {
        "katakana": "ギャ",
        "romaji": "gya",
        "pronunciation": "gya",
        "mnemonic": "Caractère ギャ",
        "examples": [],
        "audio": "gya.mp3"
      },
      {
        "katakana": "ジャ",
        "romaji": "ja",
        "pronunciation": "ja",
        "mnemonic": "Caractère ジャ",
        "examples": [],
        "audio": "ja.mp3"
      },
      {
        "katakana": "ビャ",
        "romaji": "bya",
        "pronunciation": "bya",
        "mnemonic": "Caractère ビャ",
        "examples": [],
        "audio": "bya.mp3"
      },
      {
        "katakana": "ピャ",
        "romaji": "pya",
        "pronunciation": "pya",
        "mnemonic": "Caractère ピャ",
        "examples": [],
        "audio": "pya.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de キャ ?",
        "options": [
          "kya",
          "kiya",
          "kia",
          "ka"
        ],
        "correct": "kya",
        "character": "キャ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de シャ ?",
        "options": [
          "sha",
          "shiya",
          "sia",
          "sa"
        ],
        "correct": "sha",
        "character": "シャ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de チャ ?",
        "options": [
          "cha",
          "chiya",
          "tia",
          "ta"
        ],
        "correct": "cha",
        "character": "チャ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ニャ ?",
        "options": [
          "nya",
          "niya",
          "nia",
          "na"
        ],
        "correct": "nya",
        "character": "ニャ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ヒャ ?",
        "options": [
          "hya",
          "hiya",
          "hia",
          "ha"
        ],
        "correct": "hya",
        "character": "ヒャ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ミャ ?",
        "options": [
          "mya",
          "miya",
          "mia",
          "ma"
        ],
        "correct": "mya",
        "character": "ミャ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de リャ ?",
        "options": [
          "rya",
          "riya",
          "ria",
          "ra"
        ],
        "correct": "rya",
        "character": "リャ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ギャ ?",
        "options": [
          "gya",
          "giya",
          "gia",
          "ga"
        ],
        "correct": "gya",
        "character": "ギャ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ジャ ?",
        "options": [
          "ja",
          "jiya",
          "zia",
          "za"
        ],
        "correct": "ja",
        "character": "ジャ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ビャ ?",
        "options": [
          "bya",
          "biya",
          "bia",
          "ba"
        ],
        "correct": "bya",
        "character": "ビャ"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "キャ",
          "シャ",
          "チャ",
          "ギャ"
        ],
        "correct": "ギャ",
        "explanation": "'ギャ' (gya) est une combinaison voisée avec dakuten, les autres sont non-voisées"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "ジャ",
          "ビャ",
          "ギャ",
          "チャ"
        ],
        "correct": "チャ",
        "explanation": "'チャ' (cha) est une combinaison non-voisée, les autres sont voisées"
      },
      {
        "type": "intruder",
        "question": "Trouvez l'intrus",
        "options": [
          "シャ",
          "チャ",
          "ジャ",
          "リャ"
        ],
        "correct": "リャ",
        "explanation": "'リャ' (rya) utilise la série R, les autres utilisent des sibilantes (sh/ch/j)"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: キャンプ",
        "correct": "kyanpu",
        "character": "キャンプ",
        "meaning": "camping"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: シャワー",
        "correct": "shawaa",
        "character": "シャワー",
        "meaning": "douche"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: チャンス",
        "correct": "chansu",
        "character": "チャンス",
        "meaning": "chance"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ジャケット",
        "correct": "jaketto",
        "character": "ジャケット",
        "meaning": "veste"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: リュック",
        "correct": "ryukku",
        "character": "リュック",
        "meaning": "sac à dos"
      }
    ]
  },
  {
    "id": 21,
    "title": "Katakana 10 : Révision Générale",
    "description": "Révision de tous les katakana",
    "difficulty": "Intermédiaire",
    "category": "katakana",
    "free": true,
    "characters": [
      {
        "katakana": "ア",
        "romaji": "a",
        "pronunciation": "a",
        "mnemonic": "Caractère ア",
        "examples": [],
        "audio": "a.mp3"
      },
      {
        "katakana": "カ",
        "romaji": "ka",
        "pronunciation": "ka",
        "mnemonic": "Caractère カ",
        "examples": [],
        "audio": "ka.mp3"
      },
      {
        "katakana": "サ",
        "romaji": "sa",
        "pronunciation": "sa",
        "mnemonic": "Caractère サ",
        "examples": [],
        "audio": "sa.mp3"
      },
      {
        "katakana": "タ",
        "romaji": "ta",
        "pronunciation": "ta",
        "mnemonic": "Caractère タ",
        "examples": [],
        "audio": "ta.mp3"
      },
      {
        "katakana": "ナ",
        "romaji": "na",
        "pronunciation": "na",
        "mnemonic": "Caractère ナ",
        "examples": [],
        "audio": "na.mp3"
      },
      {
        "katakana": "ハ",
        "romaji": "ha",
        "pronunciation": "ha",
        "mnemonic": "Caractère ハ",
        "examples": [],
        "audio": "ha.mp3"
      },
      {
        "katakana": "マ",
        "romaji": "ma",
        "pronunciation": "ma",
        "mnemonic": "Caractère マ",
        "examples": [],
        "audio": "ma.mp3"
      },
      {
        "katakana": "ヤ",
        "romaji": "ya",
        "pronunciation": "ya",
        "mnemonic": "Caractère ヤ",
        "examples": [],
        "audio": "ya.mp3"
      },
      {
        "katakana": "ラ",
        "romaji": "ra",
        "pronunciation": "ra",
        "mnemonic": "Caractère ラ",
        "examples": [],
        "audio": "ra.mp3"
      },
      {
        "katakana": "ワ",
        "romaji": "wa",
        "pronunciation": "wa",
        "mnemonic": "Caractère ワ",
        "examples": [],
        "audio": "wa.mp3"
      },
      {
        "katakana": "ン",
        "romaji": "n",
        "pronunciation": "n",
        "mnemonic": "Caractère ン",
        "examples": [],
        "audio": "n.mp3"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de ア ?",
        "options": [
          "a",
          "i",
          "u",
          "e"
        ],
        "correct": "a",
        "character": "ア"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de カ ?",
        "options": [
          "ka",
          "sa",
          "ta",
          "na"
        ],
        "correct": "ka",
        "character": "カ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de サ ?",
        "options": [
          "sa",
          "ka",
          "ta",
          "ha"
        ],
        "correct": "sa",
        "character": "サ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de タ ?",
        "options": [
          "ta",
          "sa",
          "ka",
          "na"
        ],
        "correct": "ta",
        "character": "タ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ナ ?",
        "options": [
          "na",
          "ma",
          "ha",
          "ya"
        ],
        "correct": "na",
        "character": "ナ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ハ ?",
        "options": [
          "ha",
          "na",
          "ma",
          "ya"
        ],
        "correct": "ha",
        "character": "ハ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de マ ?",
        "options": [
          "ma",
          "na",
          "ha",
          "ra"
        ],
        "correct": "ma",
        "character": "マ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ヤ ?",
        "options": [
          "ya",
          "ma",
          "ra",
          "wa"
        ],
        "correct": "ya",
        "character": "ヤ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ラ ?",
        "options": [
          "ra",
          "ya",
          "ma",
          "wa"
        ],
        "correct": "ra",
        "character": "ラ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ワ ?",
        "options": [
          "wa",
          "ra",
          "ya",
          "n"
        ],
        "correct": "wa",
        "character": "ワ"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ン ?",
        "options": [
          "n",
          "wa",
          "wo",
          "no"
        ],
        "correct": "n",
        "character": "ン"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: アニメ",
        "correct": "anime",
        "character": "アニメ",
        "meaning": "anime/dessin animé"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: カラオケ",
        "correct": "karaoke",
        "character": "カラオケ",
        "meaning": "karaoké"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ラーメン",
        "correct": "raamen",
        "character": "ラーメン",
        "meaning": "ramen"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: マンガ",
        "correct": "manga",
        "character": "マンガ",
        "meaning": "manga"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: サムライ",
        "correct": "samurai",
        "character": "サムライ",
        "meaning": "samouraï"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ニンジャ",
        "correct": "ninja",
        "character": "ニンジャ",
        "meaning": "ninja"
      }
    ]
  },
  {
    "id": 22,
    "title": "Katakana 11 : Mots Courants",
    "description": "Vocabulaire quotidien en katakana",
    "difficulty": "Intermédiaire",
    "category": "katakana",
    "free": true,
    "characters": [
      {
        "katakana": "スマホ",
        "romaji": "sumaho",
        "pronunciation": "sumaho",
        "mnemonic": "Caractère スマホ",
        "examples": [],
        "audio": "sumaho.mp3"
      },
      {
        "katakana": "パソコン",
        "romaji": "pasokon",
        "pronunciation": "pasokon",
        "mnemonic": "Caractère パソコン",
        "examples": [],
        "audio": "pasokon.mp3"
      },
      {
        "katakana": "インターネット",
        "romaji": "intaanetto",
        "pronunciation": "intaanetto",
        "mnemonic": "Caractère インターネット",
        "examples": [],
        "audio": "intaanetto.mp3"
      },
      {
        "katakana": "テレビ",
        "romaji": "terebi",
        "pronunciation": "terebi",
        "mnemonic": "Caractère テレビ",
        "examples": [],
        "audio": "terebi.mp3"
      },
      {
        "katakana": "エアコン",
        "romaji": "eakon",
        "pronunciation": "eakon",
        "mnemonic": "Caractère エアコン",
        "examples": [],
        "audio": "eakon.mp3"
      }
    ],
    "exercises": [
      {
        "type": "transcription",
        "question": "Tapez le romaji de: スマホ",
        "correct": "sumaho",
        "character": "スマホ",
        "meaning": "smartphone"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: パソコン",
        "correct": "pasokon",
        "character": "パソコン",
        "meaning": "ordinateur"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: インターネット",
        "correct": "intaanetto",
        "character": "インターネット",
        "meaning": "internet"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: テレビ",
        "correct": "terebi",
        "character": "テレビ",
        "meaning": "télévision"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: カメラ",
        "correct": "kamera",
        "character": "カメラ",
        "meaning": "caméra"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ゲーム",
        "correct": "geemu",
        "character": "ゲーム",
        "meaning": "jeu vidéo"
      }
    ]
  }
];

// ========================================
// VOCABULARY LESSONS (1 leçons)
// ========================================

export const vocabularyLessons = [
  {
    "id": 43,
    "title": "Chiffres 1-100",
    "description": "Apprenez à compter en japonais",
    "difficulty": "Intermédiaire",
    "category": "vocabulary",
    "free": true,
    "characters": [
      {
        "hiragana": "一 (いち)",
        "romaji": "ichi",
        "pronunciation": "ichi",
        "mnemonic": "Caractère 一 (いち)",
        "examples": [],
        "audio": "ichi.mp3",
        "meaning": "1"
      },
      {
        "hiragana": "二 (に)",
        "romaji": "ni",
        "pronunciation": "ni",
        "mnemonic": "Caractère 二 (に)",
        "examples": [],
        "audio": "ni.mp3",
        "meaning": "2"
      },
      {
        "hiragana": "三 (さん)",
        "romaji": "san",
        "pronunciation": "san",
        "mnemonic": "Caractère 三 (さん)",
        "examples": [],
        "audio": "san.mp3",
        "meaning": "3"
      },
      {
        "hiragana": "四 (よん)",
        "romaji": "yon",
        "pronunciation": "yon",
        "mnemonic": "Caractère 四 (よん)",
        "examples": [],
        "audio": "yon.mp3",
        "meaning": "4"
      },
      {
        "hiragana": "五 (ご)",
        "romaji": "go",
        "pronunciation": "go",
        "mnemonic": "Caractère 五 (ご)",
        "examples": [],
        "audio": "go.mp3",
        "meaning": "5"
      },
      {
        "hiragana": "六 (ろく)",
        "romaji": "roku",
        "pronunciation": "roku",
        "mnemonic": "Caractère 六 (ろく)",
        "examples": [],
        "audio": "roku.mp3",
        "meaning": "6"
      },
      {
        "hiragana": "七 (なな)",
        "romaji": "nana",
        "pronunciation": "nana",
        "mnemonic": "Caractère 七 (なな)",
        "examples": [],
        "audio": "nana.mp3",
        "meaning": "7"
      },
      {
        "hiragana": "八 (はち)",
        "romaji": "hachi",
        "pronunciation": "hachi",
        "mnemonic": "Caractère 八 (はち)",
        "examples": [],
        "audio": "hachi.mp3",
        "meaning": "8"
      },
      {
        "hiragana": "九 (きゅう)",
        "romaji": "kyuu",
        "pronunciation": "kyuu",
        "mnemonic": "Caractère 九 (きゅう)",
        "examples": [],
        "audio": "kyuu.mp3",
        "meaning": "9"
      },
      {
        "hiragana": "十 (じゅう)",
        "romaji": "juu",
        "pronunciation": "juu",
        "mnemonic": "Caractère 十 (じゅう)",
        "examples": [],
        "audio": "juu.mp3",
        "meaning": "10"
      },
      {
        "hiragana": "百 (ひゃく)",
        "romaji": "hyaku",
        "pronunciation": "hyaku",
        "mnemonic": "Caractère 百 (ひゃく)",
        "examples": [],
        "audio": "hyaku.mp3",
        "meaning": "100"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Quel est le romaji de いち ?",
        "options": [
          "ichi (1)",
          "ni (2)",
          "san (3)",
          "yon (4)"
        ],
        "correct": "ichi (1)",
        "character": "いち"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de に ?",
        "options": [
          "ni (2)",
          "ichi (1)",
          "san (3)",
          "go (5)"
        ],
        "correct": "ni (2)",
        "character": "に"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de さん ?",
        "options": [
          "san (3)",
          "yon (4)",
          "go (5)",
          "roku (6)"
        ],
        "correct": "san (3)",
        "character": "さん"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de よん ?",
        "options": [
          "yon (4)",
          "san (3)",
          "go (5)",
          "roku (6)"
        ],
        "correct": "yon (4)",
        "character": "よん"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ご ?",
        "options": [
          "go (5)",
          "roku (6)",
          "nana (7)",
          "hachi (8)"
        ],
        "correct": "go (5)",
        "character": "ご"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de ろく ?",
        "options": [
          "roku (6)",
          "go (5)",
          "nana (7)",
          "hachi (8)"
        ],
        "correct": "roku (6)",
        "character": "ろく"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de なな ?",
        "options": [
          "nana (7)",
          "roku (6)",
          "hachi (8)",
          "kyuu (9)"
        ],
        "correct": "nana (7)",
        "character": "なな"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de はち ?",
        "options": [
          "hachi (8)",
          "nana (7)",
          "kyuu (9)",
          "juu (10)"
        ],
        "correct": "hachi (8)",
        "character": "はち"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de きゅう ?",
        "options": [
          "kyuu (9)",
          "hachi (8)",
          "juu (10)",
          "nana (7)"
        ],
        "correct": "kyuu (9)",
        "character": "きゅう"
      },
      {
        "type": "mcq",
        "question": "Quel est le romaji de じゅう ?",
        "options": [
          "juu (10)",
          "kyuu (9)",
          "hachi (8)",
          "ichi (1)"
        ],
        "correct": "juu (10)",
        "character": "じゅう"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: じゅういち",
        "correct": "juuichi",
        "character": "じゅういち",
        "meaning": "11"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: じゅうに",
        "correct": "juuni",
        "character": "じゅうに",
        "meaning": "12"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: にじゅう",
        "correct": "nijuu",
        "character": "にじゅう",
        "meaning": "20"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: さんじゅう",
        "correct": "sanjuu",
        "character": "さんじゅう",
        "meaning": "30"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: よんじゅう",
        "correct": "yonjuu",
        "character": "よんじゅう",
        "meaning": "40"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ごじゅう",
        "correct": "gojuu",
        "character": "ごじゅう",
        "meaning": "50"
      }
    ]
  },
  {
    "id": 44,
    "title": "Salutations",
    "description": "Les expressions essentielles du quotidien",
    "difficulty": "Débutant",
    "category": "vocabulary",
    "free": true,
    "characters": [
      {
        "hiragana": "こんにちは",
        "romaji": "konnichiwa",
        "pronunciation": "konnichiwa",
        "mnemonic": "Bonjour (journée)",
        "examples": [],
        "audio": "konnichiwa.mp3",
        "meaning": "Bonjour"
      },
      {
        "hiragana": "おはよう",
        "romaji": "ohayou",
        "pronunciation": "ohayou",
        "mnemonic": "Bonjour (matin)",
        "examples": [],
        "audio": "ohayou.mp3",
        "meaning": "Bonjour (matin)"
      },
      {
        "hiragana": "こんばんは",
        "romaji": "konbanwa",
        "pronunciation": "konbanwa",
        "mnemonic": "Bonsoir",
        "examples": [],
        "audio": "konbanwa.mp3",
        "meaning": "Bonsoir"
      },
      {
        "hiragana": "さようなら",
        "romaji": "sayounara",
        "pronunciation": "sayounara",
        "mnemonic": "Au revoir",
        "examples": [],
        "audio": "sayounara.mp3",
        "meaning": "Au revoir"
      },
      {
        "hiragana": "ありがとう",
        "romaji": "arigatou",
        "pronunciation": "arigatou",
        "mnemonic": "Merci",
        "examples": [],
        "audio": "arigatou.mp3",
        "meaning": "Merci"
      },
      {
        "hiragana": "すみません",
        "romaji": "sumimasen",
        "pronunciation": "sumimasen",
        "mnemonic": "Excusez-moi / Pardon",
        "examples": [],
        "audio": "sumimasen.mp3",
        "meaning": "Excusez-moi"
      },
      {
        "hiragana": "ごめんなさい",
        "romaji": "gomennasai",
        "pronunciation": "gomennasai",
        "mnemonic": "Je suis désolé",
        "examples": [],
        "audio": "gomennasai.mp3",
        "meaning": "Désolé"
      },
      {
        "hiragana": "はい",
        "romaji": "hai",
        "pronunciation": "hai",
        "mnemonic": "Oui",
        "examples": [],
        "audio": "hai.mp3",
        "meaning": "Oui"
      },
      {
        "hiragana": "いいえ",
        "romaji": "iie",
        "pronunciation": "iie",
        "mnemonic": "Non",
        "examples": [],
        "audio": "iie.mp3",
        "meaning": "Non"
      },
      {
        "hiragana": "おねがいします",
        "romaji": "onegaishimasu",
        "pronunciation": "onegaishimasu",
        "mnemonic": "S'il vous plaît",
        "examples": [],
        "audio": "onegaishimasu.mp3",
        "meaning": "S'il vous plaît"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Comment dit-on 'Bonjour' l'après-midi ?",
        "options": ["こんにちは", "おはよう", "こんばんは", "さようなら"],
        "correct": "こんにちは",
        "character": "Bonjour"
      },
      {
        "type": "mcq",
        "question": "Comment dit-on 'Merci' ?",
        "options": ["ありがとう", "すみません", "ごめんなさい", "はい"],
        "correct": "ありがとう",
        "character": "Merci"
      },
      {
        "type": "mcq",
        "question": "Que signifie おはよう ?",
        "options": ["Bonjour (matin)", "Bonsoir", "Au revoir", "Merci"],
        "correct": "Bonjour (matin)",
        "character": "おはよう"
      },
      {
        "type": "mcq",
        "question": "Comment dit-on 'Au revoir' ?",
        "options": ["さようなら", "こんにちは", "ありがとう", "すみません"],
        "correct": "さようなら",
        "character": "Au revoir"
      },
      {
        "type": "mcq",
        "question": "Que signifie すみません ?",
        "options": ["Excusez-moi", "Merci", "Oui", "Non"],
        "correct": "Excusez-moi",
        "character": "すみません"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: こんにちは",
        "correct": "konnichiwa",
        "character": "こんにちは",
        "meaning": "Bonjour"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: ありがとう",
        "correct": "arigatou",
        "character": "ありがとう",
        "meaning": "Merci"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: さようなら",
        "correct": "sayounara",
        "character": "さようなら",
        "meaning": "Au revoir"
      }
    ]
  },
  {
    "id": 45,
    "title": "Jours de la semaine",
    "description": "Les 7 jours en japonais",
    "difficulty": "Débutant",
    "category": "vocabulary",
    "free": true,
    "characters": [
      {
        "hiragana": "げつようび",
        "romaji": "getsuyoubi",
        "pronunciation": "getsuyoubi",
        "mnemonic": "月曜日 - Jour de la lune",
        "examples": [],
        "audio": "getsuyoubi.mp3",
        "meaning": "Lundi"
      },
      {
        "hiragana": "かようび",
        "romaji": "kayoubi",
        "pronunciation": "kayoubi",
        "mnemonic": "火曜日 - Jour du feu",
        "examples": [],
        "audio": "kayoubi.mp3",
        "meaning": "Mardi"
      },
      {
        "hiragana": "すいようび",
        "romaji": "suiyoubi",
        "pronunciation": "suiyoubi",
        "mnemonic": "水曜日 - Jour de l'eau",
        "examples": [],
        "audio": "suiyoubi.mp3",
        "meaning": "Mercredi"
      },
      {
        "hiragana": "もくようび",
        "romaji": "mokuyoubi",
        "pronunciation": "mokuyoubi",
        "mnemonic": "木曜日 - Jour du bois",
        "examples": [],
        "audio": "mokuyoubi.mp3",
        "meaning": "Jeudi"
      },
      {
        "hiragana": "きんようび",
        "romaji": "kinyoubi",
        "pronunciation": "kinyoubi",
        "mnemonic": "金曜日 - Jour de l'or",
        "examples": [],
        "audio": "kinyoubi.mp3",
        "meaning": "Vendredi"
      },
      {
        "hiragana": "どようび",
        "romaji": "doyoubi",
        "pronunciation": "doyoubi",
        "mnemonic": "土曜日 - Jour de la terre",
        "examples": [],
        "audio": "doyoubi.mp3",
        "meaning": "Samedi"
      },
      {
        "hiragana": "にちようび",
        "romaji": "nichiyoubi",
        "pronunciation": "nichiyoubi",
        "mnemonic": "日曜日 - Jour du soleil",
        "examples": [],
        "audio": "nichiyoubi.mp3",
        "meaning": "Dimanche"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Comment dit-on 'Lundi' ?",
        "options": ["げつようび", "かようび", "すいようび", "もくようび"],
        "correct": "げつようび",
        "character": "Lundi"
      },
      {
        "type": "mcq",
        "question": "Que signifie きんようび ?",
        "options": ["Vendredi", "Jeudi", "Samedi", "Dimanche"],
        "correct": "Vendredi",
        "character": "きんようび"
      },
      {
        "type": "mcq",
        "question": "Quel jour est にちようび ?",
        "options": ["Dimanche", "Samedi", "Lundi", "Mardi"],
        "correct": "Dimanche",
        "character": "にちようび"
      },
      {
        "type": "mcq",
        "question": "Comment dit-on 'Mercredi' ?",
        "options": ["すいようび", "かようび", "もくようび", "きんようび"],
        "correct": "すいようび",
        "character": "Mercredi"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: げつようび",
        "correct": "getsuyoubi",
        "character": "げつようび",
        "meaning": "Lundi"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: にちようび",
        "correct": "nichiyoubi",
        "character": "にちようび",
        "meaning": "Dimanche"
      }
    ]
  },
  {
    "id": 46,
    "title": "Couleurs",
    "description": "Les couleurs principales",
    "difficulty": "Débutant",
    "category": "vocabulary",
    "free": true,
    "characters": [
      {
        "hiragana": "あか",
        "romaji": "aka",
        "pronunciation": "aka",
        "mnemonic": "赤 - Rouge",
        "examples": [],
        "audio": "aka.mp3",
        "meaning": "Rouge"
      },
      {
        "hiragana": "あお",
        "romaji": "ao",
        "pronunciation": "ao",
        "mnemonic": "青 - Bleu",
        "examples": [],
        "audio": "ao.mp3",
        "meaning": "Bleu"
      },
      {
        "hiragana": "きいろ",
        "romaji": "kiiro",
        "pronunciation": "kiiro",
        "mnemonic": "黄色 - Jaune",
        "examples": [],
        "audio": "kiiro.mp3",
        "meaning": "Jaune"
      },
      {
        "hiragana": "みどり",
        "romaji": "midori",
        "pronunciation": "midori",
        "mnemonic": "緑 - Vert",
        "examples": [],
        "audio": "midori.mp3",
        "meaning": "Vert"
      },
      {
        "hiragana": "しろ",
        "romaji": "shiro",
        "pronunciation": "shiro",
        "mnemonic": "白 - Blanc",
        "examples": [],
        "audio": "shiro.mp3",
        "meaning": "Blanc"
      },
      {
        "hiragana": "くろ",
        "romaji": "kuro",
        "pronunciation": "kuro",
        "mnemonic": "黒 - Noir",
        "examples": [],
        "audio": "kuro.mp3",
        "meaning": "Noir"
      },
      {
        "hiragana": "オレンジ",
        "romaji": "orenji",
        "pronunciation": "orenji",
        "mnemonic": "Orange (katakana car emprunté)",
        "examples": [],
        "audio": "orenji.mp3",
        "meaning": "Orange"
      },
      {
        "hiragana": "ピンク",
        "romaji": "pinku",
        "pronunciation": "pinku",
        "mnemonic": "Rose (katakana car emprunté)",
        "examples": [],
        "audio": "pinku.mp3",
        "meaning": "Rose"
      },
      {
        "hiragana": "むらさき",
        "romaji": "murasaki",
        "pronunciation": "murasaki",
        "mnemonic": "紫 - Violet",
        "examples": [],
        "audio": "murasaki.mp3",
        "meaning": "Violet"
      },
      {
        "hiragana": "ちゃいろ",
        "romaji": "chairo",
        "pronunciation": "chairo",
        "mnemonic": "茶色 - Marron (couleur du thé)",
        "examples": [],
        "audio": "chairo.mp3",
        "meaning": "Marron"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Comment dit-on 'Rouge' ?",
        "options": ["あか", "あお", "きいろ", "みどり"],
        "correct": "あか",
        "character": "Rouge"
      },
      {
        "type": "mcq",
        "question": "Que signifie あお ?",
        "options": ["Bleu", "Rouge", "Vert", "Jaune"],
        "correct": "Bleu",
        "character": "あお"
      },
      {
        "type": "mcq",
        "question": "Quelle couleur est しろ ?",
        "options": ["Blanc", "Noir", "Gris", "Bleu"],
        "correct": "Blanc",
        "character": "しろ"
      },
      {
        "type": "mcq",
        "question": "Comment dit-on 'Vert' ?",
        "options": ["みどり", "きいろ", "あお", "あか"],
        "correct": "みどり",
        "character": "Vert"
      },
      {
        "type": "mcq",
        "question": "Que signifie くろ ?",
        "options": ["Noir", "Blanc", "Marron", "Violet"],
        "correct": "Noir",
        "character": "くろ"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: あか",
        "correct": "aka",
        "character": "あか",
        "meaning": "Rouge"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: みどり",
        "correct": "midori",
        "character": "みどり",
        "meaning": "Vert"
      }
    ]
  },
  {
    "id": 47,
    "title": "Famille",
    "description": "Les membres de la famille",
    "difficulty": "Débutant",
    "category": "vocabulary",
    "free": true,
    "characters": [
      {
        "hiragana": "おかあさん",
        "romaji": "okaasan",
        "pronunciation": "okaasan",
        "mnemonic": "お母さん - Mère (poli)",
        "examples": [],
        "audio": "okaasan.mp3",
        "meaning": "Mère"
      },
      {
        "hiragana": "おとうさん",
        "romaji": "otousan",
        "pronunciation": "otousan",
        "mnemonic": "お父さん - Père (poli)",
        "examples": [],
        "audio": "otousan.mp3",
        "meaning": "Père"
      },
      {
        "hiragana": "おにいさん",
        "romaji": "oniisan",
        "pronunciation": "oniisan",
        "mnemonic": "お兄さん - Grand frère",
        "examples": [],
        "audio": "oniisan.mp3",
        "meaning": "Grand frère"
      },
      {
        "hiragana": "おねえさん",
        "romaji": "oneesan",
        "pronunciation": "oneesan",
        "mnemonic": "お姉さん - Grande sœur",
        "examples": [],
        "audio": "oneesan.mp3",
        "meaning": "Grande sœur"
      },
      {
        "hiragana": "おとうと",
        "romaji": "otouto",
        "pronunciation": "otouto",
        "mnemonic": "弟 - Petit frère",
        "examples": [],
        "audio": "otouto.mp3",
        "meaning": "Petit frère"
      },
      {
        "hiragana": "いもうと",
        "romaji": "imouto",
        "pronunciation": "imouto",
        "mnemonic": "妹 - Petite sœur",
        "examples": [],
        "audio": "imouto.mp3",
        "meaning": "Petite sœur"
      },
      {
        "hiragana": "おじいさん",
        "romaji": "ojiisan",
        "pronunciation": "ojiisan",
        "mnemonic": "お祖父さん - Grand-père",
        "examples": [],
        "audio": "ojiisan.mp3",
        "meaning": "Grand-père"
      },
      {
        "hiragana": "おばあさん",
        "romaji": "obaasan",
        "pronunciation": "obaasan",
        "mnemonic": "お祖母さん - Grand-mère",
        "examples": [],
        "audio": "obaasan.mp3",
        "meaning": "Grand-mère"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Comment dit-on 'Mère' ?",
        "options": ["おかあさん", "おとうさん", "おねえさん", "おばあさん"],
        "correct": "おかあさん",
        "character": "Mère"
      },
      {
        "type": "mcq",
        "question": "Que signifie おとうさん ?",
        "options": ["Père", "Mère", "Grand-père", "Grand frère"],
        "correct": "Père",
        "character": "おとうさん"
      },
      {
        "type": "mcq",
        "question": "Comment dit-on 'Petit frère' ?",
        "options": ["おとうと", "おにいさん", "いもうと", "おとうさん"],
        "correct": "おとうと",
        "character": "Petit frère"
      },
      {
        "type": "mcq",
        "question": "Que signifie おばあさん ?",
        "options": ["Grand-mère", "Grand-père", "Mère", "Grande sœur"],
        "correct": "Grand-mère",
        "character": "おばあさん"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: おかあさん",
        "correct": "okaasan",
        "character": "おかあさん",
        "meaning": "Mère"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: おとうさん",
        "correct": "otousan",
        "character": "おとうさん",
        "meaning": "Père"
      }
    ]
  },
  {
    "id": 48,
    "title": "Nourriture de base",
    "description": "Aliments et boissons essentiels",
    "difficulty": "Débutant",
    "category": "vocabulary",
    "free": true,
    "characters": [
      {
        "hiragana": "みず",
        "romaji": "mizu",
        "pronunciation": "mizu",
        "mnemonic": "水 - Eau",
        "examples": [],
        "audio": "mizu.mp3",
        "meaning": "Eau"
      },
      {
        "hiragana": "ごはん",
        "romaji": "gohan",
        "pronunciation": "gohan",
        "mnemonic": "ご飯 - Riz / Repas",
        "examples": [],
        "audio": "gohan.mp3",
        "meaning": "Riz / Repas"
      },
      {
        "hiragana": "パン",
        "romaji": "pan",
        "pronunciation": "pan",
        "mnemonic": "Pain (du portugais)",
        "examples": [],
        "audio": "pan.mp3",
        "meaning": "Pain"
      },
      {
        "hiragana": "にく",
        "romaji": "niku",
        "pronunciation": "niku",
        "mnemonic": "肉 - Viande",
        "examples": [],
        "audio": "niku.mp3",
        "meaning": "Viande"
      },
      {
        "hiragana": "さかな",
        "romaji": "sakana",
        "pronunciation": "sakana",
        "mnemonic": "魚 - Poisson",
        "examples": [],
        "audio": "sakana.mp3",
        "meaning": "Poisson"
      },
      {
        "hiragana": "やさい",
        "romaji": "yasai",
        "pronunciation": "yasai",
        "mnemonic": "野菜 - Légumes",
        "examples": [],
        "audio": "yasai.mp3",
        "meaning": "Légumes"
      },
      {
        "hiragana": "くだもの",
        "romaji": "kudamono",
        "pronunciation": "kudamono",
        "mnemonic": "果物 - Fruits",
        "examples": [],
        "audio": "kudamono.mp3",
        "meaning": "Fruits"
      },
      {
        "hiragana": "おちゃ",
        "romaji": "ocha",
        "pronunciation": "ocha",
        "mnemonic": "お茶 - Thé",
        "examples": [],
        "audio": "ocha.mp3",
        "meaning": "Thé"
      },
      {
        "hiragana": "コーヒー",
        "romaji": "koohii",
        "pronunciation": "koohii",
        "mnemonic": "Café (katakana)",
        "examples": [],
        "audio": "koohii.mp3",
        "meaning": "Café"
      },
      {
        "hiragana": "たまご",
        "romaji": "tamago",
        "pronunciation": "tamago",
        "mnemonic": "卵 - Œuf",
        "examples": [],
        "audio": "tamago.mp3",
        "meaning": "Œuf"
      }
    ],
    "exercises": [
      {
        "type": "mcq",
        "question": "Comment dit-on 'Eau' ?",
        "options": ["みず", "おちゃ", "コーヒー", "ごはん"],
        "correct": "みず",
        "character": "Eau"
      },
      {
        "type": "mcq",
        "question": "Que signifie ごはん ?",
        "options": ["Riz / Repas", "Pain", "Viande", "Poisson"],
        "correct": "Riz / Repas",
        "character": "ごはん"
      },
      {
        "type": "mcq",
        "question": "Comment dit-on 'Poisson' ?",
        "options": ["さかな", "にく", "たまご", "やさい"],
        "correct": "さかな",
        "character": "Poisson"
      },
      {
        "type": "mcq",
        "question": "Que signifie おちゃ ?",
        "options": ["Thé", "Café", "Eau", "Lait"],
        "correct": "Thé",
        "character": "おちゃ"
      },
      {
        "type": "mcq",
        "question": "Comment dit-on 'Légumes' ?",
        "options": ["やさい", "くだもの", "にく", "さかな"],
        "correct": "やさい",
        "character": "Légumes"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: みず",
        "correct": "mizu",
        "character": "みず",
        "meaning": "Eau"
      },
      {
        "type": "transcription",
        "question": "Tapez le romaji de: さかな",
        "correct": "sakana",
        "character": "さかな",
        "meaning": "Poisson"
      }
    ]
  }
];

// ========================================
// KANJI LESSONS (N5 - 50 kanji)
// ========================================

// Les leçons Kanji N5 sont importées depuis kanjiN5.js
export const kanjiLessons = kanjiN5Lessons;

// ========================================
// LESSON CATEGORIES
// ========================================

export const LESSON_CATEGORIES = {
  HIRAGANA: 'hiragana',
  KATAKANA: 'katakana',
  VOCABULARY: 'vocabulary',
  KANJI: 'kanji',
};

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Obtenir toutes les leçons d'une catégorie
 */
export const getLessonsByCategory = (category) => {
  switch (category) {
    case LESSON_CATEGORIES.HIRAGANA:
      return hiraganaLessons;
    case LESSON_CATEGORIES.KATAKANA:
      return katakanaLessons;
    case LESSON_CATEGORIES.VOCABULARY:
      return vocabularyLessons;
    case LESSON_CATEGORIES.KANJI:
      return kanjiLessons;
    default:
      return [];
  }
};

/**
 * Obtenir une leçon spécifique par ID
 */
export const getLessonById = (lessonId) => {
  const allLessons = [
    ...hiraganaLessons,
    ...katakanaLessons,
    ...vocabularyLessons,
    ...kanjiLessons
  ];
  return allLessons.find(lesson => lesson.id === lessonId);
};

/**
 * Obtenir toutes les leçons (toutes catégories)
 */
export const getAllLessons = () => {
  return [
    ...hiraganaLessons,
    ...katakanaLessons,
    ...vocabularyLessons,
    ...kanjiLessons
  ];
};

/**
 * Obtenir le nombre total de caractères à apprendre
 */
export const getTotalCharacters = () => {
  const allLessons = getAllLessons();
  return allLessons.reduce((total, lesson) => total + lesson.characters.length, 0);
};

export default {
  hiraganaLessons,
  katakanaLessons,
  vocabularyLessons,
  kanjiLessons,
  LESSON_CATEGORIES,
  getLessonsByCategory,
  getLessonById,
  getAllLessons,
  getTotalCharacters,
};

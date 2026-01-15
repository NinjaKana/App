/**
 * Grammar Tips Component
 * Modal avec explications grammaticales par catégorie
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';

// Données grammaticales par catégorie
const GRAMMAR_DATA = {
  hiragana: {
    title: 'Les Hiragana ひらがな',
    sections: [
      {
        heading: "Qu'est-ce que c'est ?",
        content: "Les hiragana sont l'un des trois systèmes d'écriture japonais. Ils représentent des sons (syllabes) et sont utilisés pour les mots japonais natifs.",
      },
      {
        heading: 'Structure',
        content: '46 caractères de base organisés en lignes par consonne (k, s, t, n, h, m, y, r, w) et colonnes par voyelle (a, i, u, e, o).',
      },
      {
        heading: 'Conseils',
        content: "• Commencez par les voyelles (あいうえお)\n• Apprenez une ligne à la fois\n• Pratiquez l'écriture à la main\n• Associez chaque son à une image mnémotechnique",
      },
      {
        heading: 'Exemple',
        content: 'あ (a) ressemble à une personne qui dit "Ah!"\nき (ki) ressemble à une clé (key)',
      },
    ],
  },
  katakana: {
    title: 'Les Katakana カタカナ',
    sections: [
      {
        heading: 'Usage',
        content: "Les katakana s'utilisent pour :\n• Les mots étrangers (コーヒー = café)\n• Les noms propres étrangers\n• Les onomatopées\n• L'emphase (comme l'italique)",
      },
      {
        heading: 'Différence avec Hiragana',
        content: 'Mêmes sons, formes plus angulaires. Si hiragana = cursive, katakana = majuscules.',
      },
      {
        heading: 'Conseils',
        content: "• Apprenez-les APRÈS les hiragana\n• Associez chaque katakana à son hiragana équivalent\n• Pratiquez avec des mots courants : テレビ (TV), パン (pain)",
      },
    ],
  },
  dakuten: {
    title: 'Caractères Voisés (Dakuten ゛)',
    sections: [
      {
        heading: "Qu'est-ce que c'est ?",
        content: "Le dakuten (゛) ou \"ten-ten\" est un signe diacritique qui transforme certains sons en versions voisées (sonores). Il se place en haut à droite du caractère.",
      },
      {
        heading: 'Transformations',
        content: "• K → G (か→が ka→ga)\n• S → Z (さ→ざ sa→za)\n• T → D (た→だ ta→da)\n• H → B (は→ば ha→ba)\n\nAttention : し devient じ (shi→ji) et つ devient づ (tsu→zu)",
      },
      {
        heading: 'Prononciation',
        content: "Les sons voisés sont prononcés avec vibration des cordes vocales :\n• GA, GI, GU, GE, GO (comme dans 'gare')\n• ZA, JI, ZU, ZE, ZO (comme dans 'zoo')\n• DA, DI, DU, DE, DO (comme dans 'dodo')\n• BA, BI, BU, BE, BO (comme dans 'balle')",
      },
      {
        heading: 'Astuce',
        content: "Prononcez d'abord le son de base (ka, sa, ta, ha) puis ajoutez de la 'voix' : c'est comme passer du chuchotement à la voix normale !",
      },
    ],
  },
  handakuten: {
    title: 'Caractères Semi-voisés (Handakuten ゜)',
    sections: [
      {
        heading: "Qu'est-ce que c'est ?",
        content: "Le handakuten (゜) ou \"maru\" (cercle) transforme uniquement la ligne H en sons P. C'est un petit cercle placé en haut à droite du caractère.",
      },
      {
        heading: 'Transformation H → P',
        content: "• は → ぱ (ha → pa)\n• ひ → ぴ (hi → pi)\n• ふ → ぷ (hu → pu)\n• へ → ぺ (he → pe)\n• ほ → ぽ (ho → po)",
      },
      {
        heading: 'Prononciation',
        content: "Le son P est explosif, comme en français :\n• PA comme dans 'papa'\n• PI comme dans 'pizza'\n• PU comme dans 'pull'\n• PE comme dans 'pet'\n• PO comme dans 'pot'",
      },
      {
        heading: 'Différence',
        content: "Ne confondez pas :\n• Dakuten (゛) = H → B (vibration)\n• Handakuten (゜) = H → P (explosion d'air)",
      },
    ],
  },
  combinations: {
    title: 'Combinaisons (Yōon 拗音)',
    sections: [
      {
        heading: "Qu'est-ce que c'est ?",
        content: "Les yōon sont des combinaisons de deux caractères formant un seul son. Le 2e caractère (や, ゆ, よ) est écrit plus petit.",
      },
      {
        heading: 'Structure',
        content: "Consonne + i + petit ya/yu/yo :\n• きゃ = kya (ki + ya)\n• しゅ = shu (shi + yu)\n• ちょ = cho (chi + yo)\n• りゃ = rya (ri + ya)",
      },
      {
        heading: 'Prononciation',
        content: "Les deux caractères se prononcent en UN SEUL son :\n• KYA (comme 'Kya!' en criant)\n• SHU (comme 'chou')\n• CHO (comme 'chaud')\n• NYA (comme le miaulement du chat)",
      },
      {
        heading: 'Usage courant',
        content: "Très fréquent en japonais :\n• きゃく (kyaku) = client\n• しゅう (shuu) = semaine\n• ちょっと (chotto) = un peu\n• りょう (ryou) = dortoir",
      },
    ],
  },
  kanji: {
    title: 'Les Kanji 漢字',
    sections: [
      {
        heading: "Qu'est-ce que c'est ?",
        content: "Caractères d'origine chinoise représentant des concepts. Chaque kanji a généralement plusieurs lectures (on'yomi et kun'yomi).",
      },
      {
        heading: 'Lectures',
        content: "• On'yomi (音読み) : lecture sino-japonaise, utilisée dans les mots composés\n• Kun'yomi (訓読み) : lecture japonaise native, souvent seule",
      },
      {
        heading: 'JLPT N5',
        content: "Pour le JLPT N5, vous devez connaître ~100 kanji basiques : nombres, jours, directions, personnes, etc.",
      },
      {
        heading: 'Méthode',
        content: "• Apprenez le sens d'abord\n• Puis les lectures courantes\n• Pratiquez avec des mots réels\n• Utilisez les mnémoniques !",
      },
    ],
  },
  vocabulary: {
    title: 'Vocabulaire 語彙',
    sections: [
      {
        heading: 'Approche',
        content: "Apprenez le vocabulaire en contexte, pas en isolation. Les mots s'ancrent mieux avec des phrases d'exemple.",
      },
      {
        heading: 'Thèmes disponibles',
        content: "• Salutations et politesse (こんにちは, ありがとう...)\n• Jours de la semaine (月曜日, 火曜日...)\n• Couleurs (赤, 青, 白...)\n• Famille (お父さん, お母さん...)\n• Nourriture de base (水, ご飯, パン...)",
      },
      {
        heading: 'Conseils',
        content: "• Révisez régulièrement avec le SRS\n• Écoutez la prononciation (bouton audio)\n• Utilisez les mots dans des phrases\n• Apprenez 5-10 mots nouveaux par jour maximum",
      },
      {
        heading: 'Vocabulaire JLPT N5',
        content: "Ces leçons couvrent le vocabulaire essentiel pour le JLPT N5 (niveau débutant). Environ 800 mots à maîtriser pour le test.",
      },
    ],
  },
  numbers: {
    title: 'Les Nombres 数字',
    sections: [
      {
        heading: 'Système',
        content: "Le japonais utilise deux systèmes :\n• Sino-japonais : いち、に、さん...\n• Japonais natif : ひとつ、ふたつ...",
      },
      {
        heading: 'Compteurs',
        content: "Le japonais utilise des 'compteurs' selon l'objet :\n• 人 (nin) pour les personnes\n• 本 (hon) pour les objets longs\n• 枚 (mai) pour les objets plats",
      },
      {
        heading: 'Irrégularités',
        content: "Attention aux changements phonétiques :\n• 1人 = ひとり (pas いちにん)\n• 2人 = ふたり\n• 4 = よん ou し\n• 7 = なな ou しち",
      },
    ],
  },
  default: {
    title: 'Conseils Généraux',
    sections: [
      {
        heading: 'Constance',
        content: "15 minutes par jour valent mieux que 2h une fois par semaine. La régularité est la clé !",
      },
      {
        heading: 'Révision espacée',
        content: "Utilisez le système SRS (Spaced Repetition System) pour réviser au moment optimal et ancrer durablement.",
      },
      {
        heading: 'Immersion',
        content: "• Écoutez du japonais (anime, musique, podcasts)\n• Changez la langue de votre téléphone\n• Étiquetez des objets chez vous",
      },
    ],
  },
};

// Déterminer la catégorie de grammaire basée sur le type de leçon et son titre
function getGrammarCategory(lessonType, lessonId, lessonTitle) {
  // Convertir en minuscules pour la comparaison
  const title = (lessonTitle || '').toLowerCase();
  const idStr = String(lessonId || '');

  // Détection par titre (prioritaire car plus précis)
  // IMPORTANT : Vérifier handakuten AVANT dakuten (car "handakuten" contient "dakuten")
  if (title.includes('semi-voisées') || title.includes('handakuten') ||
      title.includes('p (')) {
    return 'handakuten';
  }

  if (title.includes('voisées') || title.includes('dakuten') ||
      title.includes('g +') || title.includes('z +') ||
      title.includes('d +') || title.includes('b +')) {
    return 'dakuten';
  }

  if (title.includes('combinaisons') || title.includes('yōon')) {
    return 'combinations';
  }

  // Détection spécifique pour Chiffres/Nombres
  if (title.includes('chiffres') || title.includes('nombres') ||
      title.includes('1-100') || title.includes('(1-')) {
    return 'numbers';
  }

  // Détection par type de leçon
  if (lessonType === 'kanji' || idStr.includes('kanji')) return 'kanji';
  if (lessonType === 'hiragana') return 'hiragana';
  if (lessonType === 'katakana') return 'katakana';
  if (lessonType === 'vocabulary') return 'vocabulary';

  // Pour les leçons kanji avec ID numérique (23-42)
  const numId = Number(lessonId);
  if (numId >= 23 && numId <= 42) return 'kanji';

  // Pour les leçons vocabulary avec ID numérique (43-48)
  if (numId >= 43 && numId <= 48) return 'vocabulary';

  return 'default';
}

export default function GrammarTips({ visible, onClose, lessonType, lessonId, lessonTitle }) {
  const category = getGrammarCategory(lessonType, lessonId, lessonTitle);
  const data = GRAMMAR_DATA[category] || GRAMMAR_DATA.default;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{data.title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={true}
          >
            {data.sections.map((section, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.heading}>{section.heading}</Text>
                <Text style={styles.text}>{section.content}</Text>
              </View>
            ))}

            {/* Pro Tip */}
            <View style={styles.proTip}>
              <Text style={styles.proTipIcon}>💡</Text>
              <Text style={styles.proTipText}>
                Utilisez le bouton audio pour entendre la prononciation correcte !
              </Text>
            </View>

            {/* Footer - Maintenant DANS le ScrollView */}
            <TouchableOpacity style={styles.gotItButton} onPress={onClose}>
              <Text style={styles.gotItText}>Compris !</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    height: '85%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding * 1.5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SIZES.padding * 1.5,
    paddingBottom: 40,
  },
  section: {
    marginBottom: SIZES.margin * 1.5,
  },
  heading: {
    fontSize: FONTS.large,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SIZES.marginSmall,
  },
  text: {
    fontSize: FONTS.medium,
    color: COLORS.text,
    lineHeight: 24,
  },
  proTip: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary + '15',
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginTop: SIZES.margin,
    alignItems: 'center',
  },
  proTipIcon: {
    fontSize: 24,
    marginRight: SIZES.margin,
  },
  proTipText: {
    flex: 1,
    fontSize: FONTS.medium,
    color: COLORS.primary,
    fontWeight: '500',
  },
  gotItButton: {
    backgroundColor: COLORS.primary,
    marginTop: SIZES.margin * 2,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
  },
  gotItText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.background,
  },
});

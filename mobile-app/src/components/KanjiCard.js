/**
 * KanjiCard Component - Carte d'affichage des kanji
 * Affiche un kanji avec ses lectures, signification, exemples et mnémonique
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import audioService from '../services/audioService';
import { hiraganaToRomaji } from '../utils/kanaConverter';

export default function KanjiCard({ kanji, showNavigation = false, onNext, onPrevious, currentIndex, totalCount }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('info');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingExampleIndex, setPlayingExampleIndex] = useState(null);

  const TABS = [
    { id: 'info', label: t('kanji.info'), icon: '📝' },
    { id: 'examples', label: t('kanji.examples'), icon: '📖' },
    { id: 'mnemonic', label: t('kanji.mnemonic'), icon: '💡' },
  ];

  const handlePlayAudio = async () => {
    if (kanji.romaji) {
      setIsPlayingAudio(true);
      await audioService.play(kanji.romaji);
      setTimeout(() => setIsPlayingAudio(false), 800);
    }
  };

  const handlePlayExampleAudio = async (example, index) => {
    setPlayingExampleIndex(index);
    if (example.reading) {
      const romaji = hiraganaToRomaji(example.reading);
      if (romaji) {
        await audioService.play(romaji);
      }
    }
    setTimeout(() => setPlayingExampleIndex(null), 800);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <View style={styles.tabContent}>
            {/* Lectures ON */}
            <View style={styles.readingSection}>
              <Text style={styles.readingLabel}>{t('kanji.onReading')}</Text>
              <Text style={styles.readingValue}>
                {kanji.onyomi && kanji.onyomi.length > 0
                  ? kanji.onyomi.join('、')
                  : '-'}
              </Text>
            </View>

            {/* Lectures KUN */}
            <View style={styles.readingSection}>
              <Text style={styles.readingLabel}>{t('kanji.kunReading')}</Text>
              <Text style={styles.readingValue}>
                {kanji.kunyomi && kanji.kunyomi.length > 0
                  ? kanji.kunyomi.join('、')
                  : '-'}
              </Text>
            </View>

            {/* Signification */}
            <View style={styles.readingSection}>
              <Text style={styles.readingLabel}>{t('kanji.meaning')}</Text>
              <Text style={styles.meaningValue}>{kanji.meaning}</Text>
            </View>

            {/* Nombre de traits */}
            <View style={styles.strokesContainer}>
              <Text style={styles.strokesIcon}>✏️</Text>
              <Text style={styles.strokesText}>{t('kanji.strokes', { count: kanji.strokes })}</Text>
            </View>
          </View>
        );

      case 'examples':
        return (
          <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            {kanji.examples && kanji.examples.map((example, index) => (
              <View key={index} style={styles.exampleCard}>
                <View style={styles.exampleHeader}>
                  <Text style={styles.exampleWord}>{example.word}</Text>
                  <TouchableOpacity
                    style={styles.exampleAudioButton}
                    onPress={() => handlePlayExampleAudio(example, index)}
                  >
                    <Text style={styles.exampleAudioIcon}>
                      {playingExampleIndex === index ? '▶️' : '🔊'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.exampleReading}>{example.reading}</Text>
                <Text style={styles.exampleMeaning}>{example.meaning}</Text>
              </View>
            ))}
          </ScrollView>
        );

      case 'mnemonic':
        return (
          <View style={styles.tabContent}>
            <View style={styles.mnemonicCard}>
              <Text style={styles.mnemonicIcon}>💡</Text>
              <Text style={styles.mnemonicText}>{kanji.mnemonic}</Text>
            </View>
            <View style={styles.mnemonicTip}>
              <Text style={styles.tipLabel}>{t('kanji.tip')}</Text>
              <Text style={styles.tipText}>
                {t('kanji.tipText')}
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header avec navigation optionnelle */}
      {showNavigation && (
        <View style={styles.navigationHeader}>
          <TouchableOpacity
            style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
            onPress={onPrevious}
            disabled={currentIndex === 0}
          >
            <Text style={styles.navButtonText}>◀</Text>
          </TouchableOpacity>
          <Text style={styles.navCounter}>
            {`${currentIndex + 1}`} / {`${totalCount}`}
          </Text>
          <TouchableOpacity
            style={[styles.navButton, currentIndex === totalCount - 1 && styles.navButtonDisabled]}
            onPress={onNext}
            disabled={currentIndex === totalCount - 1}
          >
            <Text style={styles.navButtonText}>▶</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Kanji principal */}
      <View style={styles.kanjiSection}>
        <TouchableOpacity
          style={styles.audioButton}
          onPress={handlePlayAudio}
        >
          <Text style={styles.audioIcon}>{isPlayingAudio ? '▶️' : '🔊'}</Text>
        </TouchableOpacity>

        <Text style={styles.kanjiCharacter}>{kanji.kanji}</Text>
        <Text style={styles.kanjiMeaning}>{kanji.meaning}</Text>
      </View>

      {/* Onglets */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.tabActive,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contenu de l'onglet */}
      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.padding,
    marginVertical: SIZES.marginSmall,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin,
    paddingHorizontal: SIZES.paddingSmall,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    fontSize: FONTS.large,
    color: COLORS.primary,
  },
  navCounter: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  kanjiSection: {
    alignItems: 'center',
    paddingVertical: SIZES.padding,
    position: 'relative',
  },
  audioButton: {
    position: 'absolute',
    top: SIZES.padding,
    right: SIZES.padding,
    padding: 10,
    backgroundColor: COLORS.primary + '20',
    borderRadius: 25,
    zIndex: 10,
  },
  audioIcon: {
    fontSize: 24,
  },
  kanjiCharacter: {
    fontSize: 120,
    color: COLORS.text,
    lineHeight: 140,
  },
  kanjiMeaning: {
    fontSize: FONTS.xLarge,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: SIZES.marginSmall,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radius,
    padding: 4,
    marginVertical: SIZES.margin,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.paddingSmall,
    paddingHorizontal: SIZES.paddingSmall,
    borderRadius: SIZES.radiusSmall,
    gap: 4,
  },
  tabActive: {
    backgroundColor: COLORS.surface,
  },
  tabIcon: {
    fontSize: 16,
  },
  tabLabel: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: COLORS.text,
    fontWeight: '600',
  },
  contentContainer: {
    minHeight: 200,
  },
  tabContent: {
    paddingVertical: SIZES.paddingSmall,
  },
  readingSection: {
    marginBottom: SIZES.margin,
    padding: SIZES.paddingSmall,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radiusSmall,
  },
  readingLabel: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  readingValue: {
    fontSize: FONTS.xLarge,
    color: COLORS.text,
    fontWeight: '500',
  },
  meaningValue: {
    fontSize: FONTS.large,
    color: COLORS.primary,
    fontWeight: '600',
  },
  strokesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radiusSmall,
    gap: 8,
  },
  strokesIcon: {
    fontSize: 20,
  },
  strokesText: {
    fontSize: FONTS.medium,
    color: COLORS.text,
    fontWeight: '500',
  },
  exampleCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radiusSmall,
    padding: SIZES.padding,
    marginBottom: SIZES.marginSmall,
  },
  exampleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exampleWord: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  exampleAudioButton: {
    padding: 8,
    backgroundColor: COLORS.primary + '20',
    borderRadius: 15,
  },
  exampleAudioIcon: {
    fontSize: 16,
  },
  exampleReading: {
    fontSize: FONTS.large,
    color: COLORS.primary,
    marginTop: 4,
  },
  exampleMeaning: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  mnemonicCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radius,
    padding: SIZES.paddingLarge,
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  mnemonicIcon: {
    fontSize: 48,
    marginBottom: SIZES.margin,
  },
  mnemonicText: {
    fontSize: FONTS.large,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 28,
  },
  mnemonicTip: {
    backgroundColor: COLORS.primary + '10',
    borderRadius: SIZES.radiusSmall,
    padding: SIZES.padding,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  tipLabel: {
    fontSize: FONTS.small,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipText: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
});

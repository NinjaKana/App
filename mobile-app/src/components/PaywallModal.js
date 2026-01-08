/**
 * Paywall Modal - Nouveau Design Figma
 * Interface d'achat Premium avec features et pricing
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import {
  getOfferings,
  purchasePackage,
  restorePurchases,
  FREE_LIMITS,
  DISPLAY_PRICES,
} from '../services/premiumService';
import { COLORS, FONTS, SIZES } from '../styles/theme';

// Features Premium - Fonctionnalités réelles
const PREMIUM_FEATURES = [
  {
    icon: '📚',
    title: 'Apprentissage illimité',
    description: 'Exercices et révisions sans limite quotidienne',
  },
  {
    icon: '🈳',
    title: 'Tous les Kanji',
    description: '100 kanji essentiels du JLPT N5',
  },
  {
    icon: '🧠',
    title: 'Mémorisation optimale',
    description: 'SRS illimité pour ancrer les connaissances',
  },
  {
    icon: '❤️',
    title: 'Vies illimitées',
    description: 'Apprends sans interruption, sans attendre',
  },
  {
    icon: '🚫',
    title: 'Sans publicité',
    description: 'Concentration maximale',
  },
  {
    icon: '⭐',
    title: 'Soutenir le projet',
    description: 'Aidez-nous à ajouter plus de contenu',
  },
];

export default function PaywallModal({ visible, onClose, onPurchaseSuccess }) {
  const [offerings, setOfferings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  useEffect(() => {
    if (visible) {
      loadOfferings();
    }
  }, [visible]);

  const loadOfferings = async () => {
    setLoading(true);
    const offers = await getOfferings();
    setOfferings(offers);
    setLoading(false);
  };

  const handlePurchase = async (packageToPurchase) => {
    if (!packageToPurchase) {
      Alert.alert('Erreur', 'Offre non disponible');
      return;
    }

    setPurchasing(true);
    const result = await purchasePackage(packageToPurchase);
    setPurchasing(false);

    if (result.success) {
      Alert.alert(
        '🎉 Bienvenue Premium !',
        'Merci pour votre abonnement. Profitez de toutes les fonctionnalités !',
        [{
          text: 'Super !',
          onPress: () => {
            onPurchaseSuccess?.();
            onClose();
          }
        }]
      );
    } else if (!result.cancelled) {
      Alert.alert('Erreur', result.error || 'Une erreur est survenue');
    }
  };

  const handleRestore = async () => {
    setPurchasing(true);
    const result = await restorePurchases();
    setPurchasing(false);

    if (result.success && result.isPremium) {
      Alert.alert(
        '✅ Achats restaurés',
        'Votre abonnement Premium a été restauré !',
        [{
          text: 'Super !',
          onPress: () => {
            onPurchaseSuccess?.();
            onClose();
          }
        }]
      );
    } else if (result.success) {
      Alert.alert('Aucun achat', 'Aucun abonnement actif trouvé.');
    } else {
      Alert.alert('Erreur', result.error || 'Impossible de restaurer les achats');
    }
  };

  const plans = [
    {
      id: 'monthly',
      name: 'Mensuel',
      price: offerings?.monthly?.product?.priceString || DISPLAY_PRICES.MONTHLY,
      period: '/mois',
      package: offerings?.monthly,
    },
    {
      id: 'yearly',
      name: 'Annuel',
      price: offerings?.yearly?.product?.priceString || DISPLAY_PRICES.YEARLY,
      period: '/an',
      package: offerings?.yearly,
      savings: '-58%',
      popular: true,
    },
    {
      id: 'lifetime',
      name: 'À vie',
      price: offerings?.lifetime?.product?.priceString || DISPLAY_PRICES.LIFETIME,
      period: 'une fois',
      package: offerings?.lifetime,
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerTitle}>Premium</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero - Design Figma */}
          <View style={styles.hero}>
            <View style={styles.heroIcon}>
              <Text style={styles.heroEmoji}>👑</Text>
            </View>
            <Text style={styles.heroTitle}>Passer Premium</Text>
            <Text style={styles.heroSubtitle}>
              Débloquez toutes les fonctionnalités et maîtrisez le japonais
            </Text>
          </View>

          {/* Features Grid - Design Figma */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>✨ Fonctionnalités incluses</Text>

            <View style={styles.featuresGrid}>
              {PREMIUM_FEATURES.map((feature, index) => (
                <View key={index} style={styles.featureCard}>
                  <View style={styles.featureIcon}>
                    <Text style={styles.featureEmoji}>{feature.icon}</Text>
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.description}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Pricing Plans - Design Figma */}
          <View style={styles.plansSection}>
            <Text style={styles.sectionTitle}>💳 Choisissez votre plan</Text>

            {loading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <View style={styles.plansContainer}>
                {plans.map((plan) => (
                  <TouchableOpacity
                    key={plan.id}
                    style={[
                      styles.planCard,
                      selectedPlan === plan.id && styles.planCardSelected,
                    ]}
                    onPress={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>Populaire</Text>
                      </View>
                    )}

                    {plan.savings && (
                      <View style={styles.savingsBadge}>
                        <Text style={styles.savingsText}>{plan.savings}</Text>
                      </View>
                    )}

                    <Text style={styles.planName}>{plan.name}</Text>
                    <Text style={styles.planPrice}>{plan.price}</Text>
                    <Text style={styles.planPeriod}>{plan.period}</Text>

                    {selectedPlan === plan.id && (
                      <View style={styles.checkBadge}>
                        <Text style={styles.checkIcon}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bottom Actions - Design Figma */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={[styles.purchaseButton, purchasing && styles.buttonDisabled]}
            onPress={() => {
              const plan = plans.find(p => p.id === selectedPlan);
              handlePurchase(plan?.package);
            }}
            disabled={purchasing || loading}
          >
            {purchasing ? (
              <ActivityIndicator color={COLORS.text} />
            ) : (
              <Text style={styles.purchaseButtonText}>
                Devenir Premium
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.restoreButton}
            onPress={handleRestore}
            disabled={purchasing}
          >
            <Text style={styles.restoreText}>Restaurer mes achats</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            L'abonnement se renouvelle automatiquement. Annulation possible à tout moment.
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.screenPadding,
  },
  headerSpacer: {
    width: 40,
  },
  headerTitle: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 20,
    color: COLORS.text,
    fontWeight: 'bold',
  },

  // Content
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.screenPadding,
    paddingBottom: 20,
  },

  // Hero
  hero: {
    alignItems: 'center',
    marginBottom: SIZES.margin * 2,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  heroEmoji: {
    fontSize: 40,
  },
  heroTitle: {
    fontSize: FONTS.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.marginSmall,
  },
  heroSubtitle: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SIZES.padding,
  },

  // Features
  featuresSection: {
    marginBottom: SIZES.margin * 2,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.marginSmall,
  },
  featureCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.marginSmall,
  },
  featureEmoji: {
    fontSize: 22,
  },
  featureTitle: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },

  // Plans
  plansSection: {
    marginBottom: SIZES.margin,
  },
  plansContainer: {
    flexDirection: 'row',
    gap: SIZES.marginSmall,
  },
  planCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  planCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  popularText: {
    fontSize: FONTS.tiny,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  savingsBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  savingsText: {
    fontSize: FONTS.tiny,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  planName: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SIZES.marginSmall,
    marginBottom: 4,
  },
  planPrice: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  planPeriod: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },
  checkBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  // Bottom Actions
  bottomActions: {
    padding: SIZES.screenPadding,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  purchaseButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.2,
    alignItems: 'center',
    marginBottom: SIZES.marginSmall,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  purchaseButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  restoreButton: {
    padding: SIZES.paddingSmall,
    alignItems: 'center',
    marginBottom: SIZES.marginSmall,
  },
  restoreText: {
    fontSize: FONTS.medium,
    color: COLORS.primary,
  },
  termsText: {
    fontSize: FONTS.tiny,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
});

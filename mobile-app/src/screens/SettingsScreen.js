/**
 * Settings Screen - Nouveau Design Figma
 * Paramètres avec liste d'options et toggles
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { FONTS, SIZES } from '../styles/theme';
import {
  getNotificationSettings,
  saveNotificationSettings,
  requestPermissions,
  isNotificationAvailable,
  getPermissionStatus,
  sendTestNotification,
  cancelAllNotifications,
  DEFAULT_SETTINGS,
} from '../services/notificationService';
import { getVacationStats, activateVacationMode } from '../services/streakSystem';
import { clearAll } from '../services/storage';

export default function SettingsScreen({ navigation }) {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const [notifSettings, setNotifSettings] = useState(DEFAULT_SETTINGS);
  const [notifPermission, setNotifPermission] = useState('unknown');
  const [vacationStats, setVacationStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const styles = createStyles(colors);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await getNotificationSettings();
      setNotifSettings(settings);

      const permStatus = await getPermissionStatus();
      setNotifPermission(permStatus.status);

      const vacation = await getVacationStats();
      setVacationStats(vacation);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (key, value) => {
    const newSettings = { ...notifSettings, [key]: value };
    setNotifSettings(newSettings);
    await saveNotificationSettings(newSettings);
  };

  const handleRequestPermissions = async () => {
    const result = await requestPermissions();

    if (result.granted) {
      setNotifPermission('granted');
      Alert.alert('Succès', 'Notifications activées !');
    } else if (result.reason === 'denied') {
      Alert.alert(
        'Permission refusée',
        'Activez les notifications dans les paramètres de votre téléphone.',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Ouvrir Paramètres', onPress: () => Linking.openSettings() },
        ]
      );
    }
  };

  const handleVacationMode = () => {
    if (!vacationStats) return;

    if (vacationStats.isActive) {
      Alert.alert('Mode Vacances', 'Tu es déjà en mode vacances !');
      return;
    }

    if (vacationStats.remainingDays <= 0) {
      Alert.alert(
        'Plus de jours disponibles',
        'Tu as utilisé tous tes jours de vacances cette année.'
      );
      return;
    }

    Alert.alert(
      'Mode Vacances',
      `Active le mode vacances pour protéger ton streak.\n\nJours disponibles : ${vacationStats.remainingDays}/14`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: '3 jours', onPress: () => activateVacation(3) },
        { text: '7 jours', onPress: () => activateVacation(7) },
      ]
    );
  };

  const activateVacation = async (days) => {
    const result = await activateVacationMode(days);
    if (result.success) {
      Alert.alert('Activé !', result.message);
      loadSettings();
    } else {
      Alert.alert('Erreur', result.message);
    }
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Réinitialiser la progression',
      'Cette action est IRRÉVERSIBLE. Toute ta progression sera perdue.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: confirmReset,
        },
      ]
    );
  };

  const confirmReset = () => {
    Alert.alert(
      'Confirmer',
      'Es-tu vraiment sûr(e) ? Cette action ne peut pas être annulée.',
      [
        { text: 'Non', style: 'cancel' },
        {
          text: 'Oui, réinitialiser',
          style: 'destructive',
          onPress: async () => {
            await clearAll();
            await cancelAllNotifications();
            Alert.alert('Terminé', 'Ta progression a été réinitialisée.');
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Supprimer mon compte',
      'Cette action supprimera définitivement toutes tes données :\n\n• Progression et statistiques\n• Badges et récompenses\n• Préférences et paramètres\n\nNote : NinjaKana ne stocke aucune donnée personnelle sur nos serveurs. Toutes tes données sont stockées localement sur ton appareil.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: confirmDeleteAccount,
        },
      ]
    );
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Confirmer la suppression',
      'Es-tu vraiment sûr(e) ? Cette action est irréversible.',
      [
        { text: 'Non', style: 'cancel' },
        {
          text: 'Oui, supprimer mon compte',
          style: 'destructive',
          onPress: async () => {
            await clearAll();
            await cancelAllNotifications();
            Alert.alert(
              'Compte supprimé',
              'Toutes tes données ont été supprimées de cet appareil.',
              [{ text: 'OK' }]
            );
          },
        },
      ]
    );
  };

  const handleContact = () => {
    const email = 'contact.ninjakana@gmail.com';
    const subject = 'Support - NinjaKana';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Email', `Contacte-nous : ${email}`);
    });
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Header - Design Figma */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Paramètres</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Appearance Section - NEW */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Apparence</Text>

          <SettingToggle
            colors={colors}
            icon={isDarkMode ? "🌙" : "☀️"}
            title="Mode sombre"
            subtitle={isDarkMode ? "Activé" : "Désactivé"}
            value={isDarkMode}
            onToggle={toggleTheme}
            isLast
          />
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Notifications</Text>

          {!isNotificationAvailable() || notifPermission !== 'granted' ? (
            <TouchableOpacity
              style={styles.permissionButton}
              onPress={handleRequestPermissions}
            >
              <Text style={styles.permissionIcon}>🔔</Text>
              <Text style={styles.permissionText}>Activer les notifications</Text>
              <Text style={styles.permissionArrow}>›</Text>
            </TouchableOpacity>
          ) : null}

          <SettingToggle
            colors={colors}
            icon="📱"
            title="Notifications"
            subtitle="Activer toutes les notifications"
            value={notifSettings.enabled}
            onToggle={(v) => handleToggle('enabled', v)}
            disabled={notifPermission !== 'granted'}
          />

          <SettingToggle
            colors={colors}
            icon="🔥"
            title="Rappel de streak"
            subtitle="Alerte avant la fin du streak"
            value={notifSettings.streakReminder}
            onToggle={(v) => handleToggle('streakReminder', v)}
            disabled={!notifSettings.enabled}
          />

          <SettingToggle
            colors={colors}
            icon="⏰"
            title="Rappel quotidien"
            subtitle={`Tous les jours à ${notifSettings.dailyReminderTime.hour}h${notifSettings.dailyReminderTime.minute.toString().padStart(2, '0')}`}
            value={notifSettings.dailyReminder}
            onToggle={(v) => handleToggle('dailyReminder', v)}
            disabled={!notifSettings.enabled}
          />

          <SettingToggle
            colors={colors}
            icon="🔊"
            title="Son"
            subtitle="Son des notifications"
            value={notifSettings.soundEnabled}
            onToggle={(v) => handleToggle('soundEnabled', v)}
            disabled={!notifSettings.enabled}
            isLast
          />
        </View>

        {/* Streak Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 Streak</Text>

          <SettingLink
            colors={colors}
            icon="🏖️"
            title="Mode Vacances"
            subtitle={vacationStats?.isActive
              ? 'Actuellement actif'
              : `${vacationStats?.remainingDays || 0} jours disponibles`}
            onPress={handleVacationMode}
            isLast
          />
        </View>

        {/* Audio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔊 Audio</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoEmoji}>🎌</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Voix japonaise</Text>
              <Text style={styles.infoSubtitle}>VOICEVOX - 春日部つむぎ</Text>
            </View>
          </View>
        </View>

        {/* App Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Application</Text>

          <SettingLink
            colors={colors}
            icon="✉️"
            title="Nous contacter"
            subtitle="Signaler un bug ou suggérer une amélioration"
            onPress={handleContact}
          />

          <SettingLink
            colors={colors}
            icon="🔒"
            title="Politique de confidentialité"
            onPress={() => Linking.openURL('https://ninjakana.github.io/App/privacy-policy.html')}
            isLast
          />
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.error }]}>⚠️ Zone de danger</Text>

          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleResetProgress}
          >
            <View style={[styles.dangerIcon, { backgroundColor: colors.error + '20' }]}>
              <Text style={styles.dangerEmoji}>🔄</Text>
            </View>
            <View style={styles.dangerContent}>
              <Text style={[styles.dangerText, { color: colors.error }]}>Réinitialiser la progression</Text>
              <Text style={styles.dangerSubtext}>Recommencer à zéro</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleDeleteAccount}
          >
            <View style={[styles.dangerIcon, { backgroundColor: colors.error + '20' }]}>
              <Text style={styles.dangerEmoji}>🗑️</Text>
            </View>
            <View style={styles.dangerContent}>
              <Text style={[styles.dangerText, { color: colors.error }]}>Supprimer mon compte</Text>
              <Text style={styles.dangerSubtext}>Effacer toutes mes données</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.copyright}>© 2026 NinjaKana</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Setting Toggle Component
function SettingToggle({ colors, icon, title, subtitle, value, onToggle, disabled, isLast }) {
  const styles = createStyles(colors);

  return (
    <View style={[styles.settingRow, isLast && styles.settingRowLast, disabled && styles.settingDisabled]}>
      <View style={styles.settingIcon}>
        <Text style={styles.settingEmoji}>{icon}</Text>
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, disabled && styles.textDisabled]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.settingSubtitle, disabled && styles.textDisabled]}>{subtitle}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        disabled={disabled}
        trackColor={{ false: colors.border, true: colors.primary + '80' }}
        thumbColor={value ? colors.primary : colors.textSecondary}
      />
    </View>
  );
}

// Setting Link Component
function SettingLink({ colors, icon, title, subtitle, onPress, isLast }) {
  const styles = createStyles(colors);

  return (
    <TouchableOpacity
      style={[styles.settingRow, isLast && styles.settingRowLast]}
      onPress={onPress}
    >
      <View style={styles.settingIcon}>
        <Text style={styles.settingEmoji}>{icon}</Text>
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <Text style={styles.settingArrow}>›</Text>
    </TouchableOpacity>
  );
}

// Dynamic styles based on theme
const createStyles = (colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.text,
    fontSize: FONTS.medium,
  },

  // Header - Design Figma
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.screenPadding,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: colors.text,
  },
  headerTitle: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerSpacer: {
    width: 40,
  },

  // Section
  section: {
    backgroundColor: colors.surface,
    marginHorizontal: SIZES.screenPadding,
    marginBottom: SIZES.margin,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: SIZES.margin,
  },

  // Permission Button
  permissionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '20',
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin,
  },
  permissionIcon: {
    fontSize: 24,
    marginRight: SIZES.margin,
  },
  permissionText: {
    flex: 1,
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: colors.primary,
  },
  permissionArrow: {
    fontSize: 24,
    color: colors.primary,
  },

  // Setting Row
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingRowLast: {
    borderBottomWidth: 0,
  },
  settingDisabled: {
    opacity: 0.5,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.margin,
  },
  settingEmoji: {
    fontSize: 20,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: colors.text,
  },
  settingSubtitle: {
    fontSize: FONTS.small,
    color: colors.textSecondary,
    marginTop: 2,
  },
  settingArrow: {
    fontSize: 24,
    color: colors.textMuted,
  },
  textDisabled: {
    color: colors.textMuted,
  },

  // Info Row
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.paddingSmall,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.margin,
  },
  infoEmoji: {
    fontSize: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: colors.text,
  },
  infoSubtitle: {
    fontSize: FONTS.small,
    color: colors.textSecondary,
  },

  // Danger Zone
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
  },
  dangerIcon: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusSmall,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.margin,
  },
  dangerEmoji: {
    fontSize: 20,
  },
  dangerContent: {
    flex: 1,
  },
  dangerText: {
    fontSize: FONTS.medium,
    fontWeight: '600',
  },
  dangerSubtext: {
    fontSize: FONTS.small,
    color: colors.textSecondary,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: SIZES.paddingLarge,
  },
  version: {
    fontSize: FONTS.small,
    color: colors.textSecondary,
  },
  copyright: {
    fontSize: FONTS.tiny,
    color: colors.textMuted,
    marginTop: 4,
  },
});

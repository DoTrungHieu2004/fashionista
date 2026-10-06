import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthInput } from '@/components/auth/AuthInput';
import { CustomAlert } from '@/components/CustomAlert';
import { type AuthStackScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme/useTheme';

import { authStyles } from './authStyles';

type Props = AuthStackScreenProps<'ForgotPassword'>;

export function ForgotPasswordScreen({ navigation }: Props) {
  const { colors, neutral, fonts, spacing, radius, staticImages } = useTheme();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({ title: '', message: '' });

  const showAlert = (title: string, message: string) => {
    setAlertData({ title, message });
    setAlertVisible(true);
  };

  const handleSendResetLink = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return showAlert(t('validation.invalidEmail.title'), t('validation.invalidEmail.message'));
    }

    // Mock token and navigate
    const mockToken = 'mock-token-123';
    navigation.navigate('ResetPassword', { token: mockToken });
  };

  return (
    <SafeAreaView style={[authStyles.container, { backgroundColor: colors.background }]}>
      {/* Top bar */}
      <View
        style={[
          styles.flexStart,
          { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backButton, { padding: spacing.sm }]}
        >
          <Feather name="arrow-left" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexView}
      >
        <View
          style={[authStyles.scrollContent, styles.centerJustifyContent, { padding: spacing.lg }]}
        >
          {/* Hero image */}
          <Image
            source={staticImages.heroForgotPassImage}
            style={[styles.heroImage, { borderRadius: radius.lg, marginBottom: spacing.lg }]}
            resizeMode="cover"
          />

          <Text
            style={[
              authStyles.title,
              styles.centerTextAlign,
              {
                color: colors.onSurface,
                fontFamily: fonts.montserrat.semibold,
                marginBottom: spacing.sm,
              },
            ]}
          >
            {t('common.titles.forgot-password')}
          </Text>
          <Text
            style={[
              authStyles.subtitle,
              styles.centerTextAlign,
              {
                color: colors.onSurfaceVariant,
                fontFamily: fonts.inter.regular,
                marginBottom: spacing.marginTablet,
              },
            ]}
          >
            {t('common.subtitles.forgot-password')}
          </Text>

          <AuthInput
            label={t('labels.email-address')}
            placeholder="name@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity
            style={[authStyles.primaryButton, { backgroundColor: colors.primary }]}
            onPress={handleSendResetLink}
          >
            <Text
              style={[
                authStyles.primaryButtonText,
                { color: neutral[50], fontFamily: fonts.inter.semibold, marginRight: spacing.sm },
              ]}
            >
              {t('buttons.send-reset-link')}
            </Text>
            <Feather name="send" size={18} color={neutral[50]} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <CustomAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexView: { flex: 1 },
  flexStart: { alignItems: 'flex-start' },
  backButton: { marginLeft: -8, alignSelf: 'flex-start' },
  centerJustifyContent: { justifyContent: 'center' },
  centerTextAlign: { textAlign: 'center' },
  heroImage: { width: '100%', height: 180 },
});

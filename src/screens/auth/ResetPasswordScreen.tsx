import { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthInput } from '@/components/auth/AuthInput';
import { PasswordConditionsBox } from '@/components/auth/PasswordConditionsBox';
import { PasswordStrengthMeter } from '@/components/auth/PasswordStrengthMeter';
import { ResetSuccessDialog } from '@/components/auth/ResetSuccessDialog';
import { type AuthStackScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme/useTheme';
import { withOpacity } from '@/utils/color';

import { authStyles } from './authStyles';

type Props = AuthStackScreenProps<'ResetPassword'>;

export function ResetPasswordScreen({ route, navigation }: Props) {
  const { colors, neutral, fonts, spacing, radius, staticImages } = useTheme();
  const { t } = useTranslation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);

  const { token } = route.params;

  // Validate form
  const hasMinLength = password.length >= 8;
  const hasSpecialOrNum = /[0-9!@#$%^&*]/.test(password);
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isFormValid = hasMinLength && hasSpecialOrNum && passwordsMatch;

  const handleResetPassword = () => {
    if (!isFormValid) return;
    console.log('Reset password with token:', route.params?.token);
    setSuccessDialogVisible(true);
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
          {/* Hero image with gradient */}
          <View
            style={[styles.heroContainer, { borderRadius: radius.lg, marginBottom: spacing.lg }]}
          >
            <ImageBackground
              source={staticImages.heroResetPassImage}
              style={styles.heroImage}
              resizeMode="cover"
            >
              <LinearGradient
                colors={[withOpacity(colors.primary, 0), withOpacity(colors.primary, 0.4)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.gradientOverlay, { padding: spacing.md }]}
              >
                <Text
                  style={[
                    authStyles.title,
                    { color: neutral[50], fontFamily: fonts.montserrat.bold },
                  ]}
                >
                  {t('common.titles.reset-password')}
                </Text>
              </LinearGradient>
            </ImageBackground>
          </View>

          <Text
            style={[
              authStyles.subtitle,
              {
                color: colors.onSurfaceVariant,
                fontFamily: fonts.inter.regular,
                marginBottom: spacing.gutter,
              },
            ]}
          >
            {t('common.subtitles.reset-password')}
          </Text>

          <AuthInput
            label={t('labels.new-password')}
            placeholder="••••••••"
            isPassword
            value={password}
            onChangeText={setPassword}
          />

          <PasswordStrengthMeter password={password} />

          <AuthInput
            label={t('labels.confirm-password')}
            placeholder="••••••••"
            isPassword
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <PasswordConditionsBox password={password} confirmPassword={confirmPassword} />

          <TouchableOpacity
            style={[
              authStyles.primaryButton,
              { backgroundColor: colors.primary },
              !isFormValid && { backgroundColor: withOpacity(colors.surfaceDim, 0.5) },
            ]}
            onPress={handleResetPassword}
            disabled={!isFormValid}
          >
            <Text
              style={[
                authStyles.primaryButtonText,
                { color: neutral[50], fontFamily: fonts.inter.semibold },
              ]}
            >
              {t('buttons.reset-password')}
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={[styles.footerContainer, { marginTop: spacing.md }]}>
            <Text
              style={[
                styles.footerText,
                { color: colors.onSurfaceVariant, fontFamily: fonts.inter.regular },
              ]}
            >
              {t('common.havingTrouble')}
            </Text>
            <TouchableOpacity onPress={() => console.log('Contact support')}>
              <Text
                style={[
                  styles.supportLink,
                  { color: colors.primary, fontFamily: fonts.inter.bold },
                ]}
              >
                {t('links.contact-support')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      <ResetSuccessDialog
        visible={successDialogVisible}
        onGoToLogin={() => {
          setSuccessDialogVisible(false);
          navigation.navigate('Login');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexView: { flex: 1 },
  flexStart: { alignItems: 'flex-start' },
  backButton: { marginLeft: -8, alignSelf: 'flex-start' },
  centerJustifyContent: { justifyContent: 'center' },
  heroContainer: { overflow: 'hidden' },
  heroImage: { width: '100%', height: 200, justifyContent: 'flex-end' },
  gradientOverlay: { flex: 1, justifyContent: 'flex-end' },
  footerContainer: { alignItems: 'center', gap: 4 },
  footerText: { fontSize: 14, lineHeight: 20 },
  supportLink: { fontSize: 12, lineHeight: 16, letterSpacing: 0.6 },
});

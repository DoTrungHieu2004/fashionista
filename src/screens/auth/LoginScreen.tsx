import { useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Trans, useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthInput } from '@/components/auth/AuthInput';
import { CustomAlert } from '@/components/CustomAlert';
import { type AuthStackCompositeScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme/useTheme';
import { withOpacity } from '@/utils/color';

import { authStyles } from './authStyles';

type Props = AuthStackCompositeScreenProps<'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { colors, neutral, images, staticImages, spacing, radius, fonts } = useTheme();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({ title: '', message: '' });

  const showAlert = (title: string, message: string) => {
    setAlertData({ title, message });
    setAlertVisible(true);
  };

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return showAlert(t('validation.missingEmail.title'), t('validation.missingEmail.message'));
    }
    if (!emailRegex.test(email)) {
      return showAlert(t('validation.invalidEmail.title'), t('validation.invalidEmail.message'));
    }
    if (!password) {
      return showAlert(
        t('validation.missingPassword.title'),
        t('validation.missingPassword.message'),
      );
    }

    // Proceed with login logic
    console.log('Login:', { email, password });
    navigation.replace('Main');
  };

  return (
    <ImageBackground
      source={images.gradientBackground}
      style={authStyles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.safeArea}
        >
          <ScrollView
            contentContainerStyle={[
              authStyles.scrollContent,
              styles.centerJustifyContent,
              { padding: spacing.lg },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {/* Transparent container */}
            <View
              style={[
                styles.transparentCard,
                {
                  backgroundColor: withOpacity(colors.surfaceContainerLowest, 0.4),
                  borderRadius: radius.md,
                  padding: spacing.lg,
                },
              ]}
            >
              <Text
                style={[
                  styles.appName,
                  styles.centerTextAlign,
                  {
                    color: colors.primary,
                    fontFamily: fonts.montserrat.bold,
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                Fashionista
              </Text>
              <Text
                style={[
                  authStyles.title,
                  styles.centerTextAlign,
                  {
                    color: colors.onSurface,
                    fontFamily: fonts.montserrat.bold,
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                {t('common.titles.login')}
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
                {t('common.subtitles.login')}
              </Text>

              <AuthInput
                label={t('labels.email-address')}
                placeholder="name@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <AuthInput
                label={t('labels.password')}
                placeholder="••••••••"
                isPassword
                value={password}
                onChangeText={setPassword}
                rightLinkText={t('links.forgot-password')}
                onRightLinkPress={() => navigation.navigate('ForgotPassword')}
              />

              <TouchableOpacity
                style={[
                  authStyles.primaryButton,
                  { backgroundColor: colors.primary, marginTop: spacing.sm, gap: spacing.sm },
                ]}
                onPress={handleLogin}
              >
                <Text
                  style={[
                    authStyles.primaryButtonText,
                    { color: neutral[50], fontFamily: fonts.inter.semibold },
                  ]}
                >
                  {t('buttons.login')}
                </Text>
              </TouchableOpacity>

              {/* Social logins */}
              <View style={[authStyles.dividerContainer, { marginVertical: spacing.lg }]}>
                <View
                  style={[authStyles.dividerLine, { backgroundColor: colors.outlineVariant }]}
                />
                <Text
                  style={[
                    authStyles.dividerText,
                    { color: colors.outline, fontFamily: fonts.inter.medium },
                  ]}
                >
                  {t('common.divider')}
                </Text>
                <View
                  style={[authStyles.dividerLine, { backgroundColor: colors.outlineVariant }]}
                />
              </View>

              <View
                style={[authStyles.socialContainer, { gap: spacing.md, marginTop: spacing.sm }]}
              >
                <TouchableOpacity
                  style={[
                    authStyles.socialButton,
                    { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceBright },
                  ]}
                >
                  <Image source={staticImages.googleIcon} style={authStyles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    authStyles.socialButton,
                    { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceBright },
                  ]}
                >
                  <Image source={staticImages.facebookIcon} style={authStyles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    authStyles.socialButton,
                    { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceBright },
                  ]}
                >
                  <Image source={staticImages.appleIcon} style={authStyles.socialIcon} />
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <Text
                style={[
                  styles.footerText,
                  {
                    color: colors.onSurfaceVariant,
                    fontFamily: fonts.inter.regular,
                    marginTop: spacing.lg,
                  },
                ]}
              >
                <Trans
                  i18nKey="links.register"
                  components={[
                    <Text
                      key="register-link"
                      style={[styles.linkText, { color: colors.primary }]}
                      onPress={() => navigation.navigate('Register')}
                    />,
                  ]}
                />
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <CustomAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onClose={() => setAlertVisible(false)}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  centerTextAlign: { textAlign: 'center' },
  centerJustifyContent: { justifyContent: 'center' },
  transparentCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  appName: { fontSize: 28, lineHeight: 36 },
  footerText: { fontSize: 16, lineHeight: 24, textAlign: 'center' },
  linkText: { textDecorationLine: 'underline' },
});

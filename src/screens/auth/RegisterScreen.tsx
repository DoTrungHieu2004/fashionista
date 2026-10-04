import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Checkbox from 'expo-checkbox';

import { Feather } from '@expo/vector-icons';
import { Trans, useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthInput } from '@/components/auth/AuthInput';
import { PasswordConditionsBox } from '@/components/auth/PasswordConditionsBox';
import { PasswordRulesDialog } from '@/components/auth/PasswordRulesDialog';
import { CustomAlert } from '@/components/CustomAlert';
import { fonts } from '@/constants/theme/fonts';
import { type AuthStackScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme/useTheme';

import { authStyles } from './authStyles';

type Props = AuthStackScreenProps<'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { colors, neutral, spacing, staticImages } = useTheme();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({ title: '', message: '' });
  const [rulesVisible, setRulesVisible] = useState(false);

  const showAlert = (title: string, message: string) => {
    setAlertData({ title, message });
    setAlertVisible(true);
  };

  const handleRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      return showAlert(t('validation.invalidEmail.title'), t('validation.invalidEmail.message-2'));
    }

    const hasMinLength = password.length >= 8;
    const hasSpecialOrNum = /[0-9!@#$%^&*]/.test(password);
    const passwordsMatch = password === confirmPassword && password.length > 0;

    if (!hasMinLength || !hasSpecialOrNum || !passwordsMatch) {
      return showAlert(
        t('validation.invalidPassword.title'),
        t('validation.invalidPassword.message'),
      );
    }

    if (!agreed) {
      return showAlert(t('validation.termsRequired.title'), t('validation.termsRequired.message'));
    }

    // Proceed with registration logic
    console.log('Register:', { email, password });
  };

  return (
    <SafeAreaView style={[authStyles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={authStyles.container}
      >
        {/* Top bar */}
        <View
          style={{
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.md,
            paddingBottom: spacing.sm,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backButton, { padding: spacing.sm }]}
          >
            <Feather name="arrow-left" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={[authStyles.scrollContent, { padding: spacing.lg }]}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={[
              authStyles.title,
              {
                color: colors.onSurface,
                fontFamily: fonts.montserrat.semibold,
                marginBottom: spacing.sm,
              },
            ]}
          >
            {t('common.titles.register')}
          </Text>
          <Text
            style={[
              authStyles.subtitle,
              {
                color: colors.onSurfaceVariant,
                fontFamily: fonts.inter.regular,
                marginBottom: spacing.lg,
              },
            ]}
          >
            {t('common.subtitles.register')}
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
            rightLinkText={t('links.password-rules')}
            onRightLinkPress={() => setRulesVisible(true)}
          />

          <AuthInput
            label={t('labels.confirm-password')}
            placeholder="••••••••"
            isPassword
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <PasswordConditionsBox password={password} confirmPassword={confirmPassword} />

          {/* Terms checkbox */}
          <View style={[styles.checkboxContainer, { marginBottom: spacing.lg }]}>
            <Checkbox
              value={agreed}
              onValueChange={setAgreed}
              color={agreed ? colors.primaryContainer : undefined}
              style={[
                styles.checkbox,
                {
                  borderColor: colors.outlineVariant,
                  backgroundColor: colors.surfaceContainerLowest,
                },
              ]}
            />
            <Text
              style={[
                styles.checkboxContainer,
                { color: colors.onSurfaceVariant, fontFamily: fonts.inter.regular },
              ]}
            >
              <Trans
                i18nKey="links.terms"
                components={[
                  <Text
                    key="terms-of-service"
                    style={[
                      styles.checkboxText,
                      { color: colors.primary, fontFamily: fonts.inter.medium },
                    ]}
                    onPress={() => console.log('Terms of Service')}
                  />,
                  <Text
                    key="privacy-policy"
                    style={[
                      styles.checkboxText,
                      { color: colors.primary, fontFamily: fonts.inter.medium },
                    ]}
                    onPress={() => console.log('Privacy Policy')}
                  />,
                ]}
              />
            </Text>
          </View>

          <TouchableOpacity
            style={[
              authStyles.primaryButton,
              { backgroundColor: colors.primary, marginTop: spacing.sm, gap: spacing.sm },
            ]}
            onPress={handleRegister}
          >
            <Text
              style={[
                authStyles.primaryButtonText,
                { color: neutral[50], fontFamily: fonts.inter.semibold },
              ]}
            >
              {t('buttons.register')}
            </Text>
            <Feather name="chevron-right" size={20} color={neutral[50]} />
          </TouchableOpacity>

          {/* Social logins */}
          <View style={[authStyles.dividerContainer, { marginVertical: spacing.lg }]}>
            <View style={[authStyles.dividerLine, { backgroundColor: colors.outlineVariant }]} />
            <Text
              style={[
                authStyles.dividerText,
                { color: colors.outline, fontFamily: fonts.inter.medium },
              ]}
            >
              {t('common.divider')}
            </Text>
            <View style={[authStyles.dividerLine, { backgroundColor: colors.outlineVariant }]} />
          </View>

          <View style={[authStyles.socialContainer, { gap: spacing.md, marginTop: spacing.sm }]}>
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
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onClose={() => setAlertVisible(false)}
      />

      <PasswordRulesDialog visible={rulesVisible} onClose={() => setRulesVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: { marginLeft: -8 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  checkbox: { marginTop: 2, borderRadius: 4 },
  checkboxText: { flex: 1, fontSize: 14, lineHeight: 20 },
});

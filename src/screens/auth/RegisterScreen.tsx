import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Trans, useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme/ThemeProvider';
import { APPLE_ICON, FACEBOOK_ICON, GOOGLE_ICON } from '../../constants/theme/images';

import LabeledInput from '../../components/LabeledInput';
import ValidationErrorModal from '../../components/modals/ValidationErrorModal';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { colours, neutrals, spacing, fonts, rounded } = useTheme();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securePass, setSecurePass] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorModal, setErrorModal] = useState({ visible: false, message: '' });

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      setErrorModal({ visible: true, message: t('error.allFieldsMissing') });
      return;
    }
    if (!email.includes('@')) {
      setErrorModal({ visible: true, message: t('error.emailWrongFormat') });
      return;
    }
    if (password !== confirmPassword) {
      setErrorModal({ visible: true, message: t('error.passwordMismatch') });
      return;
    }
    if (!termsAccepted) {
      setErrorModal({ visible: true, message: t('error.checkboxMissing') });
      return;
    }
  };

  const handleOpenTerms = () => {
    console.log('Open Terms of Service');
  };

  const handleOpenPrivacy = () => {
    console.log('Open Privacy Policy');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colours.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colours.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.heading,
            { color: colours.onSurface, fontFamily: fonts.heading, marginBottom: spacing.stackSm },
          ]}
        >
          {t('heading.register')}
        </Text>
        <Text
          style={[
            styles.subheading,
            { color: colours.onSurfaceVariant, fontFamily: fonts.body, marginBottom: spacing.stackLg },
          ]}
        >
          {t('subheading.register')}
        </Text>

        <View style={{ marginBottom: spacing.stackSm }}>
          <LabeledInput
            label={t('label.email')}
            placeholder="name@example.com"
            value={email}
            onChangeText={setEmail}
            iconName="mail"
          />
          <LabeledInput
            label={t('label.password')}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={securePass}
            toggleSecureEntry={() => setSecurePass(!securePass)}
          />
          <LabeledInput
            label={t('label.confirmPassword')}
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={secureConfirm}
            toggleSecureEntry={() => setSecureConfirm(!secureConfirm)}
          />

          <View style={[styles.checkboxRow, { marginBottom: spacing.stackLg, marginTop: spacing.stackXs }]}>
            <Checkbox
              style={styles.checkbox}
              value={termsAccepted}
              onValueChange={setTermsAccepted}
              color={termsAccepted ? colours.primary : undefined}
            />
            <Text style={[styles.termsText, { color: colours.onSurfaceVariant, fontFamily: fonts.body }]}>
              <Trans
                i18nKey="trans.register_agreement"
                components={{
                  tos: <Text style={[styles.linkText, { color: colours.primary }]} onPress={handleOpenTerms} />,
                  pp: <Text style={[styles.linkText, { color: colours.primary }]} onPress={handleOpenPrivacy} />,
                }}
              />
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.primaryButton,
              {
                backgroundColor: colours.primary,
                borderRadius: rounded.md,
                marginTop: spacing.stackSm,
                shadowRadius: rounded.sm,
              },
            ]}
            onPress={handleRegister}
          >
            <Text style={[styles.primaryButtonText, { color: neutrals.neutral50, fontFamily: fonts.body }]}>
              {t('button.register')}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={neutrals.neutral50}
              style={{ marginLeft: spacing.stackSm }}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.dividerContainer, { marginVertical: spacing.stackLg }]}>
          <View style={[styles.dividerLine, { backgroundColor: colours.outlineVariant }]} />
          <Text
            style={[
              styles.dividerText,
              { color: colours.outline, fontFamily: fonts.body, marginHorizontal: spacing.stackMd },
            ]}
          >
            {t('text.continueDivider')}
          </Text>
          <View style={[styles.dividerLine, { backgroundColor: colours.outlineVariant }]} />
        </View>

        <View style={[styles.socialContainer, { gap: spacing.stackMd, marginBottom: spacing.stackLg }]}>
          <TouchableOpacity
            key="google"
            style={[styles.socialButton, { backgroundColor: colours.background, borderColor: colours.outlineVariant }]}
            onPress={() => console.log('Google register')}
          >
            <Image source={GOOGLE_ICON} style={styles.socialIcon} resizeMode="contain" />
          </TouchableOpacity>

          <TouchableOpacity
            key="facebook"
            style={[styles.socialButton, { backgroundColor: colours.background, borderColor: colours.outlineVariant }]}
            onPress={() => console.log('Facebook register')}
          >
            <Image source={FACEBOOK_ICON} style={styles.socialIcon} resizeMode="contain" />
          </TouchableOpacity>

          <TouchableOpacity
            key="apple"
            style={[styles.socialButton, { backgroundColor: colours.background, borderColor: colours.outlineVariant }]}
            onPress={() => console.log('Apple register')}
          >
            <Image source={APPLE_ICON} style={styles.socialIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>

      <ValidationErrorModal
        visible={errorModal.visible}
        message={errorModal.message}
        onClose={() => setErrorModal({ visible: false, message: '' })}
      />
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: { padding: 4 },
  content: { paddingHorizontal: 24, paddingTop: 8 },
  heading: { fontSize: 28, fontWeight: 'semibold', lineHeight: 36 },
  subheading: { fontSize: 16, fontWeight: 'regular', lineHeight: 24 },
  checkboxRow: { flexDirection: 'row', alignItems: 'flex-start' },
  checkbox: { marginTop: 2, marginRight: 12 },
  termsText: { flex: 1, fontSize: 14, fontWeight: 'regular', lineHeight: 20 },
  linkText: { fontSize: 14, fontWeight: 'bold' },
  primaryButton: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  primaryButtonText: { fontSize: 18, fontWeight: 'bold', lineHeight: 28 },
  dividerContainer: { flexDirection: 'row', alignItems: 'center' },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 12, fontWeight: 'medium', lineHeight: 16, letterSpacing: 1.2 },
  socialContainer: { flexDirection: 'row', justifyContent: 'center' },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: { width: 24, height: 24 },
});

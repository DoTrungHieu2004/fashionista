import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../navigation/routes';
import { useTheme } from '../../theme/ThemeProvider';
import { addOpacity } from '../../utils/colours';
import { APPLE_ICON, FACEBOOK_ICON, GOOGLE_ICON } from '../../constants/theme/images';

import LabeledInput from '../../components/LabeledInput';
import ValidationErrorModal from '../../components/modals/ValidationErrorModal';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { colours, neutrals, images, fonts, spacing, rounded } = useTheme();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [errorModal, setErrorModal] = useState({ visible: false, message: '' });

  const handleLogin = () => {
    if (!email || !password) {
      setErrorModal({ visible: true, message: t('error.login') });
      return;
    }
    if (!email.includes('@')) {
      setErrorModal({ visible: true, message: t('error.emailWrongFormat') });
      return;
    }
  };

  return (
    <ImageBackground source={images.gradientBackground} style={styles.bgImage}>
      <ValidationErrorModal
        visible={errorModal.visible}
        message={errorModal.message}
        onClose={() => setErrorModal({ visible: false, message: '' })}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <View
            style={[
              styles.card,
              {
                backgroundColor: addOpacity(colours.surfaceContainerLowest, 40),
                borderColor: addOpacity(colours.surfaceContainerLowest, 20),
                borderRadius: rounded.xl,
              },
            ]}
          >
            <Text
              style={[
                styles.title,
                { color: colours.primary, fontFamily: fonts.heading, marginBottom: spacing.stackSm },
              ]}
            >
              Fashionista
            </Text>
            <Text
              style={[
                styles.heading,
                { color: colours.onSurface, fontFamily: fonts.heading, marginBottom: spacing.stackSm },
              ]}
            >
              {t('heading.login')}
            </Text>
            <Text
              style={[
                styles.subheading,
                { color: colours.onSurfaceVariant, fontFamily: fonts.body, marginBottom: spacing.stackLg },
              ]}
            >
              {t('subheading.login')}
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
                secureTextEntry={secure}
                toggleSecureEntry={() => setSecure(!secure)}
                rightLabel={t('linkButton.forgotPass')}
                onRightLabelPress={() => navigation.navigate('ForgotPassword')}
              />

              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  { backgroundColor: colours.primary, marginTop: spacing.stackSm, shadowRadius: rounded.sm },
                ]}
                onPress={handleLogin}
              >
                <Text style={[styles.primaryButtonText, { color: neutrals.neutral50, fontFamily: fonts.body }]}>
                  {t('button.login')}
                </Text>
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
                style={[
                  styles.socialButton,
                  { backgroundColor: colours.background, borderColor: colours.outlineVariant },
                ]}
                onPress={() => console.log('Google login')}
              >
                <Image source={GOOGLE_ICON} style={styles.socialIcon} resizeMode="contain" />
              </TouchableOpacity>

              <TouchableOpacity
                key="facebook"
                style={[
                  styles.socialButton,
                  { backgroundColor: colours.background, borderColor: colours.outlineVariant },
                ]}
                onPress={() => console.log('Facebook login')}
              >
                <Image source={FACEBOOK_ICON} style={styles.socialIcon} resizeMode="contain" />
              </TouchableOpacity>

              <TouchableOpacity
                key="apple"
                style={[
                  styles.socialButton,
                  { backgroundColor: colours.background, borderColor: colours.outlineVariant },
                ]}
                onPress={() => console.log('Apple login')}
              >
                <Image source={APPLE_ICON} style={styles.socialIcon} resizeMode="contain" />
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colours.onSurfaceVariant, fontFamily: fonts.body }]}>
                {t('text.noAccount')}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text
                  style={[
                    styles.footerText,
                    { color: colours.primary, fontFamily: fonts.body, textDecorationLine: 'underline' },
                  ]}
                >
                  {t('linkButton.register')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bgImage: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  contentContainer: { flex: 1, justifyContent: 'center', width: '100%', paddingHorizontal: 24 },
  card: {
    padding: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: { fontSize: 28, fontWeight: 'bold', lineHeight: 36, textAlign: 'center' },
  heading: { fontSize: 28, fontWeight: 'bold', lineHeight: 36, textAlign: 'center' },
  subheading: { fontSize: 16, fontWeight: 'regular', lineHeight: 26, textAlign: 'center' },
  primaryButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  primaryButtonText: { fontSize: 16, fontWeight: 'semibold', lineHeight: 28 },
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
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { fontSize: 16, fontWeight: 'regular', lineHeight: 24 },
});

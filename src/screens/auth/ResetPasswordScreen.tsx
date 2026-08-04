import React, { useMemo, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { AuthStackParamList } from '../../navigation/routes';
import { useTheme } from '../../theme/ThemeProvider';
import { RESET_PASS_HERO_IMAGE } from '../../constants/theme/images';
import { addOpacity } from '../../utils/colours';

import LabeledInput from '../../components/LabeledInput';
import PasswordStrengthBar from '../../components/PasswordStrengthBar';
import PasswordConditions from '../../components/PasswordConditions';
import ResetSuccessModal from '../../components/modals/ResetSuccessModal';

type ResetScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ResetPassword'>;

const ResetPasswordScreen = () => {
  const navigation = useNavigation<ResetScreenNavigationProp>();
  const { colours, neutrals, fonts, spacing, rounded } = useTheme();
  const { t } = useTranslation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securePass, setSecurePass] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [successVisible, setSuccessVisible] = useState(false);

  // Conditions derived from state
  const hasLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>0-9]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const allConditionsMet = hasLength && hasSpecialChar && passwordsMatch;

  // Determine strength for the bar
  const strength = useMemo(() => {
    if (password.length === 0) return t('password_strength.none');
    if (password.length < 6) return t('password_strength.weak');
    if (password.length < 8) return t('password_strength.medium');
    if (hasSpecialChar) return t('password_strength.strong');
    return t('password_strength.medium');
  }, [password, hasSpecialChar]);

  const handleReset = () => {
    if (allConditionsMet) {
      setSuccessVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={[styles.container, { backgroundColor: colours.background }]}>
          <ResetSuccessModal visible={successVisible} onClose={() => setSuccessVisible(false)} />

          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={colours.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: spacing.stackLg }}>
            <View style={[styles.imageContainer, { marginBottom: spacing.stackLg, borderRadius: rounded.lg }]}>
              <Image source={RESET_PASS_HERO_IMAGE} style={styles.heroImage} resizeMode="cover" />
              <LinearGradient
                colors={[addOpacity(colours.primary, 40), addOpacity(colours.primary, 0)]}
                style={styles.gradientOverlay}
              />
              <Text style={[styles.overlayText, { color: neutrals.neutral50, fontFamily: fonts.heading }]}>
                {t('heading.resetPass')}
              </Text>
            </View>

            <Text style={[styles.subheading, { color: colours.onSurfaceVariant, marginBottom: spacing.stackLg }]}>
              {t('subheading.resetPass')}
            </Text>

            <LabeledInput
              label={t('label.newPassword')}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={securePass}
              toggleSecureEntry={() => setSecurePass(!securePass)}
              returnKeyType="done"
            />

            <PasswordStrengthBar strength={strength} />

            <LabeledInput
              label={t('label.newPassword')}
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={secureConfirm}
              toggleSecureEntry={() => setSecureConfirm(!secureConfirm)}
              returnKeyType="done"
              onSubmitEditing={handleReset}
            />

            <PasswordConditions hasLength={hasLength} hasSpecialChar={hasSpecialChar} passwordsMatch={passwordsMatch} />

            <TouchableOpacity
              style={[
                styles.primaryButton,
                {
                  backgroundColor: allConditionsMet ? colours.primary : neutrals.neutral500,
                  marginTop: spacing.stackSm,
                  shadowRadius: rounded.sm,
                },
              ]}
              disabled={!allConditionsMet}
              onPress={handleReset}
            >
              <Text style={[styles.primaryButtonText, { color: neutrals.neutral50, fontFamily: fonts.body }]}>
                {t('button.resetPass')}
              </Text>
            </TouchableOpacity>

            <View style={[styles.footer, { marginTop: spacing.stackLg }]}>
              <Text style={[styles.footerText, { color: colours.onSurfaceVariant, fontFamily: fonts.body }]}>
                {t('text.havingTrouble')}
              </Text>
              <TouchableOpacity>
                <Text
                  style={[
                    styles.supportText,
                    { color: colours.primary, fontFamily: fonts.body, marginTop: spacing.stackSm },
                  ]}
                >
                  {t('linkButton.contactSupport')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;

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
  imageContainer: { position: 'relative', overflow: 'hidden' },
  heroImage: { width: '100%', height: 180 },
  gradientOverlay: { ...StyleSheet.absoluteFill },
  overlayText: { position: 'absolute', bottom: 20, left: 20, fontSize: 28, fontWeight: 'bold', lineHeight: 36 },
  subheading: { fontSize: 16, fontWeight: 'regular', lineHeight: 24 },
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
  primaryButtonText: { fontSize: 20, fontWeight: 'semibold', lineHeight: 28 },
  footer: { alignItems: 'center' },
  footerText: { fontSize: 14, fontWeight: 'regular', lineHeight: 20 },
  supportText: { fontSize: 12, fontWeight: 'bold', lineHeight: 16, letterSpacing: 0.6 },
});

import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather, Ionicons } from '@expo/vector-icons';

import { AuthStackParamList } from '../../navigation/routes';
import { useTheme } from '../../theme/ThemeProvider';
import { FORGOT_PASS_HERO_IMAGE } from '../../constants/theme/images';

import LabeledInput from '../../components/LabeledInput';
import ValidationErrorModal from '../../components/modals/ValidationErrorModal';

type ForgotScreenNavgiationProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<ForgotScreenNavgiationProp>();
  const { colours, neutrals, fonts, spacing, rounded } = useTheme();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [errorModal, setErrorModal] = useState({ visible: false, message: '' });

  const handleSendLink = () => {
    if (!email) {
      setErrorModal({ visible: true, message: t('error.emailMissing') });
      return;
    }
    if (!email.includes('@')) {
      setErrorModal({ visible: true, message: t('error.emailWrongFormat') });
      return;
    }
    // Success logic: navigate to Reset Password
    navigation.navigate('ResetPassword', { email });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colours.background }]}>
      <ValidationErrorModal
        visible={errorModal.visible}
        message={errorModal.message}
        onClose={() => setErrorModal({ visible: false, message: '' })}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colours.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <View style={[styles.content, { paddingHorizontal: spacing.stackLg, paddingTop: spacing.stackSm }]}>
        <Image
          source={FORGOT_PASS_HERO_IMAGE}
          style={[styles.heroImage, { borderRadius: rounded.lg, marginBottom: spacing.stackLg }]}
          resizeMode="cover"
        />

        <Text
          style={[
            styles.heading,
            { color: colours.onBackground, fontFamily: fonts.heading, marginBottom: spacing.stackSm },
          ]}
        >
          {t('heading.forgotPass')}
        </Text>
        <Text
          style={[
            styles.subheading,
            { color: colours.onSurfaceVariant, fontFamily: fonts.body, marginBottom: spacing.stackLg },
          ]}
        >
          {t('subheading.forgotPass')}
        </Text>

        <LabeledInput
          label={t('label.email')}
          placeholder={t('placeholder.email')}
          value={email}
          onChangeText={setEmail}
          iconName="mail"
        />

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
          onPress={handleSendLink}
        >
          <Text style={[styles.primaryButtonText, { color: neutrals.neutral50, fontFamily: fonts.body }]}>
            {t('button.resetLink')}
          </Text>
          <Feather name="send" size={18} color={neutrals.neutral50} style={{ marginLeft: spacing.stackSm }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

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
  content: { flex: 1, justifyContent: 'center', alignContent: 'center' },
  heroImage: { width: '100%', height: 180 },
  heading: { fontSize: 28, fontWeight: 'semibold', lineHeight: 36, textAlign: 'center' },
  subheading: { fontSize: 16, fontWeight: 'regular', lineHeight: 24, textAlign: 'center' },
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
  primaryButtonText: { fontSize: 16, fontWeight: 'semibold', lineHeight: 24 },
});

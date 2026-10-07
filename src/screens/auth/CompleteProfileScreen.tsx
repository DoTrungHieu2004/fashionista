import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Checkbox } from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';

import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthInput } from '@/components/auth/AuthInput';
import { CustomAlert } from '@/components/CustomAlert';
import { DateInput } from '@/components/DateInput';
import { type AuthStackCompositeScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme/useTheme';

import { authStyles } from './authStyles';

type Props = AuthStackCompositeScreenProps<'CompleteProfile'>;

export function CompleteProfileScreen({ route, navigation }: Props) {
  const { colors, neutral, fonts, spacing, radius, staticImages } = useTheme();
  const { t } = useTranslation();

  const GENDERS = [
    t('enum.genders.male'),
    t('enum.genders.female'),
    t('enum.genders.non-binary'),
    t('enum.genders.prefer-not-to-say'),
  ];

  // Form state
  const [avatar, setAvatar] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [gender, setGender] = useState('');
  const [recommendations, setRecommendations] = useState(false);

  // UI state
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({ title: '', message: '' });

  const { userId } = route.params;

  const showAlert = (title: string, message: string) => {
    setAlertData({ title, message });
    setAlertVisible(true);
  };

  // Image picker logic
  const pickImage = async (useCamera: boolean) => {
    setShowAvatarModal(false);

    const permissionResult = useCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    const targetAccess = useCamera
      ? t('dialogs.permissionRequired.media-access.camera')
      : t('dialogs.permissionRequired.media-access.photos');

    if (permissionResult.granted === false) {
      return showAlert(
        t('dialogs.permissionRequired.title'),
        t('dialogs.permissionRequired.media-access.message', { media: targetAccess }),
      );
    }

    const result = useCamera
      ? await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.8 })
      : await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

    if (!result.canceled) {
      setAvatar(result.assets[0]?.uri);
    }
  };

  // Randomize display name
  const generateDisplayName = () => {
    const base = firstName.toLowerCase().replace(/\s/g, '');
    const suffix = lastName ? lastName.toLowerCase().replace(/\s/g, '') : '';
    const randomNum = Math.floor(Math.random() * 1000);
    setDisplayName(`@${base}${suffix}${randomNum}`);
  };

  const handleContinue = () => {
    if (!firstName.trim())
      return showAlert(
        t('validation.missingField.title'),
        t('validation.missingField.first-name-required'),
      );
    if (!displayName.trim())
      return showAlert(
        t('validation.missingField.title'),
        t('validation.missingField.display-name-required'),
      );
    if (!dob)
      return showAlert(
        t('validation.missingField.title'),
        t('validation.missingField.dob-required'),
      );
    if (!gender)
      return showAlert(
        t('validation.missingField.title'),
        t('validation.missingField.gender-required'),
      );

    console.log('Profile complete:', {
      avatar,
      firstName,
      lastName,
      displayName,
      dob,
      gender,
      recommendations,
    });

    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={[authStyles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexView}
      >
        <ScrollView
          contentContainerStyle={[authStyles.scrollContent, { padding: spacing.lg }]}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={[
              styles.title,
              {
                color: colors.onSurface,
                fontFamily: fonts.montserrat.semibold,
                marginBottom: spacing.md,
              },
            ]}
          >
            {t('common.titles.complete-profile')}
          </Text>

          {/* Avatar upload */}
          <View style={[styles.avatarSection, { marginBottom: spacing.marginTablet }]}>
            <View
              style={[
                styles.avatarWrapper,
                { borderColor: colors.surfaceContainerHigh, borderRadius: radius.full },
              ]}
            >
              <Image
                source={avatar ? { uri: avatar } : staticImages.defaultAvatar}
                style={[styles.avatarImage, { borderRadius: radius.full }]}
              />
              <TouchableOpacity
                style={[
                  styles.cameraButton,
                  {
                    backgroundColor: colors.primary,
                    borderRadius: radius.full,
                    borderColor: neutral[100],
                  },
                ]}
                onPress={() => setShowAvatarModal(true)}
              >
                <Feather name="camera" size={18} color={neutral[100]} />
              </TouchableOpacity>
            </View>
            <Text
              style={[styles.uploadText, { color: colors.outline, fontFamily: fonts.inter.medium }]}
            >
              {t('labels.upload-avatar')}
            </Text>
          </View>

          {/* Form fields */}
          <AuthInput
            label={t('labels.first-name')}
            placeholder={t('placeholders.first-name')}
            value={firstName}
            onChangeText={setFirstName}
          />

          <AuthInput
            label={t('labels.last-name')}
            placeholder={t('placeholders.last-name')}
            value={lastName}
            onChangeText={setLastName}
          />

          <AuthInput
            label={t('labels.display-name')}
            placeholder="@username"
            value={displayName}
            onChangeText={setDisplayName}
            rightIcon={
              <TouchableOpacity onPress={generateDisplayName}>
                <Feather name="shuffle" size={20} color={colors.primary} />
              </TouchableOpacity>
            }
          />
          <Text
            style={[
              styles.helperText,
              { color: colors.outline, fontFamily: fonts.inter.semibold, marginBottom: spacing.lg },
            ]}
          >
            {t('common.helpers.display-name')}
          </Text>

          {/* DOB and gender box */}
          <View style={[styles.rowContainer, { gap: spacing.gutter, marginBottom: spacing.lg }]}>
            <View style={styles.halfWidth}>
              <Text
                style={[
                  styles.label,
                  {
                    color: colors.onSurfaceVariant,
                    fontFamily: fonts.inter.medium,
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                {t('labels.dob')}
              </Text>
              <DateInput value={dob} onChange={setDob} maximumDate={new Date()} />
            </View>
            <View style={styles.halfWidth}>
              <Text
                style={[
                  styles.label,
                  {
                    color: colors.onSurfaceVariant,
                    fontFamily: fonts.inter.medium,
                    marginBottom: spacing.sm,
                  },
                ]}
              >
                {t('labels.gender')}
              </Text>
              <TouchableOpacity
                style={[
                  styles.dropdownTrigger,
                  {
                    borderColor: colors.outlineVariant,
                    backgroundColor: colors.surfaceContainerLowest,
                    paddingHorizontal: spacing.md,
                  },
                ]}
                onPress={() => setShowGenderModal(true)}
              >
                <Text
                  style={
                    gender
                      ? [
                          styles.dropdownText,
                          { color: colors.onSurface, fontFamily: fonts.inter.regular },
                        ]
                      : [
                          styles.dropdownText,
                          { color: colors.outline, fontFamily: fonts.inter.regular },
                        ]
                  }
                >
                  {gender || t('labels.select')}
                </Text>
                <Feather name="chevrons-down" size={20} color={colors.outline} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Personalised recommendations */}
          <View style={[styles.checkboxContainer, { marginBottom: spacing.marginTablet }]}>
            <Checkbox
              value={recommendations}
              onValueChange={setRecommendations}
              color={recommendations ? colors.primaryContainer : undefined}
              style={[styles.checkbox, { borderColor: colors.outline }]}
            />
            <View style={styles.checkboxTextContainer}>
              <Text
                style={[
                  styles.checkboxTitle,
                  { color: colors.onSurface, fontFamily: fonts.inter.medium },
                ]}
              >
                {t('checkboxes.personalisedRecommendations.title')}
              </Text>
              <Text
                style={[
                  styles.checkboxSubtitle,
                  { color: colors.outline, fontFamily: fonts.inter.semibold },
                ]}
              >
                {t('checkboxes.personalisedRecommendations.subtitle')}
              </Text>
            </View>
          </View>

          {/* Continue button */}
          <TouchableOpacity
            style={[authStyles.primaryButton, { backgroundColor: colors.primary }]}
            onPress={handleContinue}
          >
            <Text
              style={[
                authStyles.primaryButtonText,
                { color: neutral[100], fontFamily: fonts.inter.medium },
              ]}
            >
              {t('buttons.continue')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Avatar choice modal */}
      <Modal
        transparent
        visible={showAvatarModal}
        animationType="fade"
        onRequestClose={() => setShowAvatarModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowAvatarModal(false)}>
          <View
            style={[
              styles.bottomSheet,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderTopLeftRadius: spacing.lg,
                borderTopRightRadius: spacing.lg,
                padding: spacing.lg,
              },
            ]}
          >
            <Text
              style={[
                styles.sheetTitle,
                {
                  color: colors.onSurface,
                  fontFamily: fonts.montserrat.bold,
                  marginBottom: spacing.md,
                },
              ]}
            >
              {t('bottomSheets.avatarChoice.title')}
            </Text>

            <TouchableOpacity
              style={[
                styles.sheetOption,
                { paddingVertical: spacing.md, borderBottomColor: colors.outlineVariant },
              ]}
              onPress={() => pickImage(true)}
            >
              <Feather name="camera" size={20} color={colors.onSurface} />
              <Text
                style={[
                  styles.sheetOptionText,
                  { color: colors.onSurface, fontFamily: fonts.inter.regular },
                ]}
              >
                {t('bottomSheets.avatarChoice.option-1')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sheetOption,
                { paddingVertical: spacing.md, borderBottomColor: colors.outlineVariant },
              ]}
              onPress={() => pickImage(false)}
            >
              <Feather name="image" size={20} color={colors.onSurface} />
              <Text
                style={[
                  styles.sheetOptionText,
                  { color: colors.onSurface, fontFamily: fonts.inter.regular },
                ]}
              >
                {t('bottomSheets.avatarChoice.option-2')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sheetOption,
                { paddingVertical: spacing.md, borderBottomColor: colors.outlineVariant },
                styles.cancelOption,
                { marginTop: spacing.sm },
              ]}
              onPress={() => setShowAvatarModal(false)}
            >
              <Text
                style={[
                  styles.sheetOptionText,
                  { color: colors.error, fontFamily: fonts.inter.regular },
                ]}
              >
                {t('buttons.cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Gender selection modal */}
      <Modal
        transparent
        visible={showGenderModal}
        animationType="fade"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowGenderModal(false)}>
          <View
            style={[
              styles.bottomSheet,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderTopLeftRadius: spacing.lg,
                borderTopRightRadius: spacing.lg,
                padding: spacing.lg,
              },
            ]}
          >
            <Text
              style={[
                styles.sheetTitle,
                {
                  color: colors.onSurface,
                  fontFamily: fonts.montserrat.bold,
                  marginBottom: spacing.md,
                },
              ]}
            >
              {t('bottomSheets.genderChoice.title')}
            </Text>

            {GENDERS.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.sheetOption,
                  { paddingVertical: spacing.md, borderBottomColor: colors.outlineVariant },
                ]}
                onPress={() => {
                  setGender(item);
                  setShowGenderModal(false);
                }}
              >
                <Text
                  style={[
                    styles.sheetOptionText,
                    { color: colors.onSurface, fontFamily: fonts.inter.regular },
                    gender === item && { color: colors.primary, fontFamily: fonts.inter.semibold },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

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
  title: { fontSize: 24, lineHeight: 32, letterSpacing: -0.6, textAlign: 'center' },
  avatarSection: { alignItems: 'center' },
  avatarWrapper: { position: 'relative', marginBottom: 12, borderWidth: 4 },
  avatarImage: { width: 128, height: 128 },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
  },
  uploadText: { fontSize: 12, lineHeight: 16, letterSpacing: 0.6, textAlign: 'center' },
  helperText: { fontSize: 10, lineHeight: 14, letterSpacing: 0.8, marginTop: -12 },
  rowContainer: { flexDirection: 'row' },
  halfWidth: { flex: 1 },
  label: { fontSize: 12, lineHeight: 16, letterSpacing: 0.6 },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    height: 56,
  },
  dropdownText: { fontSize: 16, lineHeight: 24 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  checkbox: { marginTop: 2, borderRadius: 4 },
  checkboxTextContainer: { flex: 1 },
  checkboxTitle: { fontSize: 12, lineHeight: 15, letterSpacing: 0.6, marginBottom: 4 },
  checkboxSubtitle: { fontSize: 10, lineHeight: 14, letterSpacing: 0.8 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  bottomSheet: { paddingBottom: Platform.OS === 'ios' ? 40 : 24 },
  sheetTitle: { fontSize: 18, textAlign: 'center' },
  sheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  sheetOptionText: { fontSize: 16, flex: 1 },
  cancelOption: { borderBottomWidth: 0, justifyContent: 'center' },
});

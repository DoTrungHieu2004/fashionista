import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';

import { AuthStackParamList } from '../../navigation/routes';
import { useTheme } from '../../theme/ThemeProvider';
import { addOpacity } from '../../utils/colours';

type ResetScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ResetPassword'>;

interface Props {
  visible: boolean;
  onClose?: () => void;
}

const ResetSuccessModal: React.FC<Props> = ({ visible, onClose }) => {
  const navigation = useNavigation<ResetScreenNavigationProp>();
  const { colours, neutrals, fonts, spacing, rounded } = useTheme();
  const { t } = useTranslation();

  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      scaleAnim.setValue(0.5);
    }
  }, [visible]);

  const handleGoToLogin = () => {
    if (onClose) onClose();
    // Navigate back to Login screen (popping back to Auth stack root)
    navigation.popToTop();
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={[styles.card, { backgroundColor: colours.surfaceContainerLowest, shadowRadius: rounded.DEFAULT }]}>
          <Animated.View
            style={[styles.iconContainer, { marginBottom: spacing.stackLg, transform: [{ scale: scaleAnim }] }]}
          >
            <View style={[styles.outerCircle, { backgroundColor: addOpacity(colours.primary, 20) }]} />
            <View style={[styles.innerCircle, { backgroundColor: colours.primary }]}>
              <Feather name="check" size={32} color={neutrals.neutral50} />
            </View>
          </Animated.View>

          <Text style={[styles.title, { color: colours.onSurface, fontFamily: fonts.heading }]}>
            {t('modal.passwordReset.title')}
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: colours.onSurfaceVariant, fontFamily: fonts.body, marginBottom: spacing.stackLg },
            ]}
          >
            {t('modal.passwordReset.subtitle')}
          </Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colours.primary, borderRadius: rounded.md }]}
            onPress={handleGoToLogin}
          >
            <Text style={[styles.buttonText, { color: neutrals.neutral50 }]}>{t('button.goToLogin')}</Text>
            <Feather name="arrow-right" size={20} color={neutrals.neutral50} style={{ marginLeft: spacing.stackSm }} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ResetSuccessModal;

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  card: {
    width: '85%',
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
  },
  iconContainer: { position: 'relative' },
  outerCircle: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    top: -15,
    left: -15,
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'semibold',
    lineHeight: 36,
    letterSpacing: -0.7,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: { fontSize: 16, fontWeight: 'regular', lineHeight: 26, textAlign: 'center' },
  button: { width: '100%', height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  buttonText: { fontSize: 20, fontWeight: 'semibold', lineHeight: 28 },
});

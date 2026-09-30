import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useTheme } from '@/theme/useTheme';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export function CustomAlert({ visible, title, message, onClose }: CustomAlertProps) {
  const { colors, neutral, spacing, radius, fonts } = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={[styles.overlay, { padding: spacing.lg }]}>
        <View
          style={[
            styles.alertBox,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderRadius: radius.xl,
              padding: spacing.lg,
            },
          ]}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: colors.errorContainer, marginBottom: spacing.md },
            ]}
          >
            <Feather name="alert-circle" size={32} color={colors.error} />
          </View>
          <Text
            style={[
              styles.title,
              {
                color: colors.onSurfaceVariant,
                fontFamily: fonts.montserrat.bold,
                marginBottom: spacing.unit,
              },
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.message,
              {
                color: colors.onSurfaceVariant,
                fontFamily: fonts.inter.regular,
                marginBottom: spacing.lg,
              },
            ]}
          >
            {message}
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primaryContainer }]}
            onPress={onClose}
          >
            <Text
              style={[styles.buttonText, { color: neutral[50], fontFamily: fonts.inter.semibold }]}
            >
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 20, textAlign: 'center', lineHeight: 22 },
  message: { fontSize: 15, textAlign: 'center', lineHeight: 22 },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { fontSize: 16 },
});

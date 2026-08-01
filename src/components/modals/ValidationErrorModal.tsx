import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../theme/ThemeProvider';

interface ErrorModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const ValidationErrorModal: React.FC<ErrorModalProps> = ({ visible, message, onClose }) => {
  const { colours, neutrals, spacing, rounded, fonts } = useTheme();
  const { t } = useTranslation();

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            { padding: spacing.stackLg, borderRadius: rounded.lg, backgroundColor: colours.background },
          ]}
        >
          <Text style={[styles.title, { fontFamily: fonts.body, color: colours.error }]}>
            {t('modal.validationError')}
          </Text>
          <Text style={[styles.message, { color: colours.onSurface, marginBottom: spacing.containerMargin }]}>
            {message}
          </Text>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 8, backgroundColor: colours.primary }]}
            onPress={onClose}
          >
            <Text style={[styles.buttonText, { color: neutrals.neutral50, fontFamily: fonts.body }]}>
              {t('button.OK')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ValidationErrorModal;

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignContent: 'center' },
  container: { width: '80%', elevation: 5, alignSelf: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  message: { fontSize: 14, fontWeight: 'regular' },
  button: { paddingVertical: 10, paddingHorizontal: 32 },
  buttonText: { fontSize: 16, fontWeight: 'regular', textAlign: 'center' },
});

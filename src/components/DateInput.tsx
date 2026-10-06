import { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import type React from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/theme/useTheme';

interface DateInputProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  placeholder = 'mm/dd/yyyy',
  minimumDate,
  maximumDate,
}) => {
  const { colors, fonts, spacing } = useTheme();
  const { t } = useTranslation();

  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value || new Date());

  const handleNativeChange = (event: DateTimePickerEvent, date?: Date) => {
    const timestamp = event.nativeEvent?.timestamp;
    const selectedDate = timestamp ? new Date(timestamp) : date;

    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (event.type === 'set' && selectedDate) {
        onChange(selectedDate);
      }
    } else if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const handleIOSConfirm = () => {
    onChange(tempDate);
    setShowPicker(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setTempDate(value || new Date());
          setShowPicker(true);
        }}
        style={({ pressed }) => [
          styles.inputContainer,
          {
            borderColor: colors.outlineVariant,
            backgroundColor: colors.surfaceContainerLowest,
            paddingHorizontal: spacing.md,
          },
          pressed && { backgroundColor: colors.surfaceContainerLow },
        ]}
      >
        <Text
          style={
            value
              ? [styles.inputText, { color: colors.onSurface, fontFamily: fonts.inter.semibold }]
              : [styles.inputText, { color: colors.outline }]
          }
        >
          {value ? formatDate(value) : placeholder}
        </Text>
        <Feather name="calendar" size={20} color={colors.outline} />
      </Pressable>

      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={handleNativeChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}

      {Platform.OS === 'ios' && (
        <Modal
          visible={showPicker}
          transparent
          animationType="fade"
          onRequestClose={() => setShowPicker(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setShowPicker(false)}>
            <View
              style={[
                styles.iosPickerContainer,
                { backgroundColor: colors.surfaceContainerLowest },
              ]}
            >
              <View
                style={[
                  styles.iosHeader,
                  { padding: spacing.md, borderColor: colors.outlineVariant },
                ]}
              >
                <Pressable onPress={() => setShowPicker(false)}>
                  <Text
                    style={[
                      styles.iosHeaderButton,
                      { color: colors.primary, fontFamily: fonts.inter.medium },
                    ]}
                  >
                    {t('buttons.cancel')}
                  </Text>
                </Pressable>
                <Pressable onPress={handleIOSConfirm}>
                  <Text
                    style={[
                      styles.iosHeaderButton,
                      { color: colors.primary, fontFamily: fonts.inter.semibold },
                    ]}
                  >
                    {t('buttons.done')}
                  </Text>
                </Pressable>
              </View>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={handleNativeChange}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                textColor={colors.onSurface}
              />
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    height: 56,
  },
  inputText: { fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'flex-end' },
  iosPickerContainer: { paddingBottom: 20 },
  iosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iosHeaderButton: { fontSize: 16 },
});

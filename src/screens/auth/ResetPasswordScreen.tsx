import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useTheme } from '../../theme/provider/ThemeProvider';
import { styles } from './styles';
import InputField from '../../components/InputField';
import PasswordStrengthBar from '../../components/PasswordStrengthBar';

const ResetPasswordScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  // Animation for the blooming shadow circle
  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (isSuccessModalVisible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.4, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isSuccessModalVisible]);

  // Password condition logic
  const cond1 = newPass.length >= 8;
  const cond2 = /[^A-Za-z0-9]/.test(newPass) || /\d/.test(newPass);
  const cond3 = newPass.length > 0 && newPass === confirmPass;
  const isFormValid = cond1 && cond2 && cond3;

  // Handle reset
  const handleReset = () => {
    if (isFormValid) {
      setIsSuccessModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={localStyles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={localStyles.backButton}
          activeOpacity={0.7}>
          <Feather name="arrow-left" size={24} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        {/* Hero image */}
        <View style={localStyles.heroContainer}>
          <Image
            source={require('../../../assets/images/heroes/reset_pass_hero.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />

          {/* Point: 0% - 40%, 100% - 0% translated to opacity -> 0 to 1 */}
          <LinearGradient
            colors={['rgba(83, 0, 183, 0)', 'rgba(83, 0, 183, 0.4)']}
            style={localStyles.heroGradient}
            locations={[0, 0.4]}
          />
          <Text style={localStyles.heroText}>Reset password</Text>
        </View>

        <Text
          style={[
            styles.subtitle,
            { color: colors.onSurfaceVariant, marginTop: 20, marginBottom: 24 },
          ]}>
          Choose a strong, unique password to keep your fashion vault secure.
        </Text>

        <InputField
          label="New password"
          value={newPass}
          onChangeText={setNewPass}
          placeholder="••••••••"
          secureTextEntry={!showNewPass}
          iconName={showNewPass ? 'eye' : 'eye-off'}
          onIconPress={() => setShowNewPass(!showNewPass)}
        />

        <PasswordStrengthBar password={newPass} />

        <InputField
          label="Confirm password"
          value={confirmPass}
          onChangeText={setConfirmPass}
          placeholder="••••••••"
          secureTextEntry={!showConfirmPass}
          iconName={showNewPass ? 'eye' : 'eye-off'}
          onIconPress={() => setShowConfirmPass(!showNewPass)}
        />

        {/* Conditions box */}
        <View style={[localStyles.conditionsBox, { backgroundColor: colors.surfaceContainerLow }]}>
          {[
            { label: 'At least 8 characters', met: cond1 },
            { label: 'One special character or number', met: cond2 },
            { label: 'Passwords match', met: cond3 },
          ].map((item, index) => (
            <View key={index} style={localStyles.conditionRow}>
              <Checkbox
                value={item.met}
                onValueChange={() => {}} // Read-only, auto-ticks based on logic
                color={item.met ? colors.primary : colors.outlineVariant}
                style={{ width: 16, height: 16, borderRadius: 10 }}
              />

              <Text
                style={[
                  localStyles.conditionText,
                  { color: colors.onSurfaceVariant },
                  item.met && { color: colors.primary },
                ]}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Disable logic based on isFormValid */}
        <TouchableOpacity
          style={[
            styles.primaryButton,
            { backgroundColor: colors.primary },
            !isFormValid && { backgroundColor: '#9ca3af' },
          ]}
          onPress={handleReset}
          disabled={!isFormValid}>
          <Text style={[styles.buttonText, !isFormValid && { color: '#e5e7eb' }]}>
            Reset password
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Success modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSuccessModalVisible}
        onRequestClose={() => setIsSuccessModalVisible(false)}>
        <View style={localStyles.modalOverlay}>
          <View style={[localStyles.modalCard, { backgroundColor: colors.surfaceContainerLowest }]}>
            {/* Pulse shadow */}
            <View style={localStyles.iconWrapper}>
              <Animated.View
                style={[localStyles.bloomingShadow, { transform: [{ scale: pulseAnim }] }]}
              />

              {/* Tick image */}
              <Image
                source={require('../../../assets/images/icons/success-tick-purple.png')}
                style={localStyles.successIcon}
              />
            </View>

            <Text style={[localStyles.modalTitle, { color: colors.onSurface }]}>
              Password Reset Successful
            </Text>
            <Text style={[localStyles.modalSubtitle, { color: colors.onSurfaceVariant }]}>
              Your password has been successfully updated. You can now log in with your new
              credentials.
            </Text>

            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.primary, width: '85%' }]}
              onPress={() => navigation.navigate('Login' as never)}>
              <Text style={styles.buttonText}>Go to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const localStyles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  backButton: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContainer: { height: 200, borderRadius: 16, overflow: 'hidden', position: 'relative' },
  heroGradient: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  heroText: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'MontserratBold',
  },
  conditionsBox: { borderRadius: 12, padding: 16, marginBottom: 24, gap: 12 },
  conditionRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  conditionText: { fontSize: 14, fontFamily: 'InterRegular' },

  // Modal & pulse animation
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCard: {
    width: '85%',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bloomingShadow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#5300b733',
  },
  successIcon: { width: 96, height: 96, zIndex: 10 },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'MontserratSemiBold',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 15,
    fontFamily: 'InterRegular',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
});

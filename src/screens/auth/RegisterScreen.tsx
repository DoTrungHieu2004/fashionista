import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

import { useTheme } from '../../theme/provider/ThemeProvider';
import { styles } from './styles';
import InputField from '../../components/InputField';

const RegisterScreen = () => {
  const { colors, images } = useTheme();
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleRegister = () => {
    console.log('Registering user...');
  };

  return (
    <ImageBackground
      source={images.gradientBackground}
      style={styles.background}
      resizeMode="cover">
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1, justifyContent: 'center' }}>
          <ScrollView
            contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: 'center' }}>
            {/* Middle transparent / White container */}
            <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest }]}>
              <Text style={[styles.headerTitle, { color: colors.onSurface }]}>Create account</Text>
              <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
                Join our global fashion community and discover curated collection.
              </Text>

              {/* Inputs */}
              <InputField
                label="Full name"
                value={fullName}
                onChangeText={setFullName}
                placeholder="Your full name"
                autoCapitalize="words"
                iconName="user"
                iconLibrary="Feather"
              />
              <InputField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                iconName="mail"
                iconLibrary="Feather"
              />
              <InputField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                iconName={showPassword ? 'eye' : 'eye-off'}
                onIconPress={() => setShowPassword(!showPassword)}
              />
              <InputField
                label="Confirm password"
                value={confirmPass}
                onChangeText={setConfirmPass}
                placeholder="••••••••"
                secureTextEntry={!showConfirmPass}
                iconName="repeat" // Using repeat icon from Ionicons
                iconLibrary="Ionicons"
                onIconPress={() => setShowConfirmPass(!showConfirmPass)}
              />

              {/* Checkbox agreement */}
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setAgree(!agree)}
                activeOpacity={0.7}>
                <Checkbox
                  value={agree}
                  onValueChange={setAgree}
                  color={agree ? colors.primaryContainer : undefined}
                  style={styles.checkbox}
                />
                <Text style={[styles.checkboxText, { color: colors.onSurfaceVariant }]}>
                  By registering, I agree to Fashionista's{' '}
                  <Text style={[styles.linkInLine, { color: colors.primary }]}>
                    Terms of Service
                  </Text>{' '}
                  and{' '}
                  <Text style={[styles.linkInLine, { color: colors.primary }]}>Privacy Policy</Text>
                  .
                </Text>
              </TouchableOpacity>

              {/* Register button */}
              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: colors.primary }]}
                onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={[styles.dividerLine, { backgroundColor: colors.outlineVariant }]} />
                <Text style={[styles.dividerText, { color: colors.outline }]}>
                  OR CONTINUE WITH
                </Text>
                <View style={[styles.dividerLine, { backgroundColor: colors.outlineVariant }]} />
              </View>

              {/* Social buttons */}
              <View style={styles.socialContainer}>
                <TouchableOpacity
                  style={[
                    styles.socialButton,
                    { backgroundColor: colors.surface, borderColor: colors.outlineVariant },
                  ]}>
                  <Image
                    source={require('../../../assets/images/icons/google.png')}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={[styles.socialText, { color: colors.onSurface }]}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.socialButton,
                    { backgroundColor: colors.surface, borderColor: colors.outlineVariant },
                  ]}>
                  <Image
                    source={require('../../../assets/images/icons/facebook.png')}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={[styles.socialText, { color: colors.onSurface }]}>Facebook</Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={[styles.footerText, { color: colors.onSurfaceVariant }]}>
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={[styles.linkText, { color: colors.primary }]}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;

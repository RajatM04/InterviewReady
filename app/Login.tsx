import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    // Replace this logic with your own backend/API login in the future
    Alert.alert('Login Success', 'This is a placeholder login.');
    router.push('/(tabs)/Home');
  };

  return (
    <ImageBackground
      source={require('../assets/2bg.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.overlay}>
            <View style={styles.textContainer}>
              <Text style={styles.appName}>Interview Ready.</Text>
              <Text style={styles.welcomeText}>Let's crack it!</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#7BA7D9"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor="#7BA7D9"
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signupLink}
              onPress={() => router.push('/signup')}
            >
              <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  overlay: {
    backgroundColor: 'rgba(174, 225, 255, 0.7)',
    borderRadius: 20,
    padding: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  textContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  appName: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  welcomeText: {
    fontSize: 19,
    fontWeight: '500',
    color: '#1E3A8A',
    marginTop: 6,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    color: '#1E3A8A',
  },
  button: {
    backgroundColor: '#0d47a1',
    paddingVertical: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  signupLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    color: '#1E3A8A',
    fontSize: 15,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});

export default Login;

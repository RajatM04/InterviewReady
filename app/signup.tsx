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
import { LinearGradient } from 'expo-linear-gradient';

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !phone) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    if (phone.length !== 10) {
      Alert.alert('Invalid Phone Number', 'Phone number must be 10 digits.');
      return;
    }

    setLoading(true);

    try {
   
      console.log('Signup Data:', {
        name,
        email,
        password,
        phone,
      });

      Alert.alert('Success', 'Account created successfully!');

      // Clear fields
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');

      // Navigate to main app screen
      router.push('/(tabs)/Home');
    } catch (error: any) {
      console.error('Signup error:', error.message);
      Alert.alert('Signup Failed', error.message);
    }

    setLoading(false);
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
              <Text style={styles.welcomeText}>Create your account</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#7BA7D9"
              value={name}
              onChangeText={setName}
            />
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
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              maxLength={10}
              placeholderTextColor="#7BA7D9"
              value={phone}
              onChangeText={setPhone}
            />

            <TouchableOpacity onPress={handleSignUp} disabled={loading}>
              <LinearGradient
                colors={loading ? ['#94a3b8', '#64748b'] : ['#0d47a1', '#1565c0']}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => router.push('/Login')}
            >
              <Text style={styles.loginText}>
                Already have an account? Log In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
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
  textContainer: { marginBottom: 30, alignItems: 'center' },
  appName: { fontSize: 34, fontWeight: 'bold', color: '#1a237e' },
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
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#1E3A8A',
    fontSize: 15,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});

export default SignUp;

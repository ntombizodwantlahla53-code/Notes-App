import { Component } from 'react';
import { Alert, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from './CustomInput';
import { validateInput } from '@/utils/input.validation';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  username: string;
  email: string;
  password: string;
}

interface LoginState {
  email: string;
  password: string;
}

export default class Login extends Component<{}, LoginState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleLogin = async () => {
    const { email, password } = this.state;

    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }

    try {
      const savedUsers = await AsyncStorage.getItem('users');
      const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];

      const loggedInUser = users.find(
        user =>
          user.email.toLowerCase() === email.trim().toLowerCase() &&
          user.password === password
      );

      if (!loggedInUser) {
        Alert.alert('Login Failed', 'Incorrect email or password.');
        return;
      }

      await AsyncStorage.setItem(
        'currentUser',
        JSON.stringify({
          username: loggedInUser.username,
          email: loggedInUser.email
        })
      );
      Alert.alert('Success', 'You have logged in successfully.');
      router.replace('/home');

    } catch (error) {
      Alert.alert('Error', 'Something went wrong while logging in.');
      console.log(error);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.formTitle}>Login</Text>
            <CustomInput
              name={'Email'}
              onChange={(value: string) =>
                this.setState({ email: value })
              }
            />

            <CustomInput
              name={'Password'}
              onChange={(value: string) =>
                this.setState({ password: value })
              }
            />

            <Pressable
              style={styles.button}
              onPress={this.handleLogin}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
            <View style={styles.signInSection}>
              <Text style={{ color: '#BDBDDB' }}>
                Don't have an account?
              </Text>
              <Pressable onPress={() => router.replace('/')}>
                <Text style={{ color: '#306A68', padding: 5 }}>
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010709',
  },
  scrollView: {
    padding: 20,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#306A68',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, ToastAndroid, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from './CustomInput';
import { validateInput, ValidationResult } from '@/utils/input.validation';
import AsyncStorage from '@react-native-async-storage/async-storage'

interface User {
  username: string;
  email: string;
  password: string;
}

export default function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{
    [key: string]: ValidationResult | undefined
  }>({});

  const handleInput = (type: string, stateName: string, value: string) => {
    setErrors(previousErrors => ({
      ...previousErrors,
      [stateName]: validateInput(type, value)
    }));
  };

  const handleOnSubmit = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      // Get all registered users
      const savedUsers = await AsyncStorage.getItem('users');

      // here we convert savedData into an array
      const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];

      // here we check if the email is already registered so that if its registered you do not reg..again with it
      const existingUser = users.find(
        user => user.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (existingUser) {
        Alert.alert('Error', 'This email is already registered.');
        return;
      }

      // create the new user
      const newUser: User = {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: password
      };

      // we add the new user to the array
      users.push(newUser);

      // saving all users
      await AsyncStorage.setItem('users', JSON.stringify(users));

      Alert.alert('Success', 'Registration successful!');

      // clearing the inputs i wrote
      setUsername('');
      setEmail('');
      setPassword('');
      setErrors({});

    } catch (error) {
      Alert.alert('Error', 'Could not save registration details.');
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.formTitle}>Register</Text>

          <CustomInput
            name={'User Name'}
            onChange={setUsername}
            onBlur={() => handleInput('string', 'username', username)}
            error={errors.username?.error}
          />

          <CustomInput
            name={'Email'}
            onChange={setEmail}
            onBlur={() => handleInput('string', 'email', email)}
            error={errors.email?.error}
          />

          <CustomInput
            name={'Password'}
            onChange={setPassword}
            onBlur={() => handleInput('string', 'password', password)}
            error={errors.password?.error}
          />

          <Pressable style={styles.button} onPress={handleOnSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>

          <View style={styles.signinSection}>
            <Text style={{ color: '#000000' }}>
              Already have an account?
            </Text>
            <Pressable>
              <Text style={{ color: '#1b6be8', padding: 5 }}>
                Sign In
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
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
    backgroundColor: '#1b6be8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signinSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});
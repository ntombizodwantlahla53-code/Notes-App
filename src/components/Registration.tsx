import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, ToastAndroid, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from './CustomInput';
import { validateInput, ValidationResult } from '@/utils/input.validation';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Registration() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
const [errors, setErrors] = useState<{ [key: string]: ValidationResult | undefined }>({});

  
  useEffect(() => {
    console.log(username);
  }, [username])
  const handleOnPress = () => {
    Alert.alert('Alert', 'Button was pressed', [
      { text: 'Okay', onPress: () => console.log('Okay was pressed') },
      { text: 'Cancel', style: 'cancel', onPress: () => console.log('Cancel was pressed') },
      { text: 'Delete', style: 'destructive', onPress: () => console.log('Delete was pressed') }
    ])
  }
  const handleOnSubmit = async() => {
    await AsyncStorage.setItem('reg', JSON.stringify({ username, email, password}))
  }
    const handleOnGetData = async () => {
    const rawData = await AsyncStorage.getItem('reg');
    const data = rawData ? JSON.parse(rawData) : null;
    console.log({ data });
  };

  const handleInput = (type: string, stateName: string, value: string) => {
  setErrors(prevErrors => ({
    ...prevErrors,
    [stateName]: validateInput(type, value)
  }));
};
const handleShowAlert = () => {
  ToastAndroid.show("Tried to navigate the Registration", 300);
};
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="position">
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.formTitle}>Register</Text>
          
          <CustomInput 
          name={'User Name'} 
          onChange={setUsername}
          onBlur={() => handleInput('string', 'username', username)}
            error={errors ?.username?.error}/>

          <CustomInput 
          name={'Email'} 
          onChange={setEmail}
          onBlur={() => handleInput('string', 'email', email)}
            error={errors ?.email?.error}/>

          <CustomInput 
          name={'Password'} 
          onChange={setPassword}
          onBlur={() => handleInput('string', 'password', password)}
            error={errors ?.password?.error}/>

          <Pressable style={styles.button} onPress={() => handleOnSubmit()}>
  <Text style={styles.buttonText}>Submit</Text>
</Pressable>
<Pressable style={styles.button} onPress={() => handleOnGetData()}>
  <Text style={styles.buttonText}>Get data</Text>
</Pressable>
<View style={styles.signinSection}>
  <Text style={{ color: '#000000' }}>Already have an account?</Text>
  <Pressable onPress={() => handleShowAlert()}>
    <Text style={{ color: '#1b6be8', padding: 5 }}>Sign In</Text>
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
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#ffffff',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#121c24',
    color: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#717171',
    fontSize: 16,
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
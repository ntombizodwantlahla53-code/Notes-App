import { Button, Text, View, Pressable, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Dimensions, Alert, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import CustomInput from '../../CustomInput';

export default function Registration() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
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
  const handleOnLongPress = () => {
    ToastAndroid.show('Button was long pressed...', 3000)
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="position">
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.formTitle}>Register</Text>
          
          <CustomInput name={'User Name'} onChange={setUsername}/>
          <CustomInput name={'Email'} onChange={setEmail}/>
          <CustomInput name={'Password'} onChange={setPassword}/>
          
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
});
import { Component } from 'react';
import {View,Text,Pressable,StyleSheet,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Notes App</Text>
      <Text style={styles.message}>No notes added yet</Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Add Notes</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010709',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  message: {
    color: '#BDBDDB',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#306A68',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
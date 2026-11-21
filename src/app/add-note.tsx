import { Alert, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface Note {
  id: string;
  title: string;
  description: string;
  email: string;
}
export default function AddNote() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const handleSaveNote = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please enter a note and description.');
      return;
    }
    try {
      const currentUserData = await AsyncStorage.getItem('currentUser');
      if (!currentUserData) {
        Alert.alert('Error', 'Please log in first.');
        return;
      }
      const currentUser = JSON.parse(currentUserData);
      const savedNotes = await AsyncStorage.getItem('notes');
      const notes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];
      const newNote: Note = {
        id: Date.now().toString(),
        title: title,
        description: description,
        email: currentUser.email
      };

      notes.push(newNote);
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
      Alert.alert('Success', 'Note saved successfully.');
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', 'Could not save your note.');
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Notes</Text>
      <Text style={styles.label}>Note</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter note title"
        placeholderTextColor="#717171"
        value={title}
        onChangeText={setTitle}/>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.description}
        placeholder="Enter note description"
        placeholderTextColor="#717171"
        multiline
        value={description}
        onChangeText={setDescription}/>

      <Pressable style={styles.button} onPress={handleSaveNote}>
        <Text style={styles.buttonText}>Save Note</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010709',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#121c24',
    color: '#ffffff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  description: {
    backgroundColor: '#121c24',
    color: '#ffffff',
    padding: 14,
    borderRadius: 8,
    height: 130,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#306A68',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
import { Component } from 'react';
import {View,Text,Pressable,StyleSheet,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router ,useFocusEffect} from 'expo-router';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';

interface Note {
  id: string;
  title?: string;
  notes: string;
  category: string;
  dateAdded: string;
  email: string;
}
export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const getNotes = async () => {
    try {
      const currentUserData = await AsyncStorage.getItem('currentUser');
      if (!currentUserData) {
        router.replace('/login');
        return;
      }
      const currentUser = JSON.parse(currentUserData);
      const savedNotes = await AsyncStorage.getItem('notes');
      const allNotes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];
      const userNotes = allNotes.filter(
        note => note.email === currentUser.email
      );
      setNotes(userNotes);
    } catch (error) {
      console.log('Error loading notes:', error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getNotes();
    }, [])
  );
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Notes App</Text>
        <Pressable
          style={styles.button}
          onPress={() => router.push('/add-note')}
        >
          <Text style={styles.buttonText}>Add Notes</Text>
        </Pressable>
        {notes.length === 0 ? (
          <Text style={styles.message}>No notes added yet</Text>
        ) : (
          notes.map(note => (
            <View key={note.id} style={styles.noteCard}>
              {note.title ? (
                <Text style={styles.noteTitle}>{note.title}</Text>
              ) : null}

              <Text style={styles.noteDescription}>{note.notes}</Text>

              <Text style={styles.noteDetails}>
                Category: {note.category}
              </Text>

              <Text style={styles.noteDetails}>
                Date added: {new Date(note.dateAdded).toLocaleDateString()}
              </Text>
              <Pressable style={styles.viewButton} 
              onPress={() => router.push({ pathname: '/view-note', params: { id: note.id }})}>
                <Text style={styles.viewButtonText}>View</Text>
                </Pressable>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010709',
  },
  content: {
    padding: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  message: {
    color: '#BDBDDB',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#306A68',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteCard: {
    backgroundColor: '#121c24',
    padding: 16,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#306A68',
  },
  noteTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noteDescription: {
    color: '#ffffff',
    fontSize: 15,
    marginBottom: 12,
  },
  noteDetails: {
    color: '#BDBDDB',
    fontSize: 13,
    marginTop: 5,
  },
  viewButton: {
  backgroundColor: '#306A68',
  padding: 10,
  borderRadius: 6,
  alignItems: 'center',
  marginTop: 12,
},
viewButtonText: {
  color: '#ffffff',
  fontWeight: 'bold',
},
});
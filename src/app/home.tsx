import { Component } from 'react';
import {View,Text,Pressable,StyleSheet,ScrollView,Alert} from 'react-native';
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
  dateUpdated?: string;
  email: string;
}
export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [sortOrder, setSortOrder] = useState<'ascending' | 'descending'>('descending');
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
  const handleDeleteNote = (noteId: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const currentUserData = await AsyncStorage.getItem('currentUser');
              if (!currentUserData) {
                router.replace('/login');
                return;
              }
              const currentUser = JSON.parse(currentUserData);
              const savedNotes = await AsyncStorage.getItem('notes');
              const allNotes: Note[] = savedNotes
                ? JSON.parse(savedNotes)
                : [];
              const updatedNotes = allNotes.filter(
                note => !(note.id === noteId && note.email === currentUser.email)
              );
              await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
              setNotes(previousNotes =>
                previousNotes.filter(note => note.id !== noteId)
              );
              Alert.alert('Success', 'Note deleted successfully.');
            } catch (error) {
              Alert.alert('Error', 'Could not delete the note.');
              console.log(error);
            }
          },
        },
      ]
    );
  };
  const sortedNotes = [...notes].sort((firstNote, secondNote) => {
    const firstDate = new Date(firstNote.dateAdded).getTime();
    const secondDate = new Date(secondNote.dateAdded).getTime();
    if (sortOrder === 'ascending') {
      return firstDate - secondDate;
    }
    return secondDate - firstDate;
  });

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
        {notes.length > 0 && (
          <View style={styles.sortSection}>
            <Text style={styles.sortTitle}>Sort by Date Added</Text>
            <View style={styles.sortButtons}>
              <Pressable
                style={[ styles.sortButton, sortOrder === 'ascending' && styles.activeSortButton
                ]}
                onPress={() => setSortOrder('ascending')}>
                <Text style={styles.sortButtonText}>Oldest First</Text>
              </Pressable>

              <Pressable
                style={[styles.sortButton, sortOrder === 'descending' && styles.activeSortButton
                ]}
                onPress={() => setSortOrder('descending')}>
                <Text style={styles.sortButtonText}>Newest First</Text>
              </Pressable>
            </View>
          </View>
        )}
        {notes.length === 0 ? (
          <Text style={styles.message}>No notes added yet</Text>
        ) : (
          sortedNotes.map(note => (
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
              {note.dateUpdated ? (
                <Text style={styles.noteDetails}>
                  Last updated: {new Date(note.dateUpdated).toLocaleString()}
                </Text>
              ) : null}

              <Pressable
                style={styles.viewButton}
                onPress={() =>
                  router.push({
                    pathname: '/view-note',
                    params: { id: note.id }
                  })
                }
              >
                <Text style={styles.viewButtonText}>View</Text>
              </Pressable>

              <Pressable
                style={styles.editButton}
                onPress={() =>
                  router.push({
                    pathname: '/edit-note',
                    params: { id: note.id }
                  })
                }
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </Pressable>
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDeleteNote(note.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
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
  sortSection: {
    marginBottom: 20,
  },
  sortTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  sortButton: {
    flex: 1,
    backgroundColor: '#121c24',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#306A68',
  },
  activeSortButton: {
    backgroundColor: '#306A68',
  },
  sortButtonText: {
    color: '#ffffff',
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
  editButton: {
    backgroundColor: '#455A64',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#8B3030',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
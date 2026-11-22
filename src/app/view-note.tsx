import { useEffect, useState } from 'react';
import {View,Text,StyleSheet,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, router } from 'expo-router';

interface Note {
  id: string;
  title?: string;
  notes: string;
  category: string;
  dateAdded: string;
  dateUpdated?: string;
  email: string;
}
export default function ViewNote() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getNote = async () => {
      try {
        const currentUserData = await AsyncStorage.getItem('currentUser');
        const savedNotes = await AsyncStorage.getItem('notes');

        if (!currentUserData || !savedNotes) {
          router.replace('/login');
          return;
        }
        const currentUser = JSON.parse(currentUserData);
        const allNotes: Note[] = JSON.parse(savedNotes);
        const selectedNote = allNotes.find(
          item => item.id === id && item.email === currentUser.email
        );
        if (selectedNote) {
          setNote(selectedNote);
        }
      } catch (error) {
        console.log('Error viewing note:', error);
      } finally {
        setLoading(false);
      }
    };
    getNote();
  }, [id]);
  if (loading) {
    return <ActivityIndicator style={styles.loading} color="#306A68" />;
  }

  if (!note) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Note not found.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>View Note</Text>
      {note.title ? (
        <Text style={styles.title}>{note.title}</Text>
      ) : null}
      <Text style={styles.label}>Notes</Text>
      <Text style={styles.text}>{note.notes}</Text>
      <Text style={styles.label}>Category</Text>
      <Text style={styles.text}>{note.category}</Text>
      <Text style={styles.label}>Date Added</Text>
      <Text style={styles.text}>
        {new Date(note.dateAdded).toLocaleString()}
      </Text>
      {note.dateUpdated ? (
        <>
          <Text style={styles.label}>Last Updated</Text>
          <Text style={styles.text}>
            {new Date(note.dateUpdated).toLocaleString()}
          </Text>
        </>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010709',
    padding: 20,
  },
  loading: {
    flex: 1,
  },
  heading: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  title: {
    color: '#ffffff',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: '#306A68',
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 7,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
});

import { Alert, View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import { useState ,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router ,useLocalSearchParams } from 'expo-router';

interface Note {
  id: string;
  title?: string;
  notes: string;
  category: string;
  dateAdded: string;
  dateUpdated?: string;
  email: string;
}
export default function EditNote() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [originalNote, setOriginalNote] = useState<Note | null>(null);
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
          note => note.id === id && note.email === currentUser.email
        );
        if (!selectedNote) {
          Alert.alert('Error', 'Note not found.');
          router.replace('/home');
          return;
        }
        setOriginalNote(selectedNote);
        setTitle(selectedNote.title || '');
        setNotes(selectedNote.notes);
        setCategory(selectedNote.category);
      } catch (error) {
        Alert.alert('Error', 'Could not load the note.');
        console.log(error);
      }
    };
    getNote();
  }, [id]);

  const handleUpdateNote = async () => {
    if (!notes.trim() || !category.trim()) {
      Alert.alert('Error', 'Please enter your notes and category.');
      return;
    }
    try {
      const currentUserData = await AsyncStorage.getItem('currentUser');
      const savedNotes = await AsyncStorage.getItem('notes');
      if (!currentUserData || !savedNotes || !originalNote) {
        Alert.alert('Error', 'Could not update the note.');
        return;
      }
      const currentUser = JSON.parse(currentUserData);
      const allNotes: Note[] = JSON.parse(savedNotes);
      const updatedNotes = allNotes.map(note => {
        if (note.id === id && note.email === currentUser.email) {
          return {
            ...note,
            title: title.trim(),
            notes: notes.trim(),
            category: category.trim(),
            dateUpdated: new Date().toISOString()
          };
        }
        return note;
      });
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      Alert.alert('Success', 'Note updated successfully!');
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', 'Could not update the note.');
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Note</Text>
      <Text style={styles.label}>Title (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        placeholderTextColor="#717171"
        value={title}
        onChangeText={setTitle}/>

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.description}
        placeholder="Write your notes here"
        placeholderTextColor="#717171"
        multiline
        value={notes}
        onChangeText={setNotes}/>

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter category"
        placeholderTextColor="#717171"
        value={category}
        onChangeText={setCategory}/>

      <Pressable style={styles.saveButton} onPress={handleUpdateNote}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </Pressable>
      <Pressable
        style={styles.cancelButton}
        onPress={() => router.replace('/home')}>
        <Text style={styles.buttonText}>Cancel</Text>
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
  heading: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
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
  saveButton: {
    backgroundColor: '#306A68',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#555555',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
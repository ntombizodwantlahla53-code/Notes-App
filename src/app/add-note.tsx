import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default function AddNote() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Notes</Text>
      <Text style={styles.label}>Note</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter note title"
        placeholderTextColor="#717171"/>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.description}
        placeholder="Enter note description"
        placeholderTextColor="#717171"
        multiline/>
      <Pressable style={styles.button}>
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
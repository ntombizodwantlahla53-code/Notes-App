import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

interface CustomInputProps {
  name: string;
  onChange: (text: string) => void;
  onBlur?: () => void;
  error?: string | null;
}

const CustomInput = ({ onChange, name, onBlur, error }: CustomInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{name}</Text>
      <TextInput
        style={styles.input}
        placeholder={name}
        placeholderTextColor={'#717171'}
        onChangeText={(text) => { onChange(text); }}
        onBlur={onBlur}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    gap: 5
  },
  label: {
    color: '#808080'
  },
  input: {
    borderRadius: 5,
    borderColor: '#808080',
    padding: 5,
    paddingHorizontal: 10,
    color: '#ffffff',
    borderWidth: 0.8
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 12
  }
});

import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

interface CustomInputProps {
  name: string;
  onChange: (text: string) => void;
}

const CustomInput = ({ onChange, name }: CustomInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{name}</Text>
      <TextInput
        style={styles.input}
        placeholder={name}
        placeholderTextColor={'#717171'}
        onChangeText={(text) => { onChange(text) }}
      />
    </View>
  )
}

export default CustomInput

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
    color: '#060606',
    borderWidth: 0.8
  }
})

import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { InputProps } from './types';

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={text => onChange && onChange(text)}
        style={styles.textInput}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '90%',
    height: 50,
    backgroundColor: '#D9F0FF',
    borderRadius: 10,
    fontFamily: 'Montserrat',
    paddingLeft: 20,
  },
});

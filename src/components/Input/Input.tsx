import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { InputProps } from './types';

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange: onChangeText,
  ...props
}) => {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={text => onChangeText && onChangeText(text)}
        style={styles.textInput}
        {...props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#D9F0FF',
    borderRadius: 10,
    fontFamily: 'Montserrat',
    paddingLeft: 20,
  },
});

import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { InputProps } from './types';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  inBottomSheet,
  onChange: onChangeText,
  ...props
}) => {
  return (
    <>
      {inBottomSheet ? (
        <BottomSheetTextInput
          placeholder={placeholder}
          placeholderTextColor={'#00000066'}
          value={value}
          onChangeText={text => onChangeText && onChangeText(text)}
          style={styles.textInput}
          autoCapitalize={'none'}
          {...props}
        />
      ) : (
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={'#00000066'}
          value={value}
          onChangeText={text => onChangeText && onChangeText(text)}
          style={styles.textInput}
          autoCapitalize={'none'}
          {...props}
        />
      )}
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

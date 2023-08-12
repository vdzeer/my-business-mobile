import { Platform, StyleSheet, Text, TextInput } from 'react-native';
import React from 'react';
import { InputProps } from './types';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Divider } from '../Divider';

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
        <>
          <Text style={styles.title}>{placeholder}</Text>
          <Divider height={10} />
          <BottomSheetTextInput
            placeholder={placeholder}
            placeholderTextColor={'#00000066'}
            value={value}
            onChangeText={text => onChangeText && onChangeText(text)}
            style={styles.textInput}
            autoCapitalize={'none'}
            {...props}
          />
        </>
      ) : (
        <>
          <Text style={styles.title}>{placeholder}</Text>
          <Divider height={10} />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={'#00000066'}
            value={value}
            onChangeText={text => onChangeText && onChangeText(text)}
            style={styles.textInput}
            autoCapitalize={'none'}
            {...props}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    width: '100%',
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',
  },
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#D9F0FF',
    borderRadius: 10,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',

    paddingLeft: 20,
  },
});

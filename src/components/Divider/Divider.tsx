import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import React from 'react';
import { DividerProps } from './types';

export const Divider: React.FC<DividerProps> = ({ width, height }) => {
  return (
    <>
      <View style={{ width: width || 0, height: height || 0 }} />
    </>
  );
};

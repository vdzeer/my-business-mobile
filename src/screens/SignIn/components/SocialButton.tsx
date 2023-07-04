import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from '../../../components';
import { SocialButtonProps } from './types';

export const SocialButton = ({ icon, onPress }: SocialButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      // activeOpacity={1}
      style={styles.buttonWrapper}>
      <View style={styles.iconWrapper}>
        <Icon name={icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: 25,
    height: 25,
  },
  buttonWrapper: {
    backgroundColor: '#A3D5FF',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

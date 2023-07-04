import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from '../Icon';

export const AuthButton = ({ text, onPress, withIcon = false }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[
        styles.buttonWrapper,
        { justifyContent: withIcon ? 'space-between' : 'center' },
      ]}>
      <Text style={styles.buttonText}>{text}</Text>
      {withIcon && (
        <View style={styles.iconWrapper}>
          <Icon name="arrowRight" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: 10,
    height: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    backgroundColor: '#6F73D2',
    height: 44,
    width: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
  },
});

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { ActionButtonProps } from './types';
import { Icon } from '../Icon';

export const ActionButton: React.FC<ActionButtonProps> = ({
  iconName,
  onPress,
  size = 'small',
  disabled,
  onPressIn = () => {},
  onPressOut = () => {},
}) => {
  return (
    <>
      <TouchableOpacity
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          styles.addButton,
          {
            width: size === 'small' ? 20 : 34,
            height: size === 'small' ? 20 : 34,
            borderRadius: size === 'small' ? 5 : 10,
            padding: size === 'small' ? 5 : 10,
          },
        ]}
        disabled={disabled}
        onPress={onPress}>
        <Icon name={iconName} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#6F73D2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

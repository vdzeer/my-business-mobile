import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { ButtonProps } from './types';
import { Icon } from '../Icon';

export const Button: React.FC<ButtonProps> = ({
  text,
  withIcon = false,
  onPress,
  mode = 'small',
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.buttonWrapper,
          {
            justifyContent: withIcon ? 'space-between' : 'center',
            // width: mode === 'large' ? 250 : 150,
            backgroundColor: mode === 'lite' ? 'transparent' : '#83C9F4',
            paddingHorizontal: mode === 'lite' ? 0 : 15,
          },
        ]}>
        <Text style={styles.buttonText} numberOfLines={1}>
          {text}
        </Text>
        {withIcon && (
          <View style={styles.iconWrapper}>
            <Icon name="arrowRightBlack" />
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    height: 40,
    backgroundColor: '#83C9F4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  iconWrapper: {
    width: 10,
    height: 10,
  },
  buttonText: {
    color: '#000000',
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
});

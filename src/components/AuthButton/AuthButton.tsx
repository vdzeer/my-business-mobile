import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from '../Icon';
import { AuthButtonProps } from './types';

export const AuthButton = ({
  text,
  onPress,
  withIcon = false,
}: AuthButtonProps) => {
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
  buttonText: {
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',
  },
  buttonWrapper: {
    zIndex: 10,
    flexDirection: 'row',
    backgroundColor: '#6F73D2',
    height: 44,
    width: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
});

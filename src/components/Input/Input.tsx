import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { InputProps } from './types';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Divider } from '../Divider';
import { Icon } from '../Icon';

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  inBottomSheet,
  onChange: onChangeText,
  isValid,
  type,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(
    type === 'password' ? true : false,
  );
  return (
    <>
      {inBottomSheet ? (
        <View style={styles.wrapper}>
          <Text style={styles.title}>{placeholder}</Text>
          <Divider height={10} />
          <BottomSheetTextInput
            placeholder={placeholder}
            placeholderTextColor={'#00000066'}
            value={value}
            onChangeText={text => onChangeText && onChangeText(text)}
            style={[styles.textInput, {}]}
            autoCapitalize={'none'}
            {...props}
            secureTextEntry={isVisible}
          />
          {props?.secureTextEntry && (
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setIsVisible(prev => !prev)}>
              <Icon name={isVisible ? 'eye' : 'eyeClosed'} />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.wrapper}>
          <Text style={styles.title}>{placeholder}</Text>
          <Divider height={10} />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={'#00000066'}
            value={value}
            onChangeText={text => onChangeText && onChangeText(text)}
            style={[
              styles.textInput,
              {
                borderWidth: !isValid ? 1 : 0,
                borderColor: !isValid ? 'red' : 'white',
              },
            ]}
            autoCapitalize={'none'}
            {...props}
            secureTextEntry={isVisible}
          />
          {props?.secureTextEntry && (
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setIsVisible(prev => !prev)}>
              <Icon name={isVisible ? 'eye' : 'eyeClosed'} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  icon: {
    position: 'absolute',
    right: 20,
    width: 20,
    height: 20,
    top: 43,
  },
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

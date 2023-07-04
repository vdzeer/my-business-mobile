import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SignInProps } from './types';
import { Button, Divider, Icon, Input } from '../../components';
import { SocialButton } from './components/SocialButton';

export const SignIn: React.FC<SignInProps> = () => {
  const onPressDismiss = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={onPressDismiss}>
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Icon name="logo" />
        </View>
        <Text style={styles.mainText}>SIGN IN</Text>
        <Divider height={40} />
        <Input placeholder="Email" />
        <Divider height={20} />

        <Input placeholder="Password" />
        <Divider height={20} />
        <View style={styles.loginButtonsWrapper}>
          <Button text="Sign In" onPress={() => {}} />

          <Button text="Forgot password?" onPress={() => {}} mode="lite" />
        </View>
        <Divider height={20} />

        <Text style={styles.secondaryText}>
          or sign in using social accounts
        </Text>
        <Divider height={20} />

        <View style={styles.socialButtonsWrapper}>
          <SocialButton icon="google" onPress={() => {}} />
          <Divider width={20} />
          <SocialButton icon="apple" onPress={() => {}} />
        </View>
        <Divider height={20} />

        <Text style={styles.descriptionText}>
          Don’t have an account? Sign-up and manage your business
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoWrapper: { width: 85, height: 85, marginBottom: 30 },
  loginButtonsWrapper: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },

  socialButtonsWrapper: { flexDirection: 'row' },
  mainText: {
    color: '#000000',
    fontSize: 28,
    fontFamily: 'Montserrat',
    fontWeight: '700',
  },
  secondaryText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  descriptionText: {
    position: 'absolute',
    bottom: 40,
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
});

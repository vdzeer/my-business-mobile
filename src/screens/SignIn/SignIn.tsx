import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SignInProps } from './types';
import { Button, Divider, Icon, Input } from '../../components';
import { SocialButton } from './components/SocialButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../store/api';
import { login, register } from '../../store/slices/auth';

export const SignIn: React.FC<SignInProps> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const [stage, setStage] = useState(true);
  const onPressDismiss = () => {
    Keyboard.dismiss();
  };
  const auth = useSelector((store: any) => store.auth);
  return (
    <TouchableWithoutFeedback onPress={onPressDismiss}>
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Icon name="logo" />
        </View>
        <Text style={styles.mainText}>{stage ? 'SIGN IN' : 'SIGN UP'}</Text>
        <Divider height={40} />
        <Input placeholder="Email" />
        <Divider height={20} />

        <Input placeholder="Password" />
        <Divider height={20} />
        <View style={styles.loginButtonsWrapper}>
          <Button
            text={stage ? 'Sign In' : 'Sign Up'}
            onPress={() => {
              stage
                ? dispatch(
                    //@ts-ignore
                    login({
                      email: 'vdzerniuk@gmail.com',
                      password: 'qwerty',
                    }),
                  )
                : dispatch(
                    //@ts-ignore
                    register({
                      email: 'maxft2206@gmail.com',
                      password: 'max88283920',
                      role: 'creator',
                    }),
                  );
            }}
          />

          <Button
            text={stage ? 'Forgot password?' : 'Already here?'}
            onPress={() => {
              stage ? navigation.navigate('ForgotPassword') : setStage(true);
            }}
            mode="lite"
          />
        </View>
        <Divider height={20} />

        <Text style={styles.secondaryText}>
          {`or sign ${stage ? 'in' : 'up'} using social accounts`}
        </Text>
        <Divider height={20} />

        <View style={styles.socialButtonsWrapper}>
          <SocialButton icon="google" onPress={() => {}} />
          <Divider width={20} />
          <SocialButton icon="apple" onPress={() => {}} />
        </View>
        <Divider height={20} />
        {stage && (
          <TouchableOpacity
            style={styles.descriptionWrapper}
            onPress={() => {
              setStage(false);
            }}>
            <Text style={styles.descriptionText}>
              Don’t have an account? Sign-up and manage your business
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  logoWrapper: { width: 85, height: 85, marginBottom: 30 },
  loginButtonsWrapper: {
    flexDirection: 'row',
    width: '100%',
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
  descriptionWrapper: {
    position: 'absolute',
    bottom: 40,
  },
  descriptionText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
});

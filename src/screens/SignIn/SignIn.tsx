import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import { google, login, register, apple } from '../../store/slices/auth';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { useTranslation } from 'react-i18next';

export const SignIn: React.FC<SignInProps> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const [stage, setStage] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <Text style={styles.mainText}>{stage ? t('hello') : 'SIGN UP'}</Text>
        <Divider height={40} />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Divider height={20} />

        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Divider height={20} />
        <View style={styles.loginButtonsWrapper}>
          <Button
            text={stage ? 'Sign In' : 'Sign Up'}
            onPress={() => {
              stage
                ? dispatch(
                    //@ts-ignore
                    login({
                      email,
                      password,
                    }),
                  )
                : dispatch(
                    //@ts-ignore
                    register({
                      email,
                      password,
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
          <SocialButton
            icon="google"
            onPress={() => {
              GoogleSignin.configure({
                iosClientId:
                  '358498520193-q97bfmd28em84qlp4snol4ou039ck7qt.apps.googleusercontent.com',
              });

              GoogleSignin.hasPlayServices().then(hasPlayService => {
                if (hasPlayService) {
                  GoogleSignin.signIn()
                    .then(userInfo => {
                      dispatch(
                        //@ts-ignore
                        google({
                          code: userInfo.idToken,
                        }),
                      );
                    })
                    .catch(e => {
                      console.log('ERROR IS: ' + JSON.stringify(e));
                    });
                }
              });
            }}
          />
          <Divider width={20} />
          <SocialButton
            icon="apple"
            onPress={async () => {
              const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [
                  appleAuth.Scope.EMAIL,
                  appleAuth.Scope.FULL_NAME,
                ],
              });

              if (appleAuthRequestResponse.authorizationCode) {
                dispatch(
                  //@ts-ignore
                  apple({
                    code: appleAuthRequestResponse.authorizationCode,
                  }),
                );
              }
            }}
          />
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

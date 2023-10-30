import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SignInProps } from './types';
import { Button, Divider, Icon, Input, KeyboardAware } from '../../components';
import { SocialButton } from './components/SocialButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../store/api';
import { google, login, register, apple } from '../../store/slices/auth';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { useTranslation } from 'react-i18next';
import { emailReg } from '../../store/config';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { TOASTS } from '../../i18n/toasts';
import i18n from '../../i18n';

export const SignIn: React.FC<SignInProps> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const [stage, setStage] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidForm, setIsValidForm] = useState({
    email: true,
    password: true,
  });

  const validateForm = (onSuccess: any) => {
    let isValid = true;
    if (emailReg.test(email)) {
      setIsValidForm(prev => ({ ...prev, email: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, email: false }));
    }
    if (password.length > 6) {
      setIsValidForm(prev => ({ ...prev, password: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, password: false }));
    }
    if (isValid) {
      onSuccess();
    }
  };

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAware>
      <TouchableWithoutFeedback onPress={onPressDismiss}>
        <View style={styles.container}>
          <Divider height={60} />

          <View style={styles.logoWrapper}>
            <Icon name="logo" />
          </View>
          <Text style={styles.mainText}>
            {stage ? t('signin').toUpperCase() : t('signup').toUpperCase()}
          </Text>
          <Divider height={20} />
          <Input
            placeholder={t('email')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            isValid={isValidForm.email}
          />
          <Divider height={20} />

          <Input
            placeholder={t('password')}
            value={password}
            onChangeText={setPassword}
            isValid={isValidForm.password}
            secureTextEntry
            type={'password'}
          />
          <Divider height={20} />
          <View style={styles.loginButtonsWrapper}>
            <View style={styles.loginButtonsWrapper2}>
              <Button
                text={stage ? t('signin') : t('signup')}
                onPress={() => {
                  validateForm(
                    stage
                      ? () =>
                          dispatch(
                            //@ts-ignore
                            login(
                              {
                                email,
                                password,
                              },
                              () => {},
                              (error: string) => {
                                Toast.show({
                                  text1: TOASTS[i18n.language].ERROR,
                                  text2:
                                    TOASTS[i18n.language][error] ??
                                    'Unexpected error',
                                  type: 'error',
                                });
                              },
                            ),
                          )
                      : () =>
                          dispatch(
                            //@ts-ignore
                            register(
                              {
                                email,
                                password,
                                role: 'creator',
                              },
                              () => {},
                              (error: string) => {
                                Toast.show({
                                  text1: TOASTS[i18n.language].ERROR,
                                  text2:
                                    TOASTS[i18n.language][error] ??
                                    'Unexpected error',
                                  type: 'error',
                                });
                              },
                            ),
                          ),
                  );
                }}
              />
            </View>
            <View style={styles.loginButtonsWrapper2}>
              <Button
                text={stage ? t('forgot') : t('already')}
                onPress={() => {
                  stage
                    ? navigation.navigate('ForgotPassword')
                    : setStage(true);
                }}
                mode="lite"
              />
            </View>
          </View>
          <Divider height={20} />

          <Text style={styles.secondaryText}>
            {stage ? t('signin.desc') : t('signup.desc')}
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
                    GoogleSignin.signIn().then(userInfo => {
                      dispatch(
                        //@ts-ignore
                        google(
                          {
                            code: userInfo.idToken,
                          },
                          () => {},
                          (error: string) => {
                            Toast.show({
                              text1: TOASTS[i18n.language].ERROR,
                              text2:
                                TOASTS[i18n.language][error] ??
                                'Unexpected error',
                              type: 'error',
                            });
                          },
                        ),
                      );
                    });
                  }
                });
              }}
            />
            <Divider width={20} />
            <SocialButton
              icon="apple"
              onPress={async () => {
                const appleAuthRequestResponse = await appleAuth.performRequest(
                  {
                    requestedOperation: appleAuth.Operation.LOGIN,
                    requestedScopes: [
                      appleAuth.Scope.EMAIL,
                      appleAuth.Scope.FULL_NAME,
                    ],
                  },
                );

                if (appleAuthRequestResponse.identityToken) {
                  dispatch(
                    //@ts-ignore
                    apple(
                      {
                        code: appleAuthRequestResponse.identityToken,
                      },
                      () => {},
                      (error: string) => {
                        Toast.show({
                          text1: TOASTS[i18n.language].ERROR,
                          text2:
                            TOASTS[i18n.language][error] ?? 'Unexpected error',
                          type: 'error',
                        });
                      },
                    ),
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
                {t('changeRegistration')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAware>
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
  loginButtonsWrapper2: {
    width: '50%',
  },

  socialButtonsWrapper: { flexDirection: 'row' },
  mainText: {
    color: '#000000',
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Bold',

    fontWeight: Platform.OS === 'ios' ? '700' : '600',
  },
  secondaryText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',
  },
  descriptionWrapper: {
    // position: 'absolute',
    // bottom: 40,
  },
  descriptionText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',

    textAlign: 'center',
  },
});

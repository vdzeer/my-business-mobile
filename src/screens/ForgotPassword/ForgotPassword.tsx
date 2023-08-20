import React, { useState } from 'react';
import {
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ForgotPasswordProps } from './types';
import { Button, Divider, Icon, Input, KeyboardAware } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { forgotPassword } from '../../store/slices/auth';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { emailReg } from '../../store/config';

export const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [email, setEmail] = useState('');

  const [isValidForm, setIsValidForm] = useState({
    email: true,
  });

  const validateForm = (onSuccess: any) => {
    let isValid = true;

    if (emailReg.test(email)) {
      setIsValidForm(prev => ({ ...prev, email: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, email: false }));
    }

    if (isValid) {
      onSuccess();
    }
  };

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };
  return (
    <SafeAreaView style={styles.area}>
      <KeyboardAware>
        <TouchableWithoutFeedback onPress={onPressDismiss}>
          <View style={styles.container}>
            <Divider height={140} />

            <Text style={styles.titleText}>{t('forgotPassword')}</Text>
            <Divider height={40} />
            <Text style={styles.descriptionText}>
              {t('forgotPasswordDesc')}
            </Text>
            <Divider height={60} />

            <Input
              placeholder={t('email')}
              value={email}
              onChange={setEmail}
              isValid={isValidForm.email}
            />
            <Divider height={20} />

            <View style={styles.buttonsWrapper}>
              <View style={styles.buttonsWrapper2}>
                <Button
                  text={t('restore')}
                  onPress={() => {
                    validateForm(() =>
                      dispatch(
                        //@ts-ignore
                        forgotPassword(
                          {
                            email,
                          },
                          () => {
                            navigation.goBack();
                          },
                        ),
                      ),
                    );
                  }}
                />
              </View>
              <View style={styles.buttonsWrapper2}>
                <Button
                  text={t('back')}
                  withIcon
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              </View>
            </View>
            <Divider height={140} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAware>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonsWrapper2: { width: '48%' },
  area: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Bold',

    fontWeight: '600',
    color: '#000000',
    fontSize: 28,
  },
  descriptionText: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',

    color: '#000000',
    fontSize: 16,
    opacity: 0.5,
    width: '60%',
  },
});

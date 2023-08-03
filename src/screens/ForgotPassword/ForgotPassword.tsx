import React, { useState } from 'react';
import {
  Keyboard,
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

export const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [email, setEmail] = useState('');

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };
  return (
    <SafeAreaView style={styles.area}>
      <TouchableWithoutFeedback onPress={onPressDismiss}>
        <KeyboardAware>
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
              onChange={v => setEmail(v)}
            />
            <Divider height={20} />

            <View style={styles.buttonsWrapper}>
              <View style={styles.buttonsWrapper2}>
                <Button
                  text={t('restore')}
                  onPress={() => {
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
        </KeyboardAware>
      </TouchableWithoutFeedback>
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
    fontFamily: 'Montserrat',
    fontWeight: '700',
    color: '#000000',
    fontSize: 28,
  },
  descriptionText: {
    fontFamily: 'Montserrat',
    color: '#000000',
    fontSize: 16,
    opacity: 0.5,
    width: '60%',
  },
});

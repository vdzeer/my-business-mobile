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
import { Button, Divider, Icon, Input } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../store/slices/auth';
import { useTranslation } from 'react-i18next';

export const ResetPassword: React.FC<ForgotPasswordProps> = ({
  route,
}: any) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const params = route.params || {};
  const { token, email } = params;

  const [password, setPassword] = useState('');

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };
  return (
    <SafeAreaView style={styles.area}>
      <TouchableWithoutFeedback onPress={onPressDismiss}>
        <View style={styles.container}>
          <Text style={styles.titleText}>{t('resetPassword')}</Text>
          <Divider height={60} />

          <Input
            placeholder={t('newPassword')}
            value={password}
            secureTextEntry
            onChange={v => setPassword(v)}
          />
          <Divider height={20} />

          <View style={styles.buttonsWrapper}>
            <View style={styles.buttonsWrapper2}>
              <Button
                text={t('save')}
                onPress={() => {
                  dispatch(
                    //@ts-ignore
                    resetPassword(
                      {
                        newPassword: password,
                        email,
                        token,
                      },
                      () => {
                        navigation.navigate('SignIn');
                      },
                    ),
                  );
                }}
              />
            </View>

            <Button
              text={t('back')}
              withIcon
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            />
          </View>
          <Divider height={140} />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  buttonsWrapper2: {
    width: '70%',
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

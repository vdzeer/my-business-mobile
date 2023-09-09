import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  ImageInput,
  Input,
  KeyboardAware,
} from '../../components';
import { useNavigation } from '@react-navigation/native';
import { CreateBusinessProps } from './types';
import DeviceInfo from 'react-native-device-info';
import { useDispatch } from 'react-redux';
import { createBusiness } from '../../store/slices/business';

import { useTranslation } from 'react-i18next';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { TOASTS } from '../../i18n/toasts';
import i18n from '../../i18n';

export const CreateBusiness: React.FC<CreateBusinessProps> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState<any>('');

  const [isValidForm, setIsValidForm] = useState({
    name: true,
    password: true,
    photo: true,
  });

  const validateForm = (onSuccess: any) => {
    let isValid = true;

    if (name.length > 2 && name.length < 20) {
      setIsValidForm(prev => ({ ...prev, name: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, name: false }));
    }
    if (password.length > 6) {
      setIsValidForm(prev => ({ ...prev, password: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, password: false }));
    }
    if (photo?.filename) {
      setIsValidForm(prev => ({ ...prev, photo: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, photo: false }));
    }

    if (isValid) {
      onSuccess();
    }
  };

  return (
    <SafeAreaView style={styles.area}>
      <KeyboardAware>
        <TouchableWithoutFeedback onPress={onPressDismiss}>
          <View style={styles.container}>
            <Divider height={140} />

            <Text style={styles.titleText}>{t('createBusiness')}</Text>

            <Divider height={80} />

            <Input
              placeholder={t('name')}
              onChange={setName}
              isValid={isValidForm.name}
            />
            <Divider height={20} />
            <Input
              placeholder={t('password')}
              onChange={setPassword}
              secureTextEntry
              isValid={isValidForm.password}
            />
            <Divider height={20} />
            <ImageInput onSelect={setPhoto} isValid={isValidForm.photo} />

            <Divider height={60} />

            {/* <View style={styles.buttonsWrapper}> */}
            <Button
              text={t('submit')}
              onPress={() => {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('password', password);
                photo.path &&
                  formData.append('image', {
                    name: photo.filename,
                    type: photo.mime ?? 'image/jpeg',
                    uri: photo.path,
                  } as any);
                validateForm(() =>
                  dispatch(
                    createBusiness(
                      formData,
                      () => {
                        Toast.show({
                          text1: TOASTS[i18n.language].SUCCESS_BUSINESS_CREATE,
                        });
                        navigation.navigate('BusinessList');
                      },
                      (error: string) => {
                        Toast.show({
                          text1: TOASTS[i18n.language].ERROR,
                          text2:
                            TOASTS[i18n.language][error] ?? 'Unexpected error',
                          type: 'error',
                        });
                      },
                    ) as any,
                  ),
                );
              }}
            />
            <Divider height={20} />

            <Button text={t('back')} onPress={() => navigation.goBack()} />
            {/* </View> */}
            <Divider height={140} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAware>
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
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
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

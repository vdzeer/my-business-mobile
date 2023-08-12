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

  return (
    <SafeAreaView style={styles.area}>
      <KeyboardAware>
        <TouchableWithoutFeedback onPress={onPressDismiss}>
          <View style={styles.container}>
            <Divider height={140} />

            <Text style={styles.titleText}>{t('createBusiness')}</Text>

            <Divider height={80} />

            <Input placeholder={t('name')} onChange={setName} />
            <Divider height={20} />
            <Input
              placeholder={t('password')}
              onChange={setPassword}
              secureTextEntry
            />
            <Divider height={20} />
            <ImageInput onSelect={setPhoto} />

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

                dispatch(
                  createBusiness(
                    formData,
                    () => {
                      navigation.navigate('BusinessList');
                    },
                    () => {},
                  ) as any,
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

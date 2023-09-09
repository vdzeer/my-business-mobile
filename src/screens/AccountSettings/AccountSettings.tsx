import React, { useState } from 'react';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  ActionButton,
  BottomSheet,
  Button,
  Divider,
  Header,
  Icon,
  ImageInput,
  Input,
  KeyboardAware,
  LanguagePicker,
} from '../../components';
import { useNavigation } from '@react-navigation/native';
import { AccountSettingsProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/slices/auth';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { Platform } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { TOASTS } from '../../i18n/toasts';
import i18n from '../../i18n';

export const AccountSettings: React.FC<AccountSettingsProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };

  const { profile, token } = useSelector((store: any) => store.auth);

  const [name, setName] = useState(profile?.name ?? '');
  const [email, setEmail] = useState(profile?.email ?? '');
  const [language, setLanguage] = useState(profile?.language ?? '');

  const [photo, setPhoto] = useState<any>('');
  const [imageUrl, setImageUrl] = useState<any>(profile?.image ?? '');
  console.log(profile);
  const [isValidForm, setIsValidForm] = useState({
    name: true,
  });

  const validateForm = (onSuccess: any) => {
    let isValid = true;

    if (name.length > 3) {
      setIsValidForm(prev => ({ ...prev, name: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, name: false }));
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
            <Header />
            <Divider height={20} />
            <Text style={styles.titleText}>{`${t('welcome')}${name}`}</Text>
            <Divider height={30} />
            <Text style={styles.descText}>{t('accountDetails')}</Text>
            <Divider height={40} />
            <ImageInput onSelect={setPhoto} imageUrl={imageUrl} />
            <Divider height={20} />
            <Input
              placeholder={t('name')}
              value={name}
              onChange={setName}
              isValid={isValidForm.name}
            />
            <Divider height={20} />
            <Input
              placeholder={t('email')}
              value={email}
              onChange={setEmail}
              editable={false}
            />
            <Divider height={20} />
            {/* <Input placeholder={t('password')} secureTextEntry /> */}
            {/* <Divider height={40} /> */}
            <LanguagePicker
              language={language}
              onChangeLanguage={(value: any) => setLanguage(value)}
            />

            <Divider height={40} />
            <Text style={styles.payText}>{t('payandsub')}</Text>
            <Divider height={10} />
            <View style={styles.payContent}>
              <Text style={styles.subName}>
                {profile?.subscription?.subscriptionName ?? t('emptySub')}
              </Text>
              <View style={styles.payContent}>
                <ActionButton
                  iconName="edit"
                  onPress={() => {
                    navigation.navigate('Subscriptions');
                  }}
                  size="large"
                />
              </View>
            </View>
            <Divider height={40} />

            {/* <View style={styles.buttonWrapper}> */}
            <Button
              text={t('update')}
              onPress={() => {
                i18next.changeLanguage(language);

                const formData = new FormData();
                formData.append('name', name);
                formData.append('language', language);

                photo.path &&
                  formData.append('image', {
                    name: photo.filename,
                    type: photo.mime ?? 'image/jpeg',
                    uri: photo.path,
                  } as any);
                validateForm(() =>
                  dispatch(
                    updateUser(
                      formData,

                      () => {
                        Toast.show({
                          text1: TOASTS[i18n.language].SUCCESS_UPDATE_USER,
                          text2:
                            TOASTS[i18n.language][error] ?? 'Unexpected error',
                        });
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

            {/* </View> */}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAware>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  createbuttonWrapper: { alignSelf: 'center' },
  area: { flex: 1 },
  container: { paddingHorizontal: 15, height: '100%' },
  buttonWrapper: {
    alignSelf: 'center',
    marginTop: 20,
    // position: 'absolute',
    // bottom: 10,
  },
  payContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  list: {
    marginTop: 20,
    height: '87%',
  },

  titleText: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',

    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
  subName: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',

    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    opacity: 0.4,
  },
  payText: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',

    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
  },
  descText: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',

    color: '#000000',
    opacity: 0.4,
  },
});

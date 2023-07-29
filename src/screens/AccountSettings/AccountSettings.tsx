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
} from '../../components';
import { useNavigation } from '@react-navigation/native';
import { AccountSettingsProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/slices/auth';
import { useTranslation } from 'react-i18next';

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

  const [photo, setPhoto] = useState<any>('');
  const [imageUrl, setImageUrl] = useState<any>(profile?.image ?? '');

  return (
    <SafeAreaView style={styles.area}>
      <TouchableWithoutFeedback onPress={onPressDismiss}>
        <View style={styles.container}>
          <KeyboardAware>
            <Header />
            <Divider height={20} />
            <Text style={styles.titleText}>{`${t('welcome')}${name}`}</Text>
            <Divider height={30} />
            <Text style={styles.descText}>{t('accountDetails')}</Text>
            <Divider height={40} />
            <ImageInput onSelect={setPhoto} imageUrl={imageUrl} />
            <Divider height={20} />
            <Input placeholder={t('name')} value={name} onChange={setName} />
            <Divider height={20} />
            <Input
              placeholder={t('email')}
              value={email}
              onChange={setEmail}
              editable={false}
            />
            <Divider height={20} />
            <Input placeholder={t('password')} secureTextEntry />

            <Divider height={40} />
            <Text style={styles.payText}>{t('payandsub')}</Text>
            <Divider height={10} />
            <View style={styles.payContent}>
              <Text style={styles.subName}>{t('emptySub')}</Text>
              <View style={styles.payContent}>
                <ActionButton
                  iconName="edit"
                  onPress={() => {
                    navigation.navigate('Subscriptions');
                  }}
                  size="large"
                />
                <Divider width={10} />
                <ActionButton
                  iconName="delete"
                  onPress={() => {}}
                  size="large"
                />
              </View>
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                text={t('update')}
                onPress={() => {
                  const formData = new FormData();
                  formData.append('name', name);
                  photo.path &&
                    formData.append('image', {
                      name: photo.filename,
                      type: photo.mime ?? 'image/jpeg',
                      uri: photo.path,
                    } as any);
                  console.log(formData);
                  dispatch(
                    updateUser(formData, () => {
                      // navigation.navigate('NewOrder');
                    }) as any,
                  );
                }}
              />
            </View>
          </KeyboardAware>
        </View>
      </TouchableWithoutFeedback>
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
    fontFamily: 'Montserrat',
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
  subName: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    opacity: 0.4,
  },
  payText: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
  },
  descText: {
    fontFamily: 'Montserrat',
    color: '#000000',
    opacity: 0.4,
  },
});

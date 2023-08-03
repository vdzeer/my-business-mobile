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
import { BusinessSettingsProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBusiness, updateBusiness } from '../../store/slices/business';

import { useTranslation } from 'react-i18next';

export const BusinessSettings: React.FC<BusinessSettingsProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const { t } = useTranslation();

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };

  const { currentBusiness } = useSelector((store: any) => store.business);

  const [name, setName] = useState<any>(currentBusiness?.name);
  const [currency, setCurrency] = useState<any>(
    currentBusiness?.currency ?? '',
  );

  const [photo, setPhoto] = useState<any>('');
  const [imageUrl, setImageUrl] = useState<any>(currentBusiness?.image ?? '');

  return (
    <SafeAreaView style={styles.area}>
      <TouchableWithoutFeedback onPress={onPressDismiss}>
        <View style={styles.container}>
          <KeyboardAware>
            <Header />
            <Divider height={20} />
            <Text style={styles.titleText}>{t('businessSettings')}</Text>
            <Divider height={30} />
            <Text style={styles.descText}>{t('businessDesc')}</Text>
            <Divider height={40} />

            <ImageInput onSelect={setPhoto} imageUrl={imageUrl} />
            <Divider height={20} />

            <Input placeholder={t('name')} value={name} onChange={setName} />
            <Divider height={20} />

            <Input
              placeholder={t('currency')}
              value={currency}
              onChange={setCurrency}
            />

            <Divider height={40} />

            <View style={styles.buttonWrapper}>
              <View style={styles.buttonWrapper2}>
                <Button
                  text={t('submit')}
                  onPress={() => {
                    const formData = new FormData();
                    formData.append('name', name);
                    formData.append('currency', currency);

                    formData.append('businessId', currentBusiness?._id);
                    photo.path &&
                      formData.append('image', {
                        name: photo.filename,
                        type: photo.mime ?? 'image/jpeg',
                        uri: photo.path,
                      } as any);
                    dispatch(
                      updateBusiness(formData, () => {
                        navigation.navigate('NewOrder');
                      }),
                    );
                  }}
                />
              </View>

              <ActionButton
                iconName="delete"
                onPress={() => {
                  dispatch(
                    deleteBusiness(currentBusiness?._id, () => {
                      navigation.navigate('BusinessList');
                    }),
                  );
                }}
                size="large"
              />
            </View>
          </KeyboardAware>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonWrapper2: { width: '70%' },
  createbuttonWrapper: { alignSelf: 'center' },
  area: { flex: 1 },
  container: { paddingHorizontal: 15, height: '100%' },
  buttonWrapper: {
    alignSelf: 'center',
    // position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    // marginTop: 20,
    // bottom: 10,
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
  descText: {
    fontFamily: 'Montserrat',
    color: '#000000',
    opacity: 0.4,
  },
});

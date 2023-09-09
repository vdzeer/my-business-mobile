import React, { useState } from 'react';
import {
  FlatList,
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
  const [isValidForm, setIsValidForm] = useState({
    name: true,
    currency: true,
  });

  const validateForm = (onSuccess: any) => {
    let isValid = true;

    if (name.length > 3 && name.length < 20) {
      setIsValidForm(prev => ({ ...prev, name: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, name: false }));
    }
    if (currency.length > 1 && name.length < 5) {
      setIsValidForm(prev => ({ ...prev, currency: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, currency: false }));
    }
    if (isValid) {
      onSuccess();
    }
  };

  const [photo, setPhoto] = useState<any>('');
  const [imageUrl, setImageUrl] = useState<any>(currentBusiness?.image ?? '');

  return (
    <SafeAreaView style={styles.area}>
      <KeyboardAware>
        <TouchableWithoutFeedback onPress={onPressDismiss}>
          <View style={styles.container}>
            <Header />
            <Divider height={20} />
            <Text style={styles.titleText}>{t('businessSettings')}</Text>
            <Divider height={30} />
            <Text style={styles.descText}>{t('businessDesc')}</Text>
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
              placeholder={t('currency')}
              value={currency}
              onChange={setCurrency}
              isValid={isValidForm.currency}
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
                    validateForm(() =>
                      dispatch(
                        updateBusiness(formData, () => {
                          navigation.navigate('NewOrder');
                        }),
                      ),
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAware>
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
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',

    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
  descText: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',

    color: '#000000',
    opacity: 0.4,
  },
});

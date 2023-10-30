import React, { useEffect, useState } from 'react';
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
  BottomSheet,
  Button,
  Divider,
  Header,
  Icon,
  ImageInput,
  Input,
  KeyboardAware,
} from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CreateInventoryProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import {
  createInventory,
  getInventoryList,
  updateInventory,
} from '../../store/slices/inventory';

import { useTranslation } from 'react-i18next';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { TOASTS } from '../../i18n/toasts';
import i18n from '../../i18n';

export const CreateInventory: React.FC<CreateInventoryProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { params } = useRoute<any>();

  const { currentBusiness } = useSelector((store: any) => store.business);

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };

  const [name, setName] = useState(params?.name ?? '');
  const [amount, setAmount] = useState(
    params?.amount ? params?.amount + '' : '',
  );
  const [lower, setLower] = useState(
    params?.lower_range ? params?.lower_range + '' : '',
  );
  const [photo, setPhoto] = useState<any>(params?.image ?? '');

  const [isValidForm, setIsValidForm] = useState({
    name: true,
    lower: true,
    amount: true,
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
    if (Number(amount) > 0) {
      setIsValidForm(prev => ({ ...prev, amount: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, amount: false }));
    }
    if (Number(lower) > 0) {
      setIsValidForm(prev => ({ ...prev, lower: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, lower: false }));
    }
    if (photo?.filename || photo !== '' || typeof photo === 'string') {
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
            <Header withGoBack />
            <Divider height={40} />

            <Text style={styles.titleText}>
              {params?.edit ? t('updateInventory') : t('createInventory')}
            </Text>
            <Divider height={40} />

            <ImageInput
              onSelect={setPhoto}
              imageUrl={photo}
              isValid={isValidForm.photo}
            />
            <Divider height={20} />

            <Input
              placeholder={t('name')}
              onChange={setName}
              value={name}
              isValid={isValidForm.name}
            />
            <Divider height={20} />
            <Input
              placeholder={t('amount')}
              onChange={setAmount}
              value={amount}
              isValid={isValidForm.amount}
            />
            <Divider height={20} />
            <Input
              placeholder={t('lowerRange')}
              onChange={setLower}
              value={lower}
              isValid={isValidForm.lower}
            />
            <Divider height={40} />

            {/* <View style={styles.buttonWrapper}> */}
            <Button
              text={params?.edit ? t('update') : t('submit')}
              onPress={() => {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('lowerRange', lower);
                formData.append('amount', amount);
                formData.append('businessId', currentBusiness?.id);

                params?.id && formData.append('inventoryId', params?.id);

                typeof photo !== 'string' &&
                  photo?.path &&
                  formData.append('image', {
                    name: photo.filename,
                    type: photo.mime ?? 'image/jpeg',
                    uri: photo.path,
                  } as any);
                if (params?.edit) {
                  validateForm(() =>
                    dispatch(
                      updateInventory(
                        formData,
                        () => {
                          Toast.show({
                            text1:
                              TOASTS[i18n.language].SUCCESS_UPDATE_INVENTORY,
                          });
                          navigation.navigate('Inventory');
                        },
                        (error: string) => {
                          Toast.show({
                            text1: TOASTS[i18n.language].ERROR,
                            text2:
                              TOASTS[i18n.language][error] ??
                              'Unexpected error',
                            type: 'error',
                          });
                        },
                      ) as any,
                    ),
                  );
                } else {
                  validateForm(() =>
                    dispatch(
                      createInventory(
                        formData,
                        () => {
                          Toast.show({
                            text1:
                              TOASTS[i18n.language].SUCCESS_CREATE_INVENTORY,
                          });
                          navigation.navigate('Inventory');
                        },
                        (error: string) => {
                          Toast.show({
                            text1: TOASTS[i18n.language].ERROR,
                            text2:
                              TOASTS[i18n.language][error] ??
                              'Unexpected error',
                            type: 'error',
                          });
                        },
                      ) as any,
                    ),
                  );
                }
              }}
            />
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
});

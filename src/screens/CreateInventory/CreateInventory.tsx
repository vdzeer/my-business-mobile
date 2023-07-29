import React, { useEffect, useState } from 'react';
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
    params?.lowerRange ? params?.lowerRange + '' : '',
  );
  const [photo, setPhoto] = useState<any>('');
  const [imageUrl, setImageUrl] = useState<any>(params?.image ?? '');

  return (
    <SafeAreaView style={styles.area}>
      <TouchableWithoutFeedback onPress={onPressDismiss}>
        <View style={styles.container}>
          <KeyboardAware>
            <Header withGoBack />
            <Divider height={40} />

            <Text style={styles.titleText}>
              {params?.edit ? t('updateInventory') : t('createInventory')}
            </Text>
            <Divider height={40} />

            <ImageInput onSelect={setPhoto} imageUrl={imageUrl} />
            <Divider height={20} />

            <Input placeholder={t('name')} onChange={setName} value={name} />
            <Divider height={20} />
            <Input
              placeholder={t('amount')}
              onChange={setAmount}
              value={amount}
            />
            <Divider height={20} />
            <Input
              placeholder={t('lowerRange')}
              onChange={setLower}
              value={lower}
            />
            <Divider height={20} />

            <View style={styles.buttonWrapper}>
              <Button
                text={params?.edit ? t('update') : t('submit')}
                onPress={() => {
                  const formData = new FormData();
                  formData.append('name', name);
                  formData.append('lowerRange', lower);
                  formData.append('amount', amount);
                  formData.append('businessId', currentBusiness?._id);

                  params?._id && formData.append('inventoryId', params?._id);

                  photo.path &&
                    formData.append('image', {
                      name: photo.filename,
                      type: photo.mime ?? 'image/jpeg',
                      uri: photo.path,
                    } as any);
                  if (params?.edit) {
                    dispatch(
                      updateInventory(
                        formData,
                        () => {
                          navigation.navigate('Inventory');
                        },
                        () => {},
                      ) as any,
                    );
                  } else {
                    dispatch(
                      createInventory(
                        formData,
                        () => {
                          navigation.navigate('Inventory');
                        },
                        () => {},
                      ) as any,
                    );
                  }
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
});

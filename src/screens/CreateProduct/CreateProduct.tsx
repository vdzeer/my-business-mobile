import React, { Fragment, useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
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
import { CreateProductProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct,
  getProductsList,
  updateProducts,
} from '../../store/slices/products';
import { useTranslation } from 'react-i18next';

export const CreateProduct: React.FC<CreateProductProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };

  const { params } = useRoute<any>();
  const { currentBusiness } = useSelector((store: any) => store.business);
  const { categories } = useSelector((store: any) => store.products);

  const [name, setName] = useState(params?.name ?? '');
  const [price, setPrice] = useState(params?.price ? params?.price + '' : '');
  const [self, setSelf] = useState(
    params?.selfPrice ? params?.selfPrice + '' : '',
  );
  const [category, setCategory] = useState<any>({
    _id: params?.categoryId ?? '',
  });
  const [photo, setPhoto] = useState<any>('');
  const [imageUrl, setImageUrl] = useState<any>(params?.image ?? '');
  const [inventory, setInventory] = useState<any>([]);
  const [isValidForm, setIsValidForm] = useState({
    name: true,
    price: true,
    selfPrice: true,
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
    if (Number(price) > 0) {
      setIsValidForm(prev => ({ ...prev, price: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, price: false }));
    }
    if (Number(self) > 0) {
      setIsValidForm(prev => ({ ...prev, selfPrice: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, selfPrice: false }));
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
            <Header withGoBack />
            <Divider height={20} />
            <ImageInput
              onSelect={setPhoto}
              imageUrl={imageUrl}
              isValid={isValidForm.photo}
            />
            <Divider height={20} />

            <Input
              placeholder={t('name')}
              value={name}
              onChange={setName}
              isValid={isValidForm.name}
            />
            <Divider height={20} />
            <Input
              placeholder={t('price')}
              value={price}
              onChange={setPrice}
              isValid={isValidForm.price}
            />
            <Divider height={20} />
            <Input
              placeholder={t('selfPrice')}
              value={self}
              onChange={setSelf}
              isValid={isValidForm.selfPrice}
            />
            <Divider height={20} />
            <Text style={styles.labelText}>
              {t('itemsInventory') + ` (${inventory.length})`}
            </Text>
            <Divider height={15} />
            <Button
              text={t('editInventory')}
              onPress={() => {
                navigation.navigate('PickInventory', {
                  inventory,
                  setInventory,
                });
              }}
            />
            <Divider height={40} />

            <Text style={styles.labelText}>{t('category')}</Text>
            <Divider height={15} />
            <View style={{ height: 35 }}>
              <ScrollView
                horizontal
                contentContainerStyle={styles.categoryScroll}>
                {categories.map((el: any) => (
                  <Fragment key={el._id}>
                    <TouchableOpacity
                      onPress={() => {
                        setCategory(el);
                      }}
                      style={[
                        styles.categoryItem,
                        {
                          backgroundColor:
                            el._id === category?._id ? '#384494' : '#D9F0FF',
                        },
                      ]}>
                      <Text
                        style={[
                          styles.categoryText,
                          {
                            color: el._id === category?._id ? 'white' : 'black',
                          },
                        ]}>
                        {el?.name}
                      </Text>
                    </TouchableOpacity>
                    <Divider width={5} />
                  </Fragment>
                ))}
              </ScrollView>
            </View>
            <Divider height={15} />
            <Button
              text={t('editCategory')}
              onPress={() => {
                navigation.navigate('Categories');
              }}
            />
            <Divider height={45} />

            {/* <View style={styles.buttonWrapper}> */}
            <Button
              text={params?.edit ? t('update') : t('submit')}
              onPress={() => {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('price', price);
                formData.append('selfPrice', self);
                formData.append('businessId', currentBusiness?._id);
                if (inventory.length) {
                  const resultArray = inventory.flatMap(({ _id, total }: any) =>
                    Array.from({ length: total }, () => String(_id)),
                  );
                  resultArray.forEach((el: any, index: number) => {
                    formData.append(`inventories[${index}]`, el);
                  });
                }

                category?._id && formData.append('categoryId', category?._id);

                params?._id && formData.append('productId', params?._id);

                photo.path &&
                  formData.append('image', {
                    name: photo.filename,
                    type: photo.mime ?? 'image/jpeg',
                    uri: photo.path,
                  } as any);
                if (params?.edit) {
                  validateForm(() =>
                    dispatch(
                      updateProducts(
                        formData,
                        () => {
                          navigation.navigate('Products');
                        },
                        () => {},
                      ) as any,
                    ),
                  );
                } else {
                  validateForm(() =>
                    dispatch(
                      createProduct(
                        formData,
                        () => {
                          navigation.navigate('Products');
                        },
                        () => {},
                      ) as any,
                    ),
                  );
                }
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
  categoryText: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',
  },
  categoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,

    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryScroll: {
    height: 35,
    width: '100%',
  },
  labelText: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',

    fontSize: 16,
  },
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

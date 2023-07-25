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
} from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CreateProductProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct,
  getProductsList,
  updateProducts,
} from '../../store/slices/products';

export const CreateProduct: React.FC<CreateProductProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const onPressDismiss = () => {
    Keyboard.dismiss();
  };

  const { params } = useRoute<any>();
  const { currentBusiness } = useSelector((store: any) => store.business);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [self, setSelf] = useState('');
  useEffect(() => {
    if (params?.edit) {
      setName(params?.name);
      setPrice(params?.price + '');
      setSelf(params?.selfPrice + '');
    } else {
      setName('');
      setPrice('');
      setSelf('');
    }
  }, [params]);

  const [photo, setPhoto] = useState<any>('');

  return (
    <SafeAreaView style={styles.area}>
      <TouchableWithoutFeedback onPress={onPressDismiss}>
        <View style={styles.container}>
          <Header />
          <Divider height={20} />
          <ImageInput onSelect={setPhoto} />
          <Divider height={20} />

          <Input placeholder="Name" value={name} onChange={setName} />
          <Divider height={20} />
          <Input placeholder="Price" value={price} onChange={setPrice} />
          <Divider height={20} />
          <Input placeholder="Self price" value={self} onChange={setSelf} />
          <Divider height={20} />
          <Input placeholder="Items of inventory" />
          <Divider height={20} />
          <Input placeholder="Category" />

          <View style={styles.buttonWrapper}>
            <Button
              text={params?.edit ? 'Update' : 'Submit'}
              onPress={() => {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('price', price);
                formData.append('selfPrice', self);
                formData.append('businessId', currentBusiness?._id);

                formData.append('image', {
                  name: photo.filename,
                  type: photo.mime ?? 'image/jpeg',
                  uri: photo.path,
                });
                if (params?.edit) {
                  dispatch(
                    updateProducts(
                      formData,
                      () => {
                        dispatch(getProductsList(currentBusiness?._id) as any);
                        navigation.navigate('Products');
                      },
                      () => {},
                    ) as any,
                  );
                } else {
                  dispatch(
                    createProduct(
                      formData,
                      () => {
                        navigation.navigate('Products');
                      },
                      () => {},
                    ) as any,
                  );
                }
              }}
            />
          </View>
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
    position: 'absolute',
    bottom: 10,
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

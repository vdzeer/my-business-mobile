import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
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

  console.log(category);

  return (
    <SafeAreaView style={styles.area}>
      <TouchableWithoutFeedback onPress={onPressDismiss}>
        <View style={styles.container}>
          <Header withGoBack />
          <Divider height={20} />
          <ImageInput onSelect={setPhoto} imageUrl={imageUrl} />
          <Divider height={20} />

          <Input placeholder="Name" value={name} onChange={setName} />
          <Divider height={20} />
          <Input placeholder="Price" value={price} onChange={setPrice} />
          <Divider height={20} />
          <Input placeholder="Self price" value={self} onChange={setSelf} />
          <Divider height={20} />
          <Input placeholder="Items of inventory" />
          <Divider height={20} />
          <Text style={styles.labelText}>Category</Text>
          <Divider height={15} />
          <View style={{ height: 35 }}>
            <ScrollView
              horizontal
              contentContainerStyle={styles.categoryScroll}>
              {categories.map((el: any) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setCategory(el);
                    }}
                    style={[
                      styles.categoryItem,
                      {
                        backgroundColor:
                          el._id === category?._id ? '#83C9F4' : '#D9F0FF',
                      },
                    ]}>
                    <Text style={styles.categoryText}>{el?.name}</Text>
                  </TouchableOpacity>
                  <Divider width={5} />
                </>
              ))}
            </ScrollView>
          </View>
          <Divider height={15} />
          <Button
            text="Edit categories"
            onPress={() => {
              navigation.navigate('Categories');
            }}
          />

          <View style={styles.buttonWrapper}>
            <Button
              text={params?.edit ? 'Update' : 'Submit'}
              onPress={() => {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('price', price);
                formData.append('selfPrice', self);
                formData.append('businessId', currentBusiness?._id);
                category?._id && formData.append('categoryId', category?._id);

                params?._id && formData.append('productId', params?._id);

                photo.path &&
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
  categoryText: { fontFamily: 'Montserrat' },
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
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
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

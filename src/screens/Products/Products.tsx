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
  Input,
} from '../../components';
import { useNavigation } from '@react-navigation/native';
import { ProductsProps } from './types';
import { ProductCard } from './components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProductsList } from '../../store/slices/products';

export const Products: React.FC<ProductsProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const { products } = useSelector((store: any) => store.products);
  const { currentBusiness } = useSelector((store: any) => store.business);

  const [productList, setProductList] = useState<any>(null);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header />
        <Divider height={20} />
        <Text style={styles.titleText}>Products</Text>
        <Divider height={20} />
        <View style={styles.createbuttonWrapper}>
          <Button
            onPress={() => {
              navigation.navigate('CreateProduct');
            }}
            text="Create new product"
            mode="large"
          />
        </View>
        <FlatList
          data={productList ?? []}
          renderItem={({ item }) => (
            <ProductCard
              title={item?.name}
              image="asd"
              price={item?.price}
              onEdit={() => {
                navigation.navigate('CreateProduct', { ...item, edit: true });
              }}
              onDelete={() => {
                dispatch(
                  deleteProduct(item?._id, () => {
                    dispatch(getProductsList(currentBusiness?._id) as any);
                  }) as any,
                );
              }}
            />
          )}
          style={styles.list}
        />
        <View style={styles.buttonWrapper}>
          <Button
            text="Checkout"
            onPress={() => {
              navigation.navigate('Basket');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  createbuttonWrapper: { alignSelf: 'center' },
  area: { flex: 1 },
  container: { paddingHorizontal: 15 },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
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

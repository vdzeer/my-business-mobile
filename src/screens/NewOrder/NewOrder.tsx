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
import { NewOrderProps } from './types';
import { ProductCard } from './components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getInventoryList } from '../../store/slices/inventory';
import { getProductsList } from '../../store/slices/products';
import { getSuppliersList } from '../../store/slices/suppliers';
import { addToBasket } from '../../store/slices/orders';

export const NewOrder: React.FC<NewOrderProps> = () => {
  const navigation = useNavigation<any>();

  const dispatch = useDispatch();

  const { currentBusiness } = useSelector((store: any) => store.business);
  const { products } = useSelector((store: any) => store.products);

  const [productList, setProductList] = useState<any>(null);

  useEffect(() => {
    dispatch(getInventoryList(currentBusiness?._id) as any);
    dispatch(getProductsList(currentBusiness?._id) as any);
    dispatch(getSuppliersList(currentBusiness?._id) as any);
  }, []);

  useEffect(() => {
    setProductList(products);
  }, [products]);
  console.log(productList);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header />
        <Divider height={20} />

        <Text style={styles.titleText}>New order</Text>
        <FlatList
          data={productList ?? []}
          renderItem={({ item }) => (
            <ProductCard
              title={item?.name}
              image="asd"
              price={item?.price}
              onAdd={() => {
                dispatch(addToBasket({ ...item, total: 1 }) as any);
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
    height: '77%',
  },

  titleText: {
    fontFamily: 'Montserrat',
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
});

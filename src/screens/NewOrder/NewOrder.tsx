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
import {
  getCategoriesList,
  getProductsList,
} from '../../store/slices/products';
import { getSuppliersList } from '../../store/slices/suppliers';
import { addToBasket, getOrdersList } from '../../store/slices/orders';
import { getPromocodesList } from '../../store/slices/promocodes';
import { useTranslation } from 'react-i18next';

export const NewOrder: React.FC<NewOrderProps> = () => {
  const navigation = useNavigation<any>();

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { currentBusiness } = useSelector((store: any) => store.business);
  const { currentBasket } = useSelector((store: any) => store.orders);

  const { products } = useSelector((store: any) => store.products);

  const [productList, setProductList] = useState<any>(null);

  useEffect(() => {
    dispatch(getInventoryList(currentBusiness?._id) as any);
    dispatch(getProductsList(currentBusiness?._id) as any);
    dispatch(getSuppliersList(currentBusiness?._id) as any);
    dispatch(getPromocodesList(currentBusiness?._id) as any);
    dispatch(getOrdersList(currentBusiness?._id) as any);
    dispatch(getCategoriesList(currentBusiness?._id) as any);
  }, []);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header />
        <Divider height={20} />

        <Text style={styles.titleText}>{t('newOrder')}</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={productList ?? []}
          renderItem={({ item }) => (
            <ProductCard
              title={item?.name}
              image={item?.image ?? ''}
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
            text={t('checkout') + ` (${currentBasket.length})`}
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

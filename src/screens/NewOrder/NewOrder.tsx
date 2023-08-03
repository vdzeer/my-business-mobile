import React, { Fragment, useEffect, useState } from 'react';
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
  const { categories } = useSelector((store: any) => store.products);

  const [productList, setProductList] = useState<any>(null);
  const [category, setCategory] = useState<any>({ _id: '' });

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

  useEffect(() => {
    if (category?._id) {
      setProductList(
        products.filter((item: any) => item?.categoryId === category?._id),
      );
    } else {
      setProductList(products);
    }
  }, [category]);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header />
        <Divider height={20} />

        <Text style={styles.titleText}>{t('newOrder')}</Text>
        <Divider height={20} />
        <View style={{ height: 35 }}>
          <ScrollView horizontal contentContainerStyle={styles.categoryScroll}>
            {categories.map((el: any) => (
              <Fragment key={el._id}>
                <TouchableOpacity
                  onPress={() => {
                    el._id === category?._id
                      ? setCategory({ _id: '' })
                      : setCategory(el);
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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={productList ?? []}
          numColumns={4}
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
          contentContainerStyle={styles.listContent}
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
    height: '70%',
  },
  listContent: {
    justifyContent: 'center',
  },

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
  titleText: {
    fontFamily: 'Montserrat',
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
});

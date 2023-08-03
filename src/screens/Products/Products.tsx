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
  ActionButton,
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
import { useTranslation } from 'react-i18next';

export const Products: React.FC<ProductsProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const { products } = useSelector((store: any) => store.products);
  const { profile } = useSelector((store: any) => store.auth);

  const [productList, setProductList] = useState<any>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setProductList(products);
  }, [products]);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header />
        <Divider height={20} />
        <View style={styles.headerWrapper}>
          <Text style={styles.titleText}>{t('products')}</Text>
          <ActionButton
            iconName="plus"
            onPress={() => {
              if (products?.length < profile.subscription.productLength) {
                navigation.navigate('CreateProduct');
              } else {
                //TOAST
              }
            }}
            size="large"
          />
        </View>

        <Divider height={20} />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={productList ?? []}
          renderItem={({ item }) => (
            <ProductCard
              title={item?.name}
              image={item?.image ?? ''}
              price={item?.price}
              onEdit={() => {
                navigation.navigate('CreateProduct', { ...item, edit: true });
              }}
              onDelete={() => {
                dispatch(deleteProduct(item?._id) as any);
              }}
            />
          )}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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

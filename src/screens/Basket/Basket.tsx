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
import { BasketProps } from './types';
import { ProductCard } from './components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToBasket,
  createOrder,
  removeFromBasket,
} from '../../store/slices/orders';
import { useTranslation } from 'react-i18next';

export const Basket: React.FC<BasketProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { currentBasket, orders } = useSelector((store: any) => store.orders);
  const { currentBusiness } = useSelector((store: any) => store.business);

  const [basket, setBasket] = useState<any>([]);

  useEffect(() => {
    setBasket(currentBasket);
  }, [currentBasket]);

  const countTotalPrice = (total: Array<any>) => {
    let totalPrice = 0;
    total.forEach((el: any) => (totalPrice += el.total * el.price));
    return totalPrice;
  };

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header withGoBack />
        <Divider height={20} />
        <Text style={styles.titleText}>{t('yourItems')}</Text>
        <FlatList
          data={basket}
          renderItem={({ item }) => (
            <ProductCard
              title={item?.name}
              total={item?.total}
              price={item?.price}
              image={item?.image ?? ''}
              onAdd={() => {
                dispatch(addToBasket(item) as any);
              }}
              onRemove={() => {
                dispatch(removeFromBasket(item) as any);
              }}
            />
          )}
          style={styles.list}
        />
        <View style={styles.buttonWrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{t('totalItems')}</Text>
            <Text style={styles.text}>{basket?.length ?? 0}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{t('price')}</Text>
            <Text style={styles.text}>{countTotalPrice(basket)}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{t('payWith') + ':'}</Text>
            <View style={styles.paymentWrapper}>
              <Text style={styles.text}>{t('cash')}</Text>
              <Divider width={20} />
              <Text style={styles.text}>{t('card')}</Text>
            </View>
          </View>

          <Button
            text={t('confirm')}
            onPress={() => {
              dispatch(
                createOrder(
                  {
                    businessId: currentBusiness?._id,
                    payType: 'cash',
                    //how to do with multiple items of total >1 ???
                    products: basket.map((el: any) => el._id),
                  },
                  () => {
                    navigation.goBack();
                  },
                ) as any,
              );
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
  paymentWrapper: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-end',
  },
  textWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    opacity: 0.4,
  },

  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },

  list: {
    marginTop: 20,
    height: '63%',
  },

  titleText: {
    fontFamily: 'Montserrat',
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
});

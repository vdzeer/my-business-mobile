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
  const [payBy, setPayBy] = useState<any>('cash');

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
          showsVerticalScrollIndicator={false}
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
            <Text style={styles.text}>
              {`${countTotalPrice(basket)} ${currentBusiness?.currency ?? ''}`}
            </Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{t('payWith') + ':'}</Text>
            <View style={styles.paymentWrapper}>
              <TouchableOpacity
                onPress={() => {
                  setPayBy('cash');
                }}>
                <Text
                  style={[
                    styles.text,
                    {
                      opacity: payBy === 'cash' ? 1 : 0.4,
                      fontWeight: payBy === 'cash' ? '600' : '400',
                    },
                  ]}>
                  {t('cash')}
                </Text>
              </TouchableOpacity>
              <Divider width={20} />
              <TouchableOpacity
                onPress={() => {
                  setPayBy('card');
                }}>
                <Text
                  style={[
                    styles.text,
                    {
                      opacity: payBy === 'card' ? 1 : 0.4,
                      fontWeight: payBy === 'card' ? '600' : '400',
                    },
                  ]}>
                  {t('card')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Divider height={20} />

          <Button
            text={t('confirm')}
            onPress={() => {
              dispatch(
                createOrder(
                  {
                    businessId: currentBusiness?._id,
                    payType: payBy,
                    products: basket.flatMap(({ _id, total }: any) =>
                      Array.from({ length: total }, () => String(_id)),
                    ),
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

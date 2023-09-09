import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
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
  getOrdersList,
  removeFromBasket,
} from '../../store/slices/orders';
import { useTranslation } from 'react-i18next';
import { checkValidPromocode } from '../../store/slices/business';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { TOASTS } from '../../i18n/toasts';
import i18n from '../../i18n';

export const Basket: React.FC<BasketProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { currentBasket, orders } = useSelector((store: any) => store.orders);
  const { currentBusiness } = useSelector((store: any) => store.business);

  const [basket, setBasket] = useState<any>([]);
  const [payBy, setPayBy] = useState<any>('cash');

  const [open, setOpen] = useState<any>(false);
  const [promo, setPromo] = useState<any>('');
  const [promoResponse, setPromoResponse] = useState<any>(null);

  useEffect(() => {
    setBasket(currentBasket);
  }, [currentBasket]);

  const countTotalPrice = (total: Array<any>) => {
    let totalPrice = 0;
    total.forEach((el: any) => (totalPrice += el.total * el.price));
    return totalPrice;
  };

  function calculateDiscountedPrice(
    originalPrice: number,
    discountPercentage: number,
  ) {
    const discountAmount = (originalPrice * discountPercentage) / 100;

    const finalPrice = originalPrice - discountAmount;

    return finalPrice;
  }
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
              {`${
                promoResponse?.salePercent
                  ? calculateDiscountedPrice(
                      countTotalPrice(basket),
                      promoResponse?.salePercent,
                    )
                  : countTotalPrice(basket)
              }${currentBusiness?.currency ?? ''}`}
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
            text={`${t('checkPromo')}${
              promoResponse?.salePercent
                ? ' (' + promoResponse?.salePercent + '%)'
                : ''
            }
              `}
            onPress={() => {
              setOpen(true);
            }}
            mode="lite"
          />
          <Divider height={10} />

          <Button
            text={t('confirm')}
            onPress={() => {
              dispatch(
                createOrder(
                  {
                    businessId: currentBusiness?.id,
                    payType: payBy,
                    products: basket.flatMap(({ id, total }: any) =>
                      Array.from({ length: total }, () => String(id)),
                    ),
                    promocodeId: promoResponse?.id ?? '',
                  },
                  () => {
                    Toast.show({
                      text1: TOASTS[i18n.language].SUCCESS_CREATE_ORDER,
                    });

                    dispatch(getOrdersList(currentBusiness?.id) as any);
                    navigation.goBack();
                  },
                  (error: string) => {
                    Toast.show({
                      text1: TOASTS[i18n.language].ERROR,
                      text2: TOASTS[i18n.language][error] ?? 'Unexpected error',
                      type: 'error',
                    });
                  },
                ) as any,
              );
            }}
          />
        </View>
      </View>
      <BottomSheet
        open={open}
        snapPoints={['40%']}
        onDismiss={() => {
          setOpen(false);
        }}>
        <Input placeholder={t('promocode')} onChange={setPromo} inBottomSheet />

        <Divider height={40} />
        <Button
          text={t('submit')}
          mode="large"
          onPress={() => {
            dispatch(
              checkValidPromocode(
                {
                  businessId: currentBusiness.id,
                  promocodeName: promo,
                },
                (res: any) => {
                  Toast.show({
                    text1: TOASTS[i18n.language].VALID_PROMOCODE,
                  });
                  setOpen(false);
                  setPromoResponse(res);
                },
                (error: string) => {
                  Toast.show({
                    text1: TOASTS[i18n.language].ERROR,
                    text2: TOASTS[i18n.language][error] ?? 'Unexpected error',
                    type: 'error',
                  });
                },
              ) as any,
            );
          }}
        />
      </BottomSheet>
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
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',

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
    height: Platform.OS === 'ios' ? '58%' : '45%',
  },

  titleText: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',

    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
});

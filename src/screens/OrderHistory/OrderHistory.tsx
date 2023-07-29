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
  ImageInput,
  Input,
} from '../../components';
import { useNavigation } from '@react-navigation/native';
import { OrderHistoryProps } from './types';
import { OrderHistoryCard } from './components/OrderHistoryCard';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const OrderHistory: React.FC<OrderHistoryProps> = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const { orders } = useSelector((store: any) => store.orders);

  const [orderList, setOrderList] = useState<any>(null);

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header />
        <Divider height={20} />
        <View style={styles.headerWrapper}>
          <Text style={styles.titleText}>{t('orderHistory')}</Text>
        </View>
        <Divider height={20} />

        <FlatList
          data={orderList}
          renderItem={({ item }) => (
            <OrderHistoryCard
              name={
                item.payType.slice(0, 1).toUpperCase() + item.payType.slice(1)
              }
              date={item.date}
              price={item?.totalPrice}
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
  area: { flex: 1 },
  container: { paddingHorizontal: 15 },

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

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { ActionButton, Divider, Icon } from '../../../components';
import { OrderHistoryProps } from './types';
import moment from 'moment';
import { useSelector } from 'react-redux';

export const OrderHistoryCard = ({
  name,
  date,
  price,
  products,
}: OrderHistoryProps) => {
  const { currentBusiness } = useSelector((store: any) => store.business);

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.contentWrapper}>
        <Text style={styles.cardText}>{name}</Text>
        <Divider height={10} />

        <Text style={styles.cardDesc}>
          {moment(date).format('YYYY/MM/DD hh:mm')}
        </Text>

        <Text style={styles.cardText}>-----------</Text>

        {products.map(el => (
          <Text>{el.name}</Text>
        ))}
      </View>
      <View style={styles.contentWrapper2}>
        <Text style={styles.priceText}>
          {`${price} ${currentBusiness?.currency ?? ''}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#6F73D2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  contentWrapper: {
    width: '50%',
  },
  contentWrapper2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '50%',
  },
  cardText: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',
    fontWeight: '500',
  },
  priceText: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Bold',
    fontWeight: '600',
    fontSize: 16,
  },

  cardDesc: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',

    fontWeight: '500',
    fontSize: 12,
    opacity: 0.4,
  },

  cardWrapper: {
    minHeight: 80,
    backgroundColor: '#D9F0FF',
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    paddingVertical: 10,
  },
});

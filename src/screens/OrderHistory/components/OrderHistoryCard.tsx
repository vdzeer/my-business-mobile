import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ActionButton, Divider, Icon } from '../../../components';
import { OrderHistoryProps } from './types';

export const OrderHistoryCard = ({ name, image }: OrderHistoryProps) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.contentWrapper}>
        <Text style={styles.cardText}>{name}</Text>
        <Divider height={10} />

        <Text style={styles.cardDesc}>{new Date().toDateString()}</Text>
      </View>
      <View style={styles.contentWrapper2}>
        <Text style={styles.priceText}>Price</Text>
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
  cardText: { fontFamily: 'Montserrat', fontWeight: '500' },
  priceText: { fontFamily: 'Montserrat', fontWeight: '700', fontSize: 16 },

  cardDesc: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 12,
    opacity: 0.4,
  },

  cardWrapper: {
    height: 80,
    backgroundColor: '#D9F0FF',
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
});

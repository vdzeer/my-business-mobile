import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ActionButton, Divider, Icon } from '../../../components';
import { ProductCardProps } from './types';
import { Image } from 'react-native';
import { image_url } from '../../../store/config';

export const ProductCard = ({
  title,
  price,
  onAdd,
  image,
  onRemove,
  total,
}: ProductCardProps) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.contentWrapper}>
        {image ? (
          <>
            <Image source={{ uri: image_url + image }} style={styles.image} />
          </>
        ) : (
          <View style={styles.image}></View>
        )}
        <Divider width={10} />
        <Text style={styles.cardText}>{title}</Text>
      </View>

      <View style={styles.contentWrapper2}>
        <Text style={styles.cardText}>{price}</Text>
        <Divider width={15} />

        <ActionButton iconName="plus" onPress={onAdd} size="small" />
        <Divider width={5} />

        <Text style={styles.cardText}>{total}</Text>

        <Divider width={5} />
        <ActionButton iconName="minus" onPress={onRemove} size="small" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: 'black',
  },
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '50%',
  },
  contentWrapper2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '50%',
  },
  cardText: { fontFamily: 'Montserrat', fontWeight: '500' },
  cardWrapper: {
    height: 60,
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

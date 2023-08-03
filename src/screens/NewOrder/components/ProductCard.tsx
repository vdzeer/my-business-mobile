import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { ActionButton, Divider, Icon } from '../../../components';
import { ProductCardProps } from './types';
import { image_url } from '../../../store/config';
import DeviceInfo from 'react-native-device-info';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

export const ProductCard = ({
  title,
  price,
  image,
  onAdd,
}: ProductCardProps) => {
  let isTablet = DeviceInfo.isTablet();
  const { currentBusiness } = useSelector((store: any) => store.business);

  return (
    <>
      {isTablet ? (
        <View style={styles.tabletCardWrapper}>
          {image ? (
            <>
              <FastImage
                source={{ uri: image_url + image }}
                style={styles.imageTablet}
              />
            </>
          ) : (
            <></>
          )}
          <View style={styles.tabletTextWrapper}>
            <Text style={styles.cardText}>{title}</Text>
            <View style={styles.tabletFixer}>
              <Text style={styles.cardText}>
                {`${price} ${currentBusiness?.currency ?? ''}`}
              </Text>
              <Divider width={20} />
              <ActionButton onPress={onAdd} iconName="plus" size="large" />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.cardWrapper}>
          <View style={styles.contentWrapper}>
            {image ? (
              <>
                <FastImage
                  source={{ uri: image_url + image }}
                  style={styles.image}
                />
              </>
            ) : (
              <View style={styles.image}></View>
            )}

            <Divider width={20} />
            <Text style={styles.cardText}>{title}</Text>
          </View>
          <View style={styles.contentWrapper2}>
            <Text style={styles.cardText}>
              {`${price} ${currentBusiness?.currency ?? ''}`}
            </Text>
            <Divider width={20} />
            <ActionButton onPress={onAdd} iconName="plus" size="large" />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tabletFixer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabletTextWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '25%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  tabletCardWrapper: {
    width: '24%',
    height: 180,
    backgroundColor: '#D9F0FF',

    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: 'black',
  },
  imageTablet: {
    width: '100%',
    height: '75%',
    backgroundColor: 'black',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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

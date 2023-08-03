import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { HeaderProps } from './types';
import { Icon } from '../Icon';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '../Divider';
import { useSelector } from 'react-redux';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { image_url } from '../../store/config';

export const Header: React.FC<HeaderProps> = ({ withGoBack }) => {
  const navigation = useNavigation<any>();
  const { currentBusiness } = useSelector((store: any) => store.business);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    setName(currentBusiness?.name);
    setImage(currentBusiness?.image ?? '');
  }, [currentBusiness]);

  return (
    <>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.itemsWrapper}
          onPress={() => {
            withGoBack ? navigation.goBack() : navigation.openDrawer();
          }}>
          <View style={[styles.iconWrapper, { padding: withGoBack ? 10 : 0 }]}>
            {withGoBack ? (
              <Icon name="arrowLeftBlack" />
            ) : (
              <Icon name="drawer" />
            )}
          </View>
        </TouchableOpacity>

        <View
          style={[styles.itemsWrapper, { alignItems: 'center', width: '16%' }]}>
          <View style={styles.iconWrapper}>
            <Icon name="logo" />
          </View>
        </View>

        <View style={[styles.itemsWrapper, { alignItems: 'flex-end' }]}>
          <View style={styles.nameWrapper}>
            <Text style={styles.nameText}>{name}</Text>
            <Divider width={10} />
            {image ? (
              <FastImage
                source={{ uri: image_url + image }}
                style={styles.image}
              />
            ) : (
              <View style={styles.image}></View>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
  },
  nameText: {
    fontFamily: 'Montserrat',
    fontSize: 12,
  },
  itemsWrapper: { width: '42%' },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerWrapper: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    height: 40,
    width: 40,
  },
});

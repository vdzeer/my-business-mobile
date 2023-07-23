import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { HeaderProps } from './types';
import { Icon } from '../Icon';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '../Divider';
import { useSelector } from 'react-redux';

export const Header: React.FC<HeaderProps> = () => {
  const navigation = useNavigation<any>();
  const { currentBusiness } = useSelector((store: any) => store.business);

  return (
    <>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.itemsWrapper}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <View style={styles.iconWrapper}>
            <Icon name="drawer" />
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
            <Text style={styles.nameText}>{currentBusiness.name}</Text>
            <Divider width={10} />
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#000000',
              }}></View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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

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
  Input,
} from '../../components';
import { useNavigation } from '@react-navigation/native';
import { InventoryProps } from './types';
import { ProductCard } from './components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteInventory,
  getInventoryList,
} from '../../store/slices/inventory';

export const Inventory: React.FC<InventoryProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const { inventory } = useSelector((store: any) => store.inventory);
  const { currentBusiness } = useSelector((store: any) => store.business);

  const [inventoryList, setInventroyList] = useState<any>(null);
  useEffect(() => {
    setInventroyList(inventory);
  }, [inventory]);
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header />
        <Divider height={20} />
        <View style={styles.headerWrapper}>
          <Text style={styles.titleText}>Your inventory</Text>
          <ActionButton
            iconName="plus"
            onPress={() => {
              navigation.navigate('CreateInventory');
            }}
            size="large"
          />
        </View>
        <Divider height={20} />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={inventoryList ?? []}
          renderItem={({ item }) => (
            <ProductCard
              title={item.name}
              image="asd"
              price={item?.amount}
              onEdit={() => {
                navigation.navigate('CreateInventory', { ...item, edit: true });
              }}
              onDelete={() => {
                dispatch(
                  deleteInventory(item?._id, () => {
                    dispatch(getInventoryList(currentBusiness?._id) as any);
                  }) as any,
                );
              }}
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
    height: '83%',
  },

  titleText: {
    fontFamily: 'Montserrat',
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
});

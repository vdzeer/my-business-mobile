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
import { useTranslation } from 'react-i18next';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { TOASTS } from '../../i18n/toasts';
import i18n from '../../i18n';

export const Inventory: React.FC<InventoryProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { inventory } = useSelector((store: any) => store.inventory);
  const { profile } = useSelector((store: any) => store.auth);
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
          <Text style={styles.titleText}>{t('yourInventory')}</Text>
          <ActionButton
            iconName="plus"
            onPress={() => {
              if (inventory?.length < profile.subscription.inventories_length) {
                navigation.navigate('CreateInventory');
              } else {
                //TOAST
              }
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
              image={item?.image ?? ''}
              price={item?.amount}
              showCurrency={false}
              onEdit={() => {
                navigation.navigate('CreateInventory', { ...item, edit: true });
              }}
              onDelete={() => {
                dispatch(
                  deleteInventory(
                    item?.id,
                    () => {
                      Toast.show({
                        text1: TOASTS[i18n.language].SUCCESS_DELETE_INVENTORY,
                      });
                    },
                    (error: string) => {
                      Toast.show({
                        text1: TOASTS[i18n.language].ERROR,
                        text2:
                          TOASTS[i18n.language][error] ?? 'Unexpected error',
                        type: 'error',
                      });
                    },
                    currentBusiness?.id,
                  ) as any,
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
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',

    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
});

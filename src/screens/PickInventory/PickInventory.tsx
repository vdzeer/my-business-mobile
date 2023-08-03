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
import { useNavigation, useRoute } from '@react-navigation/native';
import { PickInventoryProps } from './types';
import { ProductCard } from './components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteInventory,
  getInventoryList,
} from '../../store/slices/inventory';
import { useTranslation } from 'react-i18next';

export const PickInventory: React.FC<PickInventoryProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { params } = useRoute<any>();

  const { inventory } = useSelector((store: any) => store.inventory);

  const [inventoryList, setInventroyList] = useState<any>(null);
  const [inventoryListParams, setInventoryListParams] = useState<any>(
    params.inventory,
  );

  useEffect(() => {
    setInventroyList(inventory);
  }, [inventory]);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header withGoBack />
        <Divider height={20} />
        <View style={styles.headerWrapper}>
          <Text style={styles.titleText}>{t('yourInventory')}</Text>
        </View>
        <Divider height={20} />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={inventoryList ?? []}
          renderItem={({ item }) => (
            <ProductCard
              title={item.name}
              image={item?.image ?? ''}
              onAdd={() => {
                setInventoryListParams((prev: any) => {
                  const existingItem = prev.find(
                    (el: any) => el._id === item._id,
                  );

                  if (!existingItem) {
                    return [...prev, { ...item, total: 1 }];
                  } else {
                    return prev.map((el: any) =>
                      el._id === item._id
                        ? { ...el, total: Number(el.total) + 1 }
                        : el,
                    );
                  }
                }) as any;
              }}
              total={
                inventoryListParams?.find((el: any) => el._id === item._id)
                  ?.total ?? 0
              }
              onRemove={() => {
                setInventoryListParams((prev: any) =>
                  prev
                    .map((el: any) =>
                      el._id === item._id
                        ? el.total > 1
                          ? { ...el, total: el.total - 1 }
                          : null
                        : el,
                    )
                    .filter(Boolean),
                );
              }}
            />
          )}
          style={styles.list}
        />
        <Button
          text={t('save')}
          onPress={() => {
            navigation.goBack();
            params.setInventory(inventoryListParams);
          }}
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
    height: '78%',
  },

  titleText: {
    fontFamily: 'Montserrat',
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
});

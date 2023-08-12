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
import { SuppliersProps } from './types';
import { SupplierCard } from './components/SupplierCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSupplier,
  deleteSupplier,
  getSuppliersList,
  updateSupplier,
} from '../../store/slices/suppliers';

import { useTranslation } from 'react-i18next';

export const Suppliers: React.FC<SuppliersProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState<any>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { suppliers } = useSelector((store: any) => store.suppliers);
  const { profile } = useSelector((store: any) => store.auth);

  const { currentBusiness } = useSelector((store: any) => store.business);

  const [suppliersList, setSuppliersList] = useState<any>(null);

  useEffect(() => {
    setSuppliersList(suppliers);
  }, [suppliers]);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header />
        <Divider height={20} />
        <View style={styles.headerWrapper}>
          <Text style={styles.titleText}>{t('yourSuppliers')}</Text>
          <ActionButton
            iconName="plus"
            onPress={() => {
              if (suppliers?.length < profile.subscription.suppliersLength) {
                setOpen(true);
                setEdit(false);
                setName('');
                setPhone('');
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
          data={suppliersList ?? []}
          renderItem={({ item }) => (
            <SupplierCard
              name={item.name}
              phone={item.contact}
              onDelete={() => {
                dispatch(deleteSupplier(item?._id) as any);
              }}
              onEdit={() => {
                setItem(item);
                setEdit(true);
                setName(item.name);
                setPhone(item.contact);
                setOpen(true);
              }}
            />
          )}
          style={styles.list}
        />
      </View>
      <BottomSheet
        open={open}
        snapPoints={Platform.OS === 'ios' ? ['40%'] : ['50%']}
        onDismiss={() => {
          setOpen(false);
        }}>
        <Input
          placeholder={t('name')}
          value={name}
          onChange={setName}
          inBottomSheet
        />
        <Divider height={20} />

        <Input
          placeholder={t('phone')}
          value={phone}
          onChange={setPhone}
          inBottomSheet
        />
        <Divider height={30} />
        <Button
          text={edit ? t('update') : t('submit')}
          mode="large"
          onPress={() => {
            if (edit) {
              dispatch(
                updateSupplier(
                  {
                    name,
                    contact: phone,
                    supplierId: item?._id,
                  },
                  () => {
                    setOpen(false);
                  },
                ) as any,
              );
            } else {
              dispatch(
                createSupplier(
                  {
                    name,
                    contact: phone,
                    businessId: currentBusiness?._id,
                  },
                  () => {
                    setOpen(false);
                  },
                ) as any,
              );
            }
            setItem(null);
          }}
        />
      </BottomSheet>
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
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',

    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
});

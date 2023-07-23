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
import { SuppliersProps } from './types';
import { SupplierCard } from './components/SupplierCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSupplier,
  deleteSupplier,
  getSuppliersList,
  updateSupplier,
} from '../../store/slices/suppliers';

export const Suppliers: React.FC<SuppliersProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState<any>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { suppliers } = useSelector((store: any) => store.suppliers);
  const { currentBusiness } = useSelector((store: any) => store.business);

  const [suppliersList, setSuppliersList] = useState<any>(null);

  useEffect(() => {
    setSuppliersList(suppliers);
  }, [suppliers]);

  console.log(suppliers);
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header />
        <Divider height={20} />
        <View style={styles.headerWrapper}>
          <Text style={styles.titleText}>Your supplies</Text>
          <ActionButton
            iconName="plus"
            onPress={() => {
              setOpen(true);
              setEdit(false);
              setName('');
              setPhone('');
            }}
            size="large"
          />
        </View>
        <Divider height={20} />

        <FlatList
          data={suppliersList ?? []}
          renderItem={({ item }) => (
            <SupplierCard
              name={item.name}
              phone={item.contact}
              onDelete={() => {
                dispatch(
                  deleteSupplier(item?._id, () =>
                    dispatch(getSuppliersList(currentBusiness?._id) as any),
                  ) as any,
                );
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
        snapPoints={['30%']}
        onDismiss={() => {
          setOpen(false);
        }}>
        <Input placeholder="Name" value={name} onChange={setName} />
        <Divider height={20} />

        <Input placeholder="Phone" value={phone} onChange={setPhone} />
        <Divider height={30} />
        <Button
          text={edit ? 'Update' : 'Submit'}
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
                    dispatch(getSuppliersList(currentBusiness?._id) as any),
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
    fontFamily: 'Montserrat',
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
});

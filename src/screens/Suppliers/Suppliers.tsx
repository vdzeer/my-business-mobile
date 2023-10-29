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
import { phoneReg } from '../../store/config';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { TOASTS } from '../../i18n/toasts';
import i18n from '../../i18n';

export const Suppliers: React.FC<SuppliersProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState<any>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [isValidForm, setIsValidForm] = useState({
    name: true,
    phone: true,
  });

  const validateForm = (onSuccess: any) => {
    let isValid = true;

    if (name.length > 2) {
      setIsValidForm(prev => ({ ...prev, name: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, name: false }));
    }

    if (phoneReg.test(phone)) {
      setIsValidForm(prev => ({ ...prev, phone: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, phone: false }));
    }

    if (isValid) {
      onSuccess();
    }
  };

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
                dispatch(
                  deleteSupplier(
                    item?.id,
                    () => {
                      Toast.show({
                        text1: TOASTS[i18n.language].SUCCESS_DELETE_SUPPLIER,
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
          isValid={isValidForm.name}
        />
        <Divider height={20} />

        <Input
          placeholder={t('phone')}
          value={phone}
          onChange={setPhone}
          inBottomSheet
          isValid={isValidForm.phone}
        />
        <Divider height={30} />
        <Button
          text={edit ? t('update') : t('submit')}
          mode="large"
          onPress={() => {
            if (edit) {
              validateForm(() =>
                dispatch(
                  updateSupplier(
                    {
                      name,
                      contact: phone,
                      supplierId: item?.id,
                      businessId: currentBusiness?.id,
                    },
                    () => {
                      Toast.show({
                        text1: TOASTS[i18n.language].SUCCESS_UPDATE_SUPPLIER,
                      });
                      setOpen(false);
                    },
                    (error: string) => {
                      Toast.show({
                        text1: TOASTS[i18n.language].ERROR,
                        text2:
                          TOASTS[i18n.language][error] ?? 'Unexpected error',
                        type: 'error',
                      });
                    },
                  ) as any,
                ),
              );
            } else {
              validateForm(() =>
                dispatch(
                  createSupplier(
                    {
                      name,
                      contact: phone,
                      businessId: currentBusiness?.id,
                    },
                    () => {
                      Toast.show({
                        text1: TOASTS[i18n.language].SUCCESS_CREATE_SUPPLIER,
                      });
                      setOpen(false);
                    },
                    (error: string) => {
                      Toast.show({
                        text1: TOASTS[i18n.language].ERROR,
                        text2:
                          TOASTS[i18n.language][error] ?? 'Unexpected error',
                        type: 'error',
                      });
                    },
                  ) as any,
                ),
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

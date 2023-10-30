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
import { PromocodesProps } from './types';
import { PromocodeCard } from './components/SupplierCard';
import { useDispatch, useSelector } from 'react-redux';

import {
  createPromocode,
  deletePromocode,
  getPromocodesList,
  updatePromocode,
} from '../../store/slices/promocodes';
import { useTranslation } from 'react-i18next';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { TOASTS } from '../../i18n/toasts';
import i18n from '../../i18n';

export const Promocodes: React.FC<PromocodesProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState<any>(null);

  const [code, setCode] = useState('');
  const [percent, setPercent] = useState('');
  const [amount, setAmount] = useState('');

  const [isValidForm, setIsValidForm] = useState({
    code: true,
    percent: true,
    amount: true,
  });

  const validateForm = (onSuccess: any) => {
    let isValid = true;

    if (code.length > 2) {
      setIsValidForm(prev => ({ ...prev, code: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, code: false }));
    }

    if (Number(percent) > 0) {
      setIsValidForm(prev => ({ ...prev, percent: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, percent: false }));
    }

    if (Number(amount) > 0) {
      setIsValidForm(prev => ({ ...prev, amount: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, amount: false }));
    }

    if (isValid) {
      onSuccess();
    }
  };

  const { promocodes } = useSelector((store: any) => store.promocode);
  const { currentBusiness } = useSelector((store: any) => store.business);

  const [promocodesList, setPromocodesList] = useState<any>(null);

  useEffect(() => {
    setPromocodesList(promocodes);
  }, [promocodes]);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header />
        <Divider height={20} />
        <View style={styles.headerWrapper}>
          <Text style={styles.titleText}>{t('promocodes')}</Text>
          <ActionButton
            iconName="plus"
            onPress={() => {
              setOpen(true);
              setEdit(false);
              setCode('');
              setPercent('');
              setAmount('');
            }}
            size="large"
          />
        </View>
        <Divider height={20} />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={promocodesList ?? []}
          renderItem={({ item }) => (
            <PromocodeCard
              name={item.promocode}
              phone={item.sale_percent + '%'}
              onDelete={() => {
                dispatch(
                  deletePromocode(
                    item?.id,
                    () => {
                      Toast.show({
                        text1: TOASTS[i18n.language].SUCCESS_DELETE_PROMOCODE,
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
                setCode(item.promocode);
                setPercent(item.sale_percent + '');
                setAmount(item.use_amount + '');
                setOpen(true);
              }}
            />
          )}
          style={styles.list}
        />
      </View>
      <BottomSheet
        open={open}
        snapPoints={Platform.OS === 'ios' ? ['50%'] : ['60%']}
        onDismiss={() => {
          setOpen(false);
        }}>
        <Input
          placeholder={t('promocode')}
          value={code}
          onChange={setCode}
          inBottomSheet
          isValid={isValidForm.code}
        />
        <Divider height={20} />

        <Input
          placeholder={t('salePercent')}
          value={percent}
          onChange={setPercent}
          inBottomSheet
          isValid={isValidForm.percent}
        />
        <Divider height={20} />

        <Input
          placeholder={t('useAmount')}
          value={amount}
          onChange={setAmount}
          inBottomSheet
          isValid={isValidForm.amount}
        />
        <Divider height={30} />
        <Button
          text={edit ? t('update') : t('submit')}
          mode="large"
          onPress={() => {
            if (edit) {
              validateForm(() =>
                dispatch(
                  updatePromocode(
                    {
                      promocode: code,
                      useAmount: amount,
                      salePercent: percent,
                      businessId: currentBusiness?.id,
                      promocodeId: item?.id,
                    },
                    () => {
                      Toast.show({
                        text1: TOASTS[i18n.language].SUCCESS_UPDATE_PROMOCODE,
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
                  createPromocode(
                    {
                      promocode: code,
                      useAmount: amount,
                      salePercent: percent,
                      businessId: currentBusiness?.id,
                    },
                    () => {
                      Toast.show({
                        text1: TOASTS[i18n.language].SUCCESS_CREATE_PROMOCODE,
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

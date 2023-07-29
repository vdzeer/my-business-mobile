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
          data={promocodesList ?? []}
          renderItem={({ item }) => (
            <PromocodeCard
              name={item.promocode}
              phone={item.salePercent + '%'}
              onDelete={() => {
                dispatch(deletePromocode(item?._id) as any);
              }}
              onEdit={() => {
                setItem(item);
                setEdit(true);
                setCode(item.promocode);
                setPercent(item.salePercent + '');
                setAmount(item.useAmount + '');
                setOpen(true);
              }}
            />
          )}
          style={styles.list}
        />
      </View>
      <BottomSheet
        open={open}
        snapPoints={['40%']}
        onDismiss={() => {
          setOpen(false);
        }}>
        <Input
          placeholder={t('promocode')}
          value={code}
          onChange={setCode}
          inBottomSheet
        />
        <Divider height={20} />

        <Input
          placeholder={t('salePercent')}
          value={percent}
          onChange={setPercent}
          inBottomSheet
        />
        <Divider height={20} />

        <Input
          placeholder={t('useAmount')}
          value={amount}
          onChange={setAmount}
          inBottomSheet
        />
        <Divider height={30} />
        <Button
          text={edit ? t('update') : t('submit')}
          mode="large"
          onPress={() => {
            if (edit) {
              dispatch(
                updatePromocode(
                  {
                    promocode: code,
                    useAmount: amount,
                    salePercent: percent,
                    businessId: currentBusiness?._id,
                    promocodeId: item?._id,
                  },
                  () => {
                    setOpen(false);
                  },
                ) as any,
              );
            } else {
              dispatch(
                createPromocode(
                  {
                    promocode: code,
                    useAmount: amount,
                    salePercent: percent,
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

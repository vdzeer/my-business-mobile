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
import { CategoriesProps } from './types';
import { PromocodeCard } from './components/SupplierCard';
import { useDispatch, useSelector } from 'react-redux';

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '../../store/slices/products';
import { useTranslation } from 'react-i18next';

export const Categories: React.FC<CategoriesProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState<any>(null);

  const [name, setName] = useState('');

  const { categories } = useSelector((store: any) => store.products);
  const { currentBusiness } = useSelector((store: any) => store.business);

  const [categoriesList, setCategoriesList] = useState<any>(null);

  useEffect(() => {
    setCategoriesList(categories);
  }, [categories]);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header withGoBack />
        <Divider height={20} />
        <View style={styles.headerWrapper}>
          <Text style={styles.titleText}>{t('editCategory')}</Text>
          <ActionButton
            iconName="plus"
            onPress={() => {
              setOpen(true);
              setEdit(false);
              setName('');
            }}
            size="large"
          />
        </View>
        <Divider height={20} />

        <FlatList
          data={categoriesList ?? []}
          renderItem={({ item }) => (
            <PromocodeCard
              name={item?.name}
              phone={''}
              onDelete={() => {
                dispatch(deleteCategory(item?._id) as any);
              }}
              onEdit={() => {
                setItem(item);
                setEdit(true);
                setName(item.name);
                setOpen(true);
              }}
            />
          )}
          style={styles.list}
        />
      </View>
      <BottomSheet
        open={open}
        snapPoints={['20%']}
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

        <Button
          text={edit ? t('update') : t('submit')}
          mode="large"
          onPress={() => {
            if (edit) {
              const formData = new FormData();

              formData.append('name', name);
              formData.append('categoryId', item?._id);

              dispatch(
                updateCategory(formData, () => {
                  setOpen(false);
                }) as any,
              );
            } else {
              const formData = new FormData();

              formData.append('name', name);
              formData.append('businessId', currentBusiness?._id);
              dispatch(
                createCategory(formData, () => {
                  setOpen(false);
                }) as any,
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

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
import { CategoriesProps } from './types';
import { PromocodeCard } from './components/SupplierCard';
import { useDispatch, useSelector } from 'react-redux';

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '../../store/slices/products';
import { useTranslation } from 'react-i18next';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { TOASTS } from '../../i18n/toasts';
import i18n from '../../i18n';

export const Categories: React.FC<CategoriesProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState<any>(null);

  const [name, setName] = useState('');

  const [isValidForm, setIsValidForm] = useState({
    name: true,
  });

  const validateForm = (onSuccess: any) => {
    let isValid = true;

    if (name.length > 2 && name.length < 20) {
      setIsValidForm(prev => ({ ...prev, name: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, name: false }));
    }

    if (isValid) {
      onSuccess();
    }
  };

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
          showsVerticalScrollIndicator={false}
          data={categoriesList ?? []}
          renderItem={({ item }) => (
            <PromocodeCard
              name={item?.name}
              phone={''}
              onDelete={() => {
                dispatch(
                  deleteCategory(
                    item?.id,
                    () => {
                      Toast.show({
                        text1: TOASTS[i18n.language].SUCCESS_DELETE_CATEGORY,
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
                  ) as any,
                );
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
        snapPoints={['30%']}
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

        <Button
          text={edit ? t('update') : t('submit')}
          mode="large"
          onPress={() => {
            if (edit) {
              const formData = new FormData();

              formData.append('name', name);
              formData.append('categoryId', item?.id);
              validateForm(() =>
                dispatch(
                  updateCategory(
                    formData,
                    () => {
                      Toast.show({
                        text1: TOASTS[i18n.language].SUCCESS_UPDATE_CATEGORY,
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
              const formData = new FormData();

              formData.append('name', name);
              formData.append('businessId', currentBusiness?.id);
              validateForm(() =>
                dispatch(
                  createCategory(
                    formData,
                    () => {
                      Toast.show({
                        text1: TOASTS[i18n.language].SUCCESS_CREATE_CATEGORY,
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

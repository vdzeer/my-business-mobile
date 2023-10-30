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
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  ActionButton,
  BottomSheet,
  Button,
  Divider,
  Icon,
  Input,
} from '../../components';
import { useNavigation } from '@react-navigation/native';
import { BusinessListProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { loginBusiness } from '../../store/slices/business';
import { getMe, logout } from '../../store/slices/auth';
import axiosInstance from '../../store/axios';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { TOASTS } from '../../i18n/toasts';
import i18n from '../../i18n';

export const BusinessList: React.FC<BusinessListProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');

  const [isValidForm, setIsValidForm] = useState({
    password: true,
  });

  const validateForm = (onSuccess: any) => {
    let isValid = true;

    if (password.length >= 6) {
      setIsValidForm(prev => ({ ...prev, password: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, password: false }));
    }
    if (isValid) {
      onSuccess();
    }
  };

  const [current, setCurrent] = useState<any>(null);

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };

  const { profile, token } = useSelector((store: any) => store.auth);
  useEffect(() => {
    !profile?.businesses?.length && navigation.navigate('CreateBusiness');
  }, [profile?.businesses]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        getMe(),
        () => {},
        (error: string) => {
          Toast.show({
            text1: TOASTS[i18n.language].ERROR,
            text2: TOASTS[i18n.language][error] ?? 'Unexpected error',
            type: 'error',
          });
        },
      );
    }, 1000);
  }, [token]);

  useEffect(() => {
    profile?.language && i18next.changeLanguage(profile?.language);
  }, [profile?.language]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        setOpen(true);
        setCurrent(item);
      }}>
      <Text style={styles.listText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.headerWrapper}>
        <Text style={styles.titleText}>{t('myBusiness')}</Text>
        {profile?.businesses?.length <
          profile?.subscription?.business_length && (
          <ActionButton
            iconName="plus"
            onPress={() => {
              navigation.navigate('CreateBusiness');
            }}
            size="large"
          />
        )}
      </View>
      <Divider height={20} />

      <TouchableWithoutFeedback onPress={onPressDismiss}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={profile?.businesses ?? []}
          renderItem={renderItem}
          style={styles.list}
        />
      </TouchableWithoutFeedback>
      <View style={styles.buttonWrapper}>
        <Button
          onPress={() => {
            dispatch(logout());
          }}
          text={t('logout')}
        />
      </View>

      <BottomSheet
        open={open}
        snapPoints={['40%']}
        onDismiss={() => {
          setOpen(false);
        }}>
        <Input
          placeholder={t('password')}
          onChange={setPassword}
          secureTextEntry
          inBottomSheet
          isValid={isValidForm.password}
        />

        <Divider height={40} />
        <Button
          text={t('openBusiness')}
          mode="large"
          onPress={() => {
            validateForm(() => {
              dispatch(
                loginBusiness(
                  {
                    businessId: current?.id,
                    password,
                  },
                  () => {
                    setOpen(false);
                    navigation.navigate('Business');
                  },
                  (error: string) => {
                    Toast.show({
                      text1: TOASTS[i18n.language].ERROR,
                      text2: TOASTS[i18n.language][error] ?? 'Unexpected error',
                      type: 'error',
                    });
                  },
                ),
              );
            });
          }}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: Platform.OS === 'ios' ? 0 : 20,
  },
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#D9F0FF',
    borderRadius: 10,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',

    paddingLeft: 20,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  titleText: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',

    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
  area: { flex: 1 },
  list: { paddingHorizontal: 15, paddingTop: 20, height: '70%' },
  listItem: {
    height: 60,
    width: '100%',
    backgroundColor: '#D9F0FF',
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  listText: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',

    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
  },
});

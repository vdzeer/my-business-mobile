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
  ImageInput,
  Input,
} from '../../components';
import { useNavigation } from '@react-navigation/native';
import { WorkersProps } from './types';
import { WorkerCard } from './components/WorkerCard';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser } from '../../store/slices/business';
import { Platform } from 'react-native';
import { emailReg } from '../../store/config';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { TOASTS } from '../../i18n/toasts';
import i18n from '../../i18n';

export const Workers: React.FC<WorkersProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [isValidForm, setIsValidForm] = useState({
    name: true,
    email: true,
  });

  const validateForm = (onSuccess: any) => {
    let isValid = true;

    if (name.length > 2) {
      setIsValidForm(prev => ({ ...prev, name: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, name: false }));
    }

    if (emailReg.test(email)) {
      setIsValidForm(prev => ({ ...prev, email: true }));
    } else {
      isValid = false;
      setIsValidForm(prev => ({ ...prev, email: false }));
    }

    if (isValid) {
      onSuccess();
    }
  };

  const { currentBusiness } = useSelector((store: any) => store.business);
  const { profile } = useSelector((store: any) => store.auth);

  const [workerList, setWorkerList] = useState<any>(null);

  useEffect(() => {
    setWorkerList(currentBusiness?.workers);
  }, [currentBusiness]);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header />
        <Divider height={20} />
        <View style={styles.headerWrapper}>
          <Text style={styles.titleText}>{t('yourWorkers')}</Text>
          <ActionButton
            iconName="plus"
            onPress={() => {
              if (
                currentBusiness?.workers?.length <
                profile.subscription.users_length
              ) {
                setOpen(true);
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
          data={workerList}
          renderItem={({ item }) => (
            <WorkerCard
              name={item.name}
              email={item.email}
              onDelete={() => {
                dispatch(
                  deleteUser(
                    {
                      businessId: currentBusiness?.id,
                      email: item.email,
                    },
                    () => {
                      Toast.show({
                        text1: TOASTS[i18n.language].SUCCESS_DELETE_USER,
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
          inBottomSheet
          onChangeText={setName}
          isValid={isValidForm.name}
        />
        <Divider height={20} />

        <Input
          placeholder={t('email')}
          inBottomSheet
          onChangeText={setEmail}
          isValid={isValidForm.email}
        />
        <Divider height={30} />
        <Button
          text={t('submit')}
          mode="large"
          onPress={() => {
            validateForm(() =>
              dispatch(
                addUser(
                  {
                    businessId: currentBusiness?.id,
                    name,
                    email,
                  },
                  () => {
                    Toast.show({
                      text1: TOASTS[i18n.language].SUCCESS_CREATE_USER,
                    });
                  },
                  (error: string) => {
                    Toast.show({
                      text1: TOASTS[i18n.language].ERROR,
                      text2: TOASTS[i18n.language][error] ?? 'Unexpected error',
                      type: 'error',
                    });
                  },
                ),
              ),
            );

            setOpen(false);
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

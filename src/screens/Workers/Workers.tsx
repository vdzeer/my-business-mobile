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

export const Workers: React.FC<WorkersProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
                profile.subscription.usersLength
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
                  deleteUser({
                    businessId: currentBusiness?._id,
                    email: item.email,
                  }),
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
        <Input placeholder={t('name')} inBottomSheet onChangeText={setName} />
        <Divider height={20} />

        <Input placeholder={t('email')} inBottomSheet onChangeText={setEmail} />
        <Divider height={30} />
        <Button
          text={t('submit')}
          mode="large"
          onPress={() => {
            name &&
              email &&
              dispatch(
                addUser({
                  businessId: currentBusiness?._id,
                  name,
                  email,
                }),
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

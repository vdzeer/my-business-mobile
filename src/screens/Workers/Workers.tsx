import React, { useState } from 'react';
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

export const Workers: React.FC<WorkersProps> = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState<any>(false);

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
              setOpen(true);
            }}
            size="large"
          />
        </View>
        <Divider height={20} />

        <FlatList
          data={[
            { name: 'Zakhar', phone: 'Kurska' },
            { name: 'Zakhar', phone: 'Kurska' },
          ]}
          renderItem={({ item }) => (
            <WorkerCard name={item.name} image={item.phone} />
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
        <ImageInput onSelect={setPhoto} />
        <Divider height={20} />

        <Input placeholder={t('name')} inBottomSheet />
        <Divider height={20} />

        <Input placeholder={t('email')} inBottomSheet />
        <Divider height={30} />
        <Button
          text={t('submit')}
          mode="large"
          onPress={() => {
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
    fontFamily: 'Montserrat',
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
});

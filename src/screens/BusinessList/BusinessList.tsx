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
import { BottomSheet, Button, Divider, Icon, Input } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { BusinessListProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { loginBusiness } from '../../store/slices/business';

export const BusinessList: React.FC<BusinessListProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');

  const [current, setCurrent] = useState<any>(null);

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };

  const { profile } = useSelector((store: any) => store.auth);

  useEffect(() => {
    !profile.businesses.length && navigation.navigate('CreateBusiness');
  }, [profile.businesses]);

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
      <TouchableWithoutFeedback onPress={onPressDismiss}>
        <FlatList
          data={profile.businesses ?? []}
          renderItem={renderItem}
          style={styles.list}
        />
      </TouchableWithoutFeedback>
      <BottomSheet
        open={open}
        snapPoints={['30%']}
        onDismiss={() => {
          setOpen(false);
        }}>
        <Input placeholder="Password" onChange={setPassword} />
        <Divider height={40} />
        <Button
          text="Open your business"
          mode="large"
          onPress={() => {
            dispatch(
              loginBusiness(
                {
                  businessId: current?._id,
                  password,
                },
                () => {
                  navigation.navigate('Business');
                },
              ),
            );
          }}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: { flex: 1 },
  list: { paddingHorizontal: 15, paddingTop: 20 },
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
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
  },
});

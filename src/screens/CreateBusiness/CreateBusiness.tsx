import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, Divider, Icon, ImageInput, Input } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { CreateBusinessProps } from './types';
import DeviceInfo from 'react-native-device-info';
import { useDispatch } from 'react-redux';
import { createBusiness } from '../../store/slices/business';

export const CreateBusiness: React.FC<CreateBusinessProps> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const onPressDismiss = () => {
    Keyboard.dismiss();
  };

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState<any>('');

  return (
    <SafeAreaView style={styles.area}>
      <TouchableWithoutFeedback onPress={onPressDismiss}>
        <View style={styles.container}>
          <Text style={styles.titleText}>CREATE YOUR BUSINESS</Text>

          <Divider height={80} />

          <Input placeholder="Name" onChange={setName} />
          <Divider height={20} />
          <Input placeholder="Password" onChange={setPassword} />
          <Divider height={20} />
          <ImageInput onSelect={setPhoto} />

          <Divider height={40} />

          <View style={styles.buttonsWrapper}>
            <Button
              text="Submit"
              onPress={() => {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('password', password);
                photo.path &&
                  formData.append('image', {
                    name: photo.filename,
                    type: photo.mime ?? 'image/jpeg',
                    uri: photo.path,
                  });

                dispatch(
                  createBusiness(
                    formData,
                    () => {
                      navigation.navigate('BusinessList');
                    },
                    () => {},
                  ) as any,
                );
              }}
            />
          </View>
          <Divider height={140} />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    color: '#000000',
    fontSize: 28,
  },
  descriptionText: {
    fontFamily: 'Montserrat',
    color: '#000000',
    fontSize: 16,
    opacity: 0.5,
    width: '60%',
  },
});

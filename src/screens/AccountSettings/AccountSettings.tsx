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
import { AccountSettingsProps } from './types';

export const AccountSettings: React.FC<AccountSettingsProps> = () => {
  const navigation = useNavigation<any>();
  const onPressDismiss = () => {
    Keyboard.dismiss();
  };

  const renderItem = ({ item }: any) => <></>;
  return (
    <SafeAreaView style={styles.area}>
      <TouchableWithoutFeedback onPress={onPressDismiss}>
        <View style={styles.container}>
          <Header />
          <Divider height={20} />
          <Text style={styles.titleText}>Welcome, Zahkar pes</Text>
          <Divider height={30} />
          <Text style={styles.descText}>
            Here you can change your plan and update your own details
          </Text>
          <Divider height={40} />

          <ImageInput />
          <Divider height={20} />

          <Input placeholder="Name" />
          <Divider height={20} />

          <Input placeholder="Last name" />
          <Divider height={20} />

          <Input placeholder="Email" />
          <Divider height={20} />

          <Input placeholder="Password" />
          <Divider height={40} />

          <Text style={styles.payText}>Payment & Subscriptions</Text>
          <Divider height={10} />

          <View style={styles.payContent}>
            <Text style={styles.subName}>name of subscription</Text>
            <View style={styles.payContent}>
              <ActionButton
                iconName="edit"
                onPress={() => {
                  navigation.navigate('Subscriptions');
                }}
                size="large"
              />
              <Divider width={10} />
              <ActionButton iconName="delete" onPress={() => {}} size="large" />
            </View>
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              text="Update"
              onPress={() => {
                navigation.navigate('NewOrder');
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  createbuttonWrapper: { alignSelf: 'center' },
  area: { flex: 1 },
  container: { paddingHorizontal: 15, height: '100%' },
  buttonWrapper: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  payContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  list: {
    marginTop: 20,
    height: '87%',
  },

  titleText: {
    fontFamily: 'Montserrat',
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
  subName: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    opacity: 0.4,
  },
  payText: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
  },
  descText: {
    fontFamily: 'Montserrat',
    color: '#000000',
    opacity: 0.4,
  },
});

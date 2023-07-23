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
import { BusinessSettingsProps } from './types';

export const BusinessSettings: React.FC<BusinessSettingsProps> = () => {
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
          <Text style={styles.titleText}>Business settings</Text>
          <Divider height={30} />
          <Text style={styles.descText}>
            Change properties of your business in a few clicks
          </Text>
          <Divider height={40} />

          <ImageInput />
          <Divider height={20} />

          <Input placeholder="Name" />

          <View style={styles.buttonWrapper}>
            <Button
              text="Submit"
              onPress={() => {
                navigation.navigate('NewOrder');
              }}
            />
            <ActionButton iconName="delete" onPress={() => {}} size="large" />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    bottom: 10,
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
  descText: {
    fontFamily: 'Montserrat',
    color: '#000000',
    opacity: 0.4,
  },
});

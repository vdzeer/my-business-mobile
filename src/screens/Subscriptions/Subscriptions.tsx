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
import { SubscriptionsProps } from './types';

export const Subscriptions: React.FC<SubscriptionsProps> = () => {
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
          <View style={styles.headerWrapper}>
            <ActionButton
              iconName="arrowLeft"
              onPress={() => {
                navigation.navigate('AccountSettings');
              }}
              size="large"
            />
            <Text style={styles.titleText}>Subscriptions</Text>
          </View>
          <Divider height={30} />
          <Text style={styles.descText}>
            To unlock the full potential of our features and take your business
            to new heights, we offer subscription plans tailored to your
            specific needs.
          </Text>
          <Divider height={40} />
          <View style={styles.subCard}>
            <View style={styles.subTextWrapper}>
              <Text style={styles.subText}>Zakhar Sub</Text>
              <Text style={styles.subText}>200 reksov</Text>
            </View>
            <Divider height={20} />

            <Text style={styles.subDesc}>Чтобы</Text>
            <Text style={styles.subDesc}>Не быть лохом</Text>
            <Text style={styles.subDesc}>Покупай</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subDesc: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    opacity: 0.4,
    marginLeft: 10,
  },

  subText: { fontFamily: 'Montserrat', fontSize: 18, fontWeight: '700' },
  subTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subCard: {
    backgroundColor: '#D9F0FF',
    borderRadius: 10,
    padding: 20,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
    textAlign: 'center',
  },
});

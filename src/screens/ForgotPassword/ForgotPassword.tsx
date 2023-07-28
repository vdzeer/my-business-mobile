import React, { useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ForgotPasswordProps } from './types';
import { Button, Divider, Icon, Input, KeyboardAware } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { forgotPassword } from '../../store/slices/auth';
import { useDispatch } from 'react-redux';

export const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };
  return (
    <SafeAreaView style={styles.area}>
      <TouchableWithoutFeedback onPress={onPressDismiss}>
        <View style={styles.container}>
          <KeyboardAware>
            <Text style={styles.titleText}>FORGOT PASSWORD?</Text>
            <Divider height={40} />
            <Text style={styles.descriptionText}>
              Don’t worry you can restore it now using form below
            </Text>
            <Divider height={60} />

            <Input
              placeholder="Email"
              value={email}
              onChange={v => setEmail(v)}
            />
            <Divider height={20} />

            <View style={styles.buttonsWrapper}>
              <Button
                text="Restore"
                onPress={() => {
                  dispatch(
                    //@ts-ignore
                    forgotPassword(
                      {
                        email,
                      },
                      () => {
                        navigation.goBack();
                      },
                    ),
                  );
                }}
              />
              <Button
                text="Back"
                withIcon
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </View>
            <Divider height={140} />
          </KeyboardAware>
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
    justifyContent: 'space-between',
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

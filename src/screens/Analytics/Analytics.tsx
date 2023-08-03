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
import { AnalyticsProps } from './types';

export const Analytics: React.FC<AnalyticsProps> = () => {
  const navigation = useNavigation<any>();

  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header />
        <Divider height={20} />
        <View style={styles.headerWrapper}>
          <Text style={styles.titleText}>
            Get analytic for range of incomes/consumptions
          </Text>
        </View>
        <Divider height={20} />
      </View>
      <BottomSheet
        open={open}
        snapPoints={['50%']}
        onDismiss={() => {
          setOpen(false);
        }}>
        <ImageInput />
        <Divider height={20} />

        <Input placeholder="Name" />
        <Divider height={20} />

        <Input placeholder="Email" />
        <Divider height={30} />
        <Button
          text="Submit"
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
    width: '80%',
  },
});

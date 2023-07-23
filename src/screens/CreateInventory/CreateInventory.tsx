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
  BottomSheet,
  Button,
  Divider,
  Icon,
  ImageInput,
  Input,
} from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CreateInventoryProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import {
  createInventory,
  getInventoryList,
  updateInventory,
} from '../../store/slices/inventory';

export const CreateInventory: React.FC<CreateInventoryProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const { params } = useRoute<any>();

  const { currentBusiness } = useSelector((store: any) => store.business);

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [lower, setLower] = useState('');
  useEffect(() => {
    if (params?.edit) {
      setName(params?.name);
      setAmount(params?.amount + '');
      setLower(params?.lowerRange + '');
    } else {
      setName('');
      setAmount('');
      setLower('');
    }
  }, [params]);

  const [photo, setPhoto] = useState<any>('');

  return (
    <SafeAreaView style={styles.area}>
      <TouchableWithoutFeedback onPress={onPressDismiss}>
        <View style={styles.container}>
          <Text style={styles.titleText}>
            {params?.edit
              ? 'Update your inventory '
              : 'Create your inventory in a few clicks'}
          </Text>
          <Divider height={40} />

          <ImageInput />
          <Divider height={20} />

          <Input placeholder="Name" onChange={setName} value={name} />
          <Divider height={20} />
          <Input placeholder="Amount" onChange={setAmount} value={amount} />
          <Divider height={20} />
          <Input placeholder="Lower range" onChange={setLower} value={lower} />
          <Divider height={20} />

          <View style={styles.buttonWrapper}>
            <Button
              text={params?.edit ? 'Update' : 'Submit'}
              onPress={() => {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('lowerRange', lower);
                formData.append('amount', amount);
                formData.append('businessId', currentBusiness?._id);

                // formData.append('image', {
                //   name: image.fileName,
                //   type: image.type,
                //   uri: image.uri,
                // });
                if (params?.edit) {
                  dispatch(
                    updateInventory(
                      formData,
                      () => {
                        dispatch(getInventoryList(currentBusiness?._id) as any);
                        navigation.navigate('Inventory');
                      },
                      () => {},
                    ) as any,
                  );
                } else {
                  dispatch(
                    createInventory(
                      formData,
                      () => {
                        navigation.navigate('Inventory');
                      },
                      () => {},
                    ) as any,
                  );
                }
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
});

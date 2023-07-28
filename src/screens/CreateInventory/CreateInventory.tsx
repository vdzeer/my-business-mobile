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
  Header,
  Icon,
  ImageInput,
  Input,
  KeyboardAware,
} from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CreateInventoryProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import {
  createInventory,
  getInventoryList,
  updateInventory,
} from '../../store/slices/inventory';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const CreateInventory: React.FC<CreateInventoryProps> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const { params } = useRoute<any>();

  const { currentBusiness } = useSelector((store: any) => store.business);

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };

  const [name, setName] = useState(params?.name ?? '');
  const [amount, setAmount] = useState(
    params?.amount ? params?.amount + '' : '',
  );
  const [lower, setLower] = useState(
    params?.lowerRange ? params?.lowerRange + '' : '',
  );
  const [photo, setPhoto] = useState<any>('');
  const [imageUrl, setImageUrl] = useState<any>(params?.image ?? '');

  console.log(params);

  return (
    <SafeAreaView style={styles.area}>
      <TouchableWithoutFeedback onPress={onPressDismiss}>
        <View style={styles.container}>
          <KeyboardAware>
            <Header withGoBack />
            <Divider height={40} />

            <Text style={styles.titleText}>
              {params?.edit
                ? 'Update your inventory '
                : 'Create your inventory in a few clicks'}
            </Text>
            <Divider height={40} />

            <ImageInput onSelect={setPhoto} imageUrl={imageUrl} />
            <Divider height={20} />

            <Input placeholder="Name" onChange={setName} value={name} />
            <Divider height={20} />
            <Input placeholder="Amount" onChange={setAmount} value={amount} />
            <Divider height={20} />
            <Input
              placeholder="Lower range"
              onChange={setLower}
              value={lower}
            />
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

                  params?._id && formData.append('inventoryId', params?._id);

                  photo.path &&
                    formData.append('image', {
                      name: photo.filename,
                      type: photo.mime ?? 'image/jpeg',
                      uri: photo.path,
                    } as any);
                  if (params?.edit) {
                    dispatch(
                      updateInventory(
                        formData,
                        () => {
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
          </KeyboardAware>
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
    marginTop: 20,
    // position: 'absolute',
    // bottom: 10,
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

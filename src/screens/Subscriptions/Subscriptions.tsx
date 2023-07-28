import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  ScrollView,
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
import {
  initConnection,
  getProducts,
  getSubscriptions,
  requestSubscription,
} from 'react-native-iap';

export const Subscriptions: React.FC<SubscriptionsProps> = () => {
  const navigation = useNavigation<any>();
  const [subscriptions, setSubscriptions] = useState<Array<any>>([]);

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    (async () => {
      await initConnection();
      const subs = await getSubscriptions({
        skus: [
          'mybusinessplus.lite',
          'mybusinessplus.base',
          'mybusinessplus.pro',
          'mybusinessplus.full',
        ],
      });

      setSubscriptions(subs);
    })();
  }, [navigation]);

  console.log('====================================');
  console.log(subscriptions);
  console.log('====================================');

  const handleSubscription = async (sku: string) => {
    try {
      await requestSubscription({ sku });
    } catch (err) {}
  };

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

          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.subCard}
              onPress={() => handleSubscription('mybusinessplus.lite')}>
              <View style={styles.subTextWrapper}>
                <Text style={styles.subText}>Lite</Text>
                <Text style={styles.subText}>
                  {subscriptions[0].localizedPrice}
                </Text>
              </View>
              <Divider height={20} />

              <Text style={styles.subDesc}>Can create:</Text>
              <Text style={styles.subDesc}>* 1 business</Text>
              <Text style={styles.subDesc}>* 5 products</Text>
              <Text style={styles.subDesc}>* 10 inventories</Text>
              <Text style={styles.subDesc}>* 2 suppliers</Text>
            </TouchableOpacity>

            <Divider height={20} />

            <TouchableOpacity
              style={styles.subCard}
              onPress={() => handleSubscription('mybusinessplus.base')}>
              <View style={styles.subTextWrapper}>
                <Text style={styles.subText}>Base</Text>
                <Text style={styles.subText}>
                  {subscriptions[1].localizedPrice}
                </Text>
              </View>
              <Divider height={20} />

              <Text style={styles.subDesc}>Can create:</Text>
              <Text style={styles.subDesc}>* 1 business</Text>
              <Text style={styles.subDesc}>* 20 products</Text>
              <Text style={styles.subDesc}>* 50 inventories</Text>
              <Text style={styles.subDesc}>* 10 suppliers</Text>
              <Text style={styles.subDesc}>* 1 worker</Text>
            </TouchableOpacity>

            <Divider height={20} />

            <TouchableOpacity
              style={styles.subCard}
              onPress={() => handleSubscription('mybusinessplus.pro')}>
              <View style={styles.subTextWrapper}>
                <Text style={styles.subText}>Pro</Text>
                <Text style={styles.subText}>
                  {subscriptions[2].localizedPrice}
                </Text>
              </View>
              <Divider height={20} />

              <Text style={styles.subDesc}>Can create:</Text>
              <Text style={styles.subDesc}>* 3 businesses</Text>
              <Text style={styles.subDesc}>* 100 products</Text>
              <Text style={styles.subDesc}>* 200 inventories</Text>
              <Text style={styles.subDesc}>* 100 suppliers</Text>
              <Text style={styles.subDesc}>* 5 workers</Text>
            </TouchableOpacity>

            <Divider height={20} />

            <TouchableOpacity
              style={styles.subCard}
              onPress={() => handleSubscription('mybusinessplus.full')}>
              <View style={styles.subTextWrapper}>
                <Text style={styles.subText}>Full</Text>
                <Text style={styles.subText}>
                  {subscriptions[3].localizedPrice}
                </Text>
              </View>
              <Divider height={20} />

              <Text style={styles.subDesc}>Can create:</Text>
              <Text style={styles.subDesc}>* 10 businesses</Text>
              <Text style={styles.subDesc}>* 1000 products</Text>
              <Text style={styles.subDesc}>* 2000 inventories</Text>
              <Text style={styles.subDesc}>* 1000 suppliers</Text>
              <Text style={styles.subDesc}>* 50 workers</Text>
            </TouchableOpacity>
          </ScrollView>
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

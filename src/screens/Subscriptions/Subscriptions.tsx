import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Linking,
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
import { useTranslation } from 'react-i18next';
import { updateSubscription } from '../../store/slices/auth';
import { useDispatch, useSelector } from 'react-redux';

const ids = {
  'mybusinessplus.lite': '64c38bc1939ea5354c0d8fde',
  'mybusinessplus.base': '64c38c23efc5ea36020b3664',
  'mybusinessplus.pro': '64c38c5f6ac05d364624f96a',
  'mybusinessplus.full': '64c38c7f6b09f43683d2b752',
};

const skus = {
  '64c38bc1939ea5354c0d8fde': 'mybusinessplus.lite',
  '64c38c23efc5ea36020b3664': 'mybusinessplus.base',
  '64c38c5f6ac05d364624f96a': 'mybusinessplus.pro',
  '64c38c7f6b09f43683d2b752': 'mybusinessplus.full',
};

export const Subscriptions: React.FC<SubscriptionsProps> = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [subscriptions, setSubscriptions] = useState<Array<any>>([]);
  const { profile } = useSelector((store: any) => store.auth);

  const currentSubscription =
    // @ts-ignore
    skus?.[profile?.subscription?._id] ?? 'mybusinessplus.lite';

  const onPressDismiss = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    (async () => {
      await initConnection();
      const subs = await getSubscriptions({
        skus: [
          'mybusinessplus.base',
          'mybusinessplus.pro',
          'mybusinessplus.full',
        ],
      });

      setSubscriptions(subs);
    })();
  }, [navigation]);

  const handleSubscription = async (sku: string) => {
    try {
      if (sku === 'mybusinessplus.lite') {
        // @ts-ignore
        dispatch(updateSubscription(ids[sku]));
      }
      await requestSubscription({ sku }).then(v => {
        if (v?.transactionReceipt) {
          // @ts-ignore
          dispatch(updateSubscription(ids[v.productId]));
        }
      });
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
            <Text style={styles.titleText}>{t('subscriptions')}</Text>
          </View>
          <Divider height={30} />

          <Text style={styles.descText}>{t('subscriptionDesc')}</Text>

          <Divider height={40} />

          {!!subscriptions?.length && (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  style={[
                    styles.subCard,
                    currentSubscription === 'mybusinessplus.lite'
                      ? styles.currentSubscription
                      : null,
                  ]}
                  onPress={() => handleSubscription('mybusinessplus.lite')}>
                  <View style={styles.subTextWrapper}>
                    <Text style={styles.subText}>Lite</Text>
                    <Text style={styles.subText}>{t('free')}</Text>
                  </View>
                  <Divider height={20} />

                  <Text style={styles.subDesc}>{t('canCreate')}</Text>
                  <Text style={styles.subDesc}>{`* 1 ${t('business')}`}</Text>
                  <Text style={styles.subDesc}>{`* 5 ${t('products')}`}</Text>
                  <Text style={styles.subDesc}>{`* 10 ${t(
                    'inventories',
                  )}`}</Text>
                  <Text style={styles.subDesc}>{`* 2 ${t('suppliers')}`}</Text>
                </TouchableOpacity>

                <Divider height={20} />

                <TouchableOpacity
                  style={[
                    styles.subCard,
                    currentSubscription === 'mybusinessplus.base'
                      ? styles.currentSubscription
                      : null,
                  ]}
                  onPress={() => handleSubscription('mybusinessplus.base')}>
                  <View style={styles.subTextWrapper}>
                    <Text style={styles.subText}>Base</Text>
                    <Text style={styles.subText}>
                      {
                        subscriptions.find(
                          el => el.productId === 'mybusinessplus.base',
                        ).localizedPrice
                      }
                    </Text>
                  </View>
                  <Divider height={20} />

                  <Text style={styles.subDesc}>{t('canCreate')}</Text>
                  <Text style={styles.subDesc}>{`* 1 ${t('business')}`}</Text>
                  <Text style={styles.subDesc}>{`* 20 ${t('products')}`}</Text>
                  <Text style={styles.subDesc}>{`* 50 ${t(
                    'inventories',
                  )}`}</Text>
                  <Text style={styles.subDesc}>{`* 10 ${t('suppliers')}`}</Text>
                  <Text style={styles.subDesc}>{`* 1 ${t('worker')}`}</Text>
                </TouchableOpacity>

                <Divider height={20} />

                <TouchableOpacity
                  style={[
                    styles.subCard,
                    currentSubscription === 'mybusinessplus.pro'
                      ? styles.currentSubscription
                      : null,
                  ]}
                  onPress={() => handleSubscription('mybusinessplus.pro')}>
                  <View style={styles.subTextWrapper}>
                    <Text style={styles.subText}>Pro</Text>
                    <Text style={styles.subText}>
                      {
                        subscriptions.find(
                          el => el.productId === 'mybusinessplus.pro',
                        ).localizedPrice
                      }
                    </Text>
                  </View>
                  <Divider height={20} />

                  <Text style={styles.subDesc}>{t('canCreate')}</Text>
                  <Text style={styles.subDesc}>{`* 3 ${t('business')}`}</Text>
                  <Text style={styles.subDesc}>{`* 100 ${t('products')}`}</Text>
                  <Text style={styles.subDesc}>{`* 200 ${t(
                    'inventories',
                  )}`}</Text>
                  <Text style={styles.subDesc}>{`* 100 ${t(
                    'suppliers',
                  )}`}</Text>
                  <Text style={styles.subDesc}>{`* 5 ${t('worker')}`}</Text>
                </TouchableOpacity>

                <Divider height={20} />

                <TouchableOpacity
                  style={[
                    styles.subCard,
                    currentSubscription === 'mybusinessplus.full'
                      ? styles.currentSubscription
                      : null,
                  ]}
                  onPress={() => handleSubscription('mybusinessplus.full')}>
                  <View style={styles.subTextWrapper}>
                    <Text style={styles.subText}>Full</Text>
                    <Text style={styles.subText}>
                      {
                        subscriptions.find(
                          el => el.productId === 'mybusinessplus.full',
                        ).localizedPrice
                      }
                    </Text>
                  </View>
                  <Divider height={20} />

                  <Text style={styles.subDesc}>{t('canCreate')}</Text>
                  <Text style={styles.subDesc}>{`* 10 ${t('business')}`}</Text>
                  <Text style={styles.subDesc}>{`* 300 ${t('products')}`}</Text>
                  <Text style={styles.subDesc}>{`* 500 ${t(
                    'inventories',
                  )}`}</Text>
                  <Text style={styles.subDesc}>{`* 100 ${t(
                    'suppliers',
                  )}`}</Text>
                  <Text style={styles.subDesc}>{`* 50 ${t('worker')}`}</Text>
                </TouchableOpacity>
              </ScrollView>

              <Divider height={30} />

              <View style={styles.buttonWrapper}>
                <Button
                  text={t('cancelSubs')}
                  onPress={() => {
                    Linking.openURL(
                      'https://apps.apple.com/account/subscriptions',
                    ).then(() => {
                      // @ts-ignore
                      dispatch(updateSubscription('64c38bc1939ea5354c0d8fde'));
                    });
                  }}
                  mode="large"
                />
              </View>
            </>
          )}
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
  currentSubscription: {
    borderColor: '#6F73D2',
    borderWidth: 2,
    backgroundColor: '#a2a3e1',
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

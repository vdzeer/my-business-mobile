import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AccountSettings,
  Analytics,
  Basket,
  BusinessList,
  BusinessSettings,
  Categories,
  CreateBusiness,
  CreateInventory,
  CreateProduct,
  Inventory,
  NewOrder,
  OrderHistory,
  PickInventory,
  Products,
  Promocodes,
  Subscriptions,
  Suppliers,
  Workers,
} from '../screens';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActionButton, Button, Divider, Icon } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/auth';
import { useTranslation } from 'react-i18next';

const HomeStack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation, state }: any) => {
  const closeDrawer = () => {
    navigation.closeDrawer();
  };
  const { profile } = useSelector((store: any) => store.auth);

  const { t } = useTranslation();
  return (
    <DrawerContentScrollView style={styles.drawerWrapper}>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <Icon name="logo" />
        </View>
        <TouchableOpacity
          style={[styles.iconContainer, { padding: 10 }]}
          onPress={() => {
            closeDrawer();
          }}>
          <Icon name="close" />
        </TouchableOpacity>
      </View>
      <Divider height={40} />
      <CustomDrawerItem
        navigation={navigation}
        state={state}
        screenName="NewOrder"
        label={t('newOrder')}
      />
      {profile?.role === 'creator' && (
        <>
          <CustomDrawerItem
            navigation={navigation}
            state={state}
            screenName="Products"
            label={t('products')}
          />
          <CustomDrawerItem
            navigation={navigation}
            state={state}
            screenName="Inventory"
            label={t('navigationInventory')}
          />
          <CustomDrawerItem
            navigation={navigation}
            state={state}
            screenName="Suppliers"
            label={t('navigationSuppliers')}
          />
          <CustomDrawerItem
            navigation={navigation}
            state={state}
            screenName="Promocodes"
            label={t('navigationPromocodes')}
          />
          <CustomDrawerItem
            navigation={navigation}
            state={state}
            screenName="Workers"
            label={t('navigationWorkers')}
          />
        </>
      )}

      <CustomDrawerItem
        navigation={navigation}
        state={state}
        screenName="Analytics"
        label={t('navigationAnalytics')}
      />
      <CustomDrawerItem
        navigation={navigation}
        state={state}
        screenName="OrderHistory"
        label={t('orderHistory')}
      />
      {profile?.role === 'creator' && (
        <CustomDrawerItem
          navigation={navigation}
          state={state}
          screenName="BusinessSettings"
          label={t('businessSettings')}
        />
      )}

      <CustomDrawerItem
        navigation={navigation}
        state={state}
        screenName="AccountSettings"
        label={t('accountSettings')}
      />
      <Divider height={60} />
      <CustomDrawerItem
        navigation={navigation}
        state={state}
        iconName="Logout"
        label={t('logout')}
      />
    </DrawerContentScrollView>
  );
};

const CustomDrawerItem = ({
  navigation,
  state,
  screenName,
  label,
  iconName,
}: any) => {
  const dispatch = useDispatch();

  const handleNavigation = () => {
    navigation.navigate(screenName);
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (iconName === 'Logout') {
          //@ts-ignore
          dispatch(logout());
        } else {
          handleNavigation();
        }
      }}>
      <View style={styles.elementWrapper}>
        <ActionButton
          size="large"
          iconName={screenName ?? iconName}
          onPress={() => {}}
          disabled
        />
        <Divider width={15} />
        <Text style={styles.drawerItemText as any}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SideBar = () => (
  <View style={{ flex: 1 }}>
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      initialRouteName="NewOrder"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: Dimensions.get('window').width,
        },
        drawerStatusBarAnimation: 'slide',
      }}>
      <Drawer.Screen name="NewOrder" component={NewOrder} />
      <Drawer.Screen name="Products" component={Products} />
      <Drawer.Screen name="Inventory" component={Inventory} />
      <Drawer.Screen name="Suppliers" component={Suppliers} />
      <Drawer.Screen name="Workers" component={Workers} />
      <Drawer.Screen name="Analytics" component={Analytics} />
      <Drawer.Screen name="OrderHistory" component={OrderHistory} />
      <Drawer.Screen name="BusinessSettings" component={BusinessSettings} />
      <Drawer.Screen name="AccountSettings" component={AccountSettings} />
      <Drawer.Screen name="Subscriptions" component={Subscriptions} />
      <Drawer.Screen name="Promocodes" component={Promocodes} />
    </Drawer.Navigator>
  </View>
);

export const HomeRouter: FC = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="BusinessList"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <HomeStack.Screen name={'CreateBusiness'} component={CreateBusiness} />
      <HomeStack.Screen name="CreateProduct" component={CreateProduct} />
      <HomeStack.Screen name="CreateInventory" component={CreateInventory} />
      <HomeStack.Screen name="Basket" component={Basket} />
      <HomeStack.Screen name="PickInventory" component={PickInventory} />
      <HomeStack.Screen name="Categories" component={Categories} />

      <HomeStack.Screen name={'BusinessList'} component={BusinessList} />
      <HomeStack.Screen name={'Business'} component={SideBar} />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerWrapper: { backgroundColor: '#A3D5FF', paddingHorizontal: 15 },
  elementWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 0 : 20,
  },
  iconContainer: { width: 40, height: 40 },

  drawerItemText: {
    fontSize: 18,

    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',

    fontWeight: '500',
  },
});

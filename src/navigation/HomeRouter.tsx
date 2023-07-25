import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AccountSettings,
  Analytics,
  Basket,
  BusinessList,
  BusinessSettings,
  CreateBusiness,
  CreateInventory,
  CreateProduct,
  Inventory,
  NewOrder,
  OrderHistory,
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
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActionButton, Button, Divider, Icon } from '../components';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/auth';

const HomeStack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation, state }: any) => {
  const closeDrawer = () => {
    navigation.closeDrawer();
  };
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
        label="New Order"
      />
      <CustomDrawerItem
        navigation={navigation}
        state={state}
        screenName="Products"
        label="Products"
      />
      <CustomDrawerItem
        navigation={navigation}
        state={state}
        screenName="Inventory"
        label="Inventory"
      />
      <CustomDrawerItem
        navigation={navigation}
        state={state}
        screenName="Suppliers"
        label="Suppliers"
      />
      <CustomDrawerItem
        navigation={navigation}
        state={state}
        screenName="Promocodes"
        label="Promocodes"
      />
      <CustomDrawerItem
        navigation={navigation}
        state={state}
        screenName="Workers"
        label="Workers"
      />
      <CustomDrawerItem
        navigation={navigation}
        state={state}
        screenName="Analytics"
        label="Analytics"
      />
      <CustomDrawerItem
        navigation={navigation}
        state={state}
        screenName="OrderHistory"
        label="Order History"
      />

      <CustomDrawerItem
        navigation={navigation}
        state={state}
        screenName="BusinessSettings"
        label="Business Settings"
      />
      <CustomDrawerItem
        navigation={navigation}
        state={state}
        screenName="AccountSettings"
        label="Account Settings"
      />
      <Divider height={60} />
      <CustomDrawerItem
        navigation={navigation}
        state={state}
        iconName="Logout"
        label="Log Out"
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
      }}>
      <Drawer.Screen name="NewOrder" component={NewOrder} />
      <Drawer.Screen name="Basket" component={Basket} />
      <Drawer.Screen name="Products" component={Products} />
      <Drawer.Screen name="CreateProduct" component={CreateProduct} />
      <Drawer.Screen name="Inventory" component={Inventory} />
      <Drawer.Screen name="CreateInventory" component={CreateInventory} />
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
      screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name={'CreateBusiness'} component={CreateBusiness} />
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
  },
  iconContainer: { width: 40, height: 40 },

  drawerItemText: {
    fontSize: 18,
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
});

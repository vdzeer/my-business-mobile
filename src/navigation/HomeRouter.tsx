import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

const HomeStack = createNativeStackNavigator();

const Home = () => (
  <View style={{ flex: 1 }}>
    <Text>Home</Text>
  </View>
);

export const HomeRouter: FC = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name={'Home'} component={Home} />
    </HomeStack.Navigator>
  );
};

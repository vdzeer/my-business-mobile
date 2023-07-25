import React, { FC, useEffect } from 'react';

import { AuthRouter } from './AuthRouter';
import { NavigationContainer } from '@react-navigation/native';
import { HomeRouter } from './HomeRouter';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { setTokenInstance } from '../store/axios';

const linking = {
  prefixes: ['mybusinesslink://'],
  config: {
    initialRouteName: 'ResetPassword',
    screens: {
      ResetPassword: {
        path: 'token/:token/:email',
      },
    },
  },
};

export const Application: FC = () => {
  const { token } = useSelector((store: any) => store.auth);

  useEffect(() => {
    token && setTokenInstance(token);
  }, [token]);

  return (
    <>
      <NavigationContainer linking={linking}>
        {token ? <HomeRouter /> : <AuthRouter />}
      </NavigationContainer>
    </>
  );
};

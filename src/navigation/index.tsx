import React, { FC } from 'react';

import { AuthRouter } from './AuthRouter';
import { NavigationContainer } from '@react-navigation/native';
import { HomeRouter } from './HomeRouter';

export const Application: FC = () => {
  const authorization = false;
  return (
    <>
      <NavigationContainer>
        {authorization ? <HomeRouter /> : <AuthRouter />}
      </NavigationContainer>
    </>
  );
};

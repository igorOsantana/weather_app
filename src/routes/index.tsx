import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { HomeRoutes } from './home.routes';

export const Routes = () => {
  return (
    <NavigationContainer>
      <HomeRoutes />
    </NavigationContainer>
  );
};

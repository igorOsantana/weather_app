import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { WeatherScreen } from '../screens/Weather';
import { SearchScreen } from '../screens/Search';

const { Navigator, Screen } = createStackNavigator();

export const HomeRoutes = () => {
  return (
    <Navigator>
      <Screen name='Search' component={SearchScreen} />
      <Screen name='Weather' component={WeatherScreen} />
    </Navigator>
  );
};

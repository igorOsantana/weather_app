import React from 'react';
import { View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { reloadData } from '../../store/slices/weatherSlice';

import { theme } from '../../global/styles/theme';

export const ReloadIcon = () => {
  const dispatch = useAppDispatch();

  const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh';

  const urlToBeReloaded = useAppSelector(state => state.weather.currentSearch);

  const handleReloadWeatherData = () => dispatch(reloadData(urlToBeReloaded));

  return (
    <View>
      <Ionicons
        onPress={handleReloadWeatherData}
        name={reloadIconName}
        size={24}
        color={theme.colors.primary_color}
      />
    </View>
  );
};

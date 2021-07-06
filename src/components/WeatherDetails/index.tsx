import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { WeatherProps } from '../../store/slices/weatherSlice';

export interface WeatherDataProps {
  currentWeather: WeatherProps;
  unit: string;
}

export const WeatherDetails = ({ currentWeather, unit }: WeatherDataProps) => {
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
  } = currentWeather;

  const windSpeed =
    unit === 'metric'
      ? `${Math.round(speed)} m/s`
      : `${Math.round(speed)} miles/h`;

  return (
    <View style={styles.weatherDetails}>
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: theme.colors.border_color,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <FontAwesome5
              name='temperature-low'
              size={25}
              color={theme.colors.primary_color}
            />
            <View style={styles.weatherDetailsItems}>
              <Text>Feels like:</Text>
              <Text style={styles.textSecondary}>
                {Math.round(feels_like)}°
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name='water'
              size={30}
              color={theme.colors.primary_color}
            />
            <View style={styles.weatherDetailsItems}>
              <Text>Humidity:</Text>
              <Text style={styles.textSecondary}>{humidity}%</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          ...styles.weatherDetailsRow,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border_color,
        }}
      >
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: theme.colors.border_color,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name='weather-windy'
              size={30}
              color={theme.colors.primary_color}
            />
            <View style={styles.weatherDetailsItems}>
              <Text>Wind speed</Text>
              <Text style={styles.textSecondary}>{windSpeed}</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name='speedometer'
              size={30}
              color={theme.colors.primary_color}
            />
            <View style={styles.weatherDetailsItems}>
              <Text>Pressure:</Text>
              <Text style={styles.textSecondary}>{pressure} hPa</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

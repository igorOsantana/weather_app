import React from 'react';
import { View, Text, Image } from 'react-native';

import { WeatherDataProps } from '../WeatherDetails';
import { styles } from './styles';

export const WeatherInfo = ({ currentWeather, unit }: WeatherDataProps) => {
  const {
    main: { temp },
    weather: [details],
    name,
  } = currentWeather;
  const { icon, main, description } = details;
  const icon_url = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  const icon_temp = unit === 'metric' ? '°C' : '°F';

  return (
    <View style={styles.weatherInfo}>
      <Text>{name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: icon_url }} />
      <Text style={styles.textPrimary}>
        {Math.round(temp)}
        {icon_temp}
      </Text>
      <View style={styles.weatherDescription}>
        <Text style={styles.textSecondary}>{main}</Text>
        <Text style={styles.textSecondary}>{description}</Text>
      </View>
    </View>
  );
};

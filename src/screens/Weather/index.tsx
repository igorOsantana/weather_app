import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { reloadData } from '../../store/slices/weatherSlice';

import { WeatherUnitsPicker } from '../../components/WeatherUnitsPicker';
import { ReloadIcon } from '../../components/ReloadIcon';
import { WeatherInfo } from '../../components/WeatherInfo';
import { WeatherDetails } from '../../components/WeatherDetails';
import { Spinner } from '../../components/Spinner';

import { styles } from './styles';

export const WeatherScreen = () => {
  const currentWeather = useAppSelector(state => state.weather.weatherData);
  const currentURl = useAppSelector(state => state.weather.currentSearch);
  const errorMessage = useAppSelector(state => state.weather.errorMsg);
  const isLoading = useAppSelector(state => state.weather.isLoading);

  const [unit, setUnit] = useState('metric');

  const dispatch = useAppDispatch();

  useEffect(() => {
    const urlToBeReload = currentURl.replace(/units=(\w+)/g, `units=${unit}`);
    if (currentURl !== urlToBeReload) dispatch(reloadData(urlToBeReload));
  }, [dispatch, unit, currentURl]);

  if (isLoading) {
    return <Spinner />;
  } else if (!!currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={styles.nav}>
          <WeatherUnitsPicker unit={unit} setUnit={setUnit} />
          <ReloadIcon />
        </View>
        <View style={styles.main}>
          <WeatherInfo currentWeather={currentWeather} unit={unit} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unit={unit} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar />
      </View>
    );
  }
};

import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../hooks';

import {
  getWeatherOnCityTyped,
  getWeatherOnCurrentLocation,
  setErrorMessage,
} from '../../store/slices/weatherSlice';
import { ButtonDefault } from '../../components/ButtonDefault';
import { PreviousSearch } from '../../components/PreviousSearch';

import { styles } from './styles';
import { Spinner } from '../../components/Spinner';

export const SearchScreen = () => {
  const [cityTyped, setCityTyped] = useState('');

  const errorMsg = useAppSelector(state => state.weather.errorMsg);
  const prevSearches = useAppSelector(state => state.weather.prevSearches);
  const isLoading = useAppSelector(state => state.weather.isLoading);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleSubmitCityTyped = async () => {
    if (cityTyped.length === 0) {
      dispatch(setErrorMessage('location is empty.'));
      return;
    }
    const wasFound = await dispatch(getWeatherOnCityTyped(cityTyped));

    if (wasFound === false) return;

    navigation.navigate('Weather');
    setCityTyped('');
    dispatch(setErrorMessage(''));
  };

  const handleSubmitCurrentLocation = async () => {
    const wasFound = await dispatch(getWeatherOnCurrentLocation());

    if (wasFound === false) return;

    navigation.navigate('Weather');
    setCityTyped('');
    dispatch(setErrorMessage(''));
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.titleInput}>Type your location here:</Text>
          <TextInput
            style={styles.input}
            placeholder='Ex: Vancouver'
            value={cityTyped}
            onChangeText={setCityTyped}
          />
          {!!errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
        </View>
        <View style={styles.btnContainer}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <ButtonDefault onPress={handleSubmitCityTyped}>
                Submit
              </ButtonDefault>
              <ButtonDefault onPress={handleSubmitCurrentLocation}>
                <MaterialIcons name='gps-fixed' size={30} color='white' />
              </ButtonDefault>
            </>
          )}
        </View>
        {prevSearches.length > 0 && (
          <View>
            <Text style={styles.titlePreviousSearches}>Previous Searches</Text>
            <View>
              {prevSearches.map((search, index) => (
                <PreviousSearch
                  key={index}
                  city={search.city}
                  details={search.details}
                />
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

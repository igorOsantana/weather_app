import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../../store';
import * as Location from 'expo-location';

import { WEATHER_API_KEY } from '@env';

export type WeatherProps = {
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
  };
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  name: string;
};

type PrevSearchesProps = {
  city: string;
  details: string;
};

type InitialStateProps = {
  weatherData: WeatherProps | null;
  prevSearches: PrevSearchesProps[];
  currentSearch: string;
  errorMsg: string;
  isLoading: boolean;
};

const initialState: InitialStateProps = {
  weatherData: null,
  prevSearches: [],
  currentSearch: '',
  errorMsg: '',
  isLoading: false,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherData: (
      state,
      { payload }: PayloadAction<WeatherProps | null>
    ) => {
      state.weatherData = payload;
    },
    setPrevSearch: (state, { payload }: PayloadAction<PrevSearchesProps>) => {
      state.prevSearches = state.prevSearches.filter(
        search => search.city !== payload.city
      );
      if (state.prevSearches.length === 3) state.prevSearches.pop();

      state.prevSearches.unshift(payload);
    },
    setCurrentSearch: (state, { payload }: PayloadAction<string>) => {
      state.currentSearch = payload;
    },
    setErrorMessage: (state, { payload }: PayloadAction<string>) => {
      state.errorMsg = payload;
    },
    setIsLoading: state => {
      state.isLoading = true;
    },
    removeIsLoading: state => {
      state.isLoading = false;
    },
  },
});

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?';

export const getWeatherOnCurrentLocation = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading());
    dispatch(setWeatherData(null));
    let wasFound: boolean;
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Access to location is needded to run the app.');
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      const weather_url = `${BASE_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`;
      const response = await fetch(weather_url);
      const data = await response.json();

      if (response.ok && response.status === 200) {
        dispatch(setWeatherData(data));
        dispatch(setCurrentSearch(weather_url));
        wasFound = true;
      } else {
        dispatch(setErrorMessage(data.message));
        wasFound = false;
      }
    } catch (error) {
      console.log('ERROR =', error);
      wasFound = false;
    }
    dispatch(removeIsLoading());
    return wasFound;
  };
};

export const getWeatherOnCityTyped = (city: string) => {
  return async (dispatch: AppDispatch) => {
    let wasFound: boolean;
    dispatch(setIsLoading());
    dispatch(setWeatherData(null));
    try {
      const weather_url = `${BASE_URL}q=${city}&units=metric&appid=${WEATHER_API_KEY}`;
      const response = await fetch(weather_url);
      const data = await response.json();

      if (response.ok && response.status === 200) {
        dispatch(setWeatherData(data));
        dispatch(
          setPrevSearch({
            city: data.name,
            details: data.sys.country,
          })
        );
        dispatch(setCurrentSearch(weather_url));
        wasFound = true;
      } else {
        dispatch(setErrorMessage(data.message));
        wasFound = false;
      }
    } catch (error) {
      console.log('ERROR =', error);
      wasFound = false;
    }
    dispatch(removeIsLoading());
    return wasFound;
  };
};

export const reloadData = (url: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading());
    dispatch(setWeatherData(null));
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && response.status === 200) {
        dispatch(setCurrentSearch(url));
        dispatch(setWeatherData(data));
      } else dispatch(setErrorMessage(data.message));
    } catch (error) {
      console.log('ERROR =', error);
    }
    dispatch(removeIsLoading());
  };
};

export const {
  setWeatherData,
  setPrevSearch,
  setCurrentSearch,
  setErrorMessage,
  setIsLoading,
  removeIsLoading,
} = weatherSlice.actions;

export default weatherSlice.reducer;

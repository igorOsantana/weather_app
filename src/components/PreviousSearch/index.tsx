import React from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch } from '../../hooks';
import { getWeatherOnCityTyped } from '../../store/slices/weatherSlice';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = {
  city: string;
  details: string;
};

export const PreviousSearch = ({ city, details }: Props) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handlePrevSearch = async () => {
    await dispatch(getWeatherOnCityTyped(city));
    navigation.navigate('Weather');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.city}>{city}</Text>
          <Text>{details}</Text>
        </View>
        <AntDesign
          name='arrowright'
          size={28}
          color={theme.colors.primary_color}
          onPress={handlePrevSearch}
        />
      </View>
    </View>
  );
};

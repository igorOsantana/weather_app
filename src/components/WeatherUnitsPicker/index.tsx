import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { styles } from './styles';

interface UnitPickerProps {
  unit: string;
  setUnit: (item: string) => void;
}

export const WeatherUnitsPicker = ({ unit, setUnit }: UnitPickerProps) => {
  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={unit}
        onValueChange={item => setUnit(item)}
      >
        <Picker.Item label='C°' value='metric' />
        <Picker.Item label='F°' value='anperial' />
      </Picker>
    </View>
  );
};

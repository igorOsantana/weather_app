import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: 'center',
  },
  weatherDescription: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  textPrimary: {
    fontSize: 40,
    color: theme.colors.primary_color,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  textSecondary: {
    fontSize: 20,
    color: theme.colors.secondary_color,
    fontWeight: '700',
    textTransform: 'capitalize',
    marginBottom: 20,
  },
});

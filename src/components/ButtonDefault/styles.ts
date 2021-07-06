import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 125,
    height: 50,
    borderRadius: 10,
    backgroundColor: theme.colors.primary_color,
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.border_color,
    marginVertical: 5,
    borderRadius: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary_color,
    borderRadius: 3,
  },
  city: {
    fontWeight: 'bold',
  },
});

import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleInput: {
    marginVertical: 20,
    fontSize: 20,
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: theme.colors.border_color,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  titlePreviousSearches: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  error: {
    textAlign: 'left',
    color: 'red',
    marginTop: 15,
    marginHorizontal: 10,
    textTransform: 'capitalize',
  },
});

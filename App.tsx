import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import { Routes } from './src/routes';
import { store } from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar />
        <Routes />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

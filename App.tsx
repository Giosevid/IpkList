import 'react-native-gesture-handler';
import React from 'react';
import ApplicationNavigator from './src/navigators/Application';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { api } from './src/services/api';
import { store, persistor } from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApiProvider api={api}>
          <PaperProvider>
            <ApplicationNavigator />
          </PaperProvider>
        </ApiProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

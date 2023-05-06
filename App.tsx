import 'react-native-gesture-handler';
import React from 'react';
import ApplicationNavigator from './src/navigators/Application';
import { Provider as PaperProvider } from 'react-native-paper';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { api } from './src/services/api';

const App = () => {
  return (
    <PaperProvider>
      <ApiProvider api={api}>
        <ApplicationNavigator />
      </ApiProvider>
    </PaperProvider>
  );
};

export default App;

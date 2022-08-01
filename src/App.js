import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./config/store";
import { Provider as PaperProvider  } from 'react-native-paper'

function App() {
  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

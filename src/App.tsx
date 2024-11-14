/* eslint-disable react-native/no-inline-styles */
import '@ethersproject/shims';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import 'src/locales';
import { SnackBarProvider } from 'src/shared/context/snackBarContext';
import { ThemeProvider } from 'src/shared/context/themeContext';
import { Navigation } from 'src/navigation';
import { LoaderComponent } from 'src/components';

import { deleteOldLogFiles } from 'src/quai-mdk/logging';

import { Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './store';


function App() {
  const [loading, setLoading] = useState(true);
  const { persistor, store } = configureStore();

  useEffect(() => {
    deleteOldLogFiles();
    setLoading(false);
  }, []);

  if (loading) {
    return <LoaderComponent text={'Welcome'} />;
  }
  return (
    <Provider store={store}>
    <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
    <SnackBarProvider>
      <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <SafeAreaProvider>
                <Navigation/>
              </SafeAreaProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
      </ThemeProvider>
    </SnackBarProvider>
    </PersistGate>
    </Provider>
  );
}

export default App;

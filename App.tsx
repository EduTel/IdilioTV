/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { RootNavigator } from './src/app/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-native-paper';
import { CatalogProvider } from './src/feature/Catalog/context/CatalogContext';
import { CatalogService } from './src/feature/Catalog/api/catalog.api';
import { CatalogInfoProvider } from './src/feature/catalogInfo/context/CatalogInfoContext';
import { CatalogInfoService } from './src/feature/catalogInfo/api/catalog.api';

const queryClient = new QueryClient();

const catalogService = new CatalogService();
const catalogInfoService = new CatalogInfoService();

if (__DEV__) {
  require('./ReactotronConfig');
}

function App() {
  return (
    <Provider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <CatalogInfoProvider service={catalogInfoService}>
            <CatalogProvider service={catalogService}>
              <RootNavigator />
            </CatalogProvider>
          </CatalogInfoProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;

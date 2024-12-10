/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import {
  StyleSheet,
  useColorScheme,
  View
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import ThemeColors from './src/theme/Colors';
import AppContainer from './src/navigation';
import BootSplash from "react-native-bootsplash";
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper'; // Import the Provider component from react-native-paper
import DataHandler from './src/utils/DataHandler';
import { MySnackbarComponent } from './src/components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ApplePayModule from './src/utils/ApplePayModule';



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [storeState, setStore] = useState(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  useEffect(() => {
    ApplePayModule.initialize('3240f0eae70a81ae1f731e7559703dd2', '1e1360-33.myshopify.com').then((message) => {
    })
    .catch((error) => {
      console.error('INIT ERROR: ',error);
    });
  }, []);


  const onStoreConfigure = (store: any) => {
    // set store
    const init = async () => {
      DataHandler.setStore(store);
      setTimeout(() => {
        setStore(store);
      }, 4500);
    };

    // hide splash
    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  };


  useEffect(() => {

    configureStore(onStoreConfigure)

  }, []);

  if (!storeState) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={'large'} color={ThemeColors.PRIMARY} />
    </View>; // Or render a loading indicator
  }

  return (
    <Provider store={storeState}>
      <PaperProvider>
        <GestureHandlerRootView>
          <AppContainer />
          <MySnackbarComponent />
        </GestureHandlerRootView>
      </PaperProvider>
    </Provider>
  );
}


export default App;

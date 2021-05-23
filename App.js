

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,

} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {ModalPortal} from 'react-native-modals'
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import {store,persistor} from './src/redux/store'
import Routes from './src/navigation/Routes'
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <SafeAreaView style={backgroundStyle,{flex:1}}>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <Routes/>
              <ModalPortal/>
              {/* <View>
                <Text> app.js </Text>
              </View> */}
          </PersistGate>
      </Provider>
      
    // </SafeAreaView>
  );
};

export default App;

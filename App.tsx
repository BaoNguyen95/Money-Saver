import React from 'react';
import { Provider } from "react-redux";
import 'react-native-gesture-handler';
import configureStore from './src/core/store/configureStore';
import HelperComponentProps from './src/shared/helper/helper.component';
import AppContainer from './src/navigation/app.switch';
import NavigationService from './src/navigation/navigation.service';
import 'intl';
import 'intl/locale-data/jsonp/en';

const App = () => {
  const store = configureStore();
  const navService = new NavigationService();
  return (
    <Provider store={store}>
      <AppContainer
        ref={navigatorRef => navService.setTopLevelNavigator(navigatorRef)}
      />
      <HelperComponentProps />
    </Provider>
  );
};

export default App;

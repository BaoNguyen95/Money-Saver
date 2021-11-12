import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { APP_TITLES } from '../shared/constants/common.constants';
import MyDrawer from './app.drawer';
import { HomeStack, HomeTabs, LoginStack } from './app.stack';

const AppNavigator = createSwitchNavigator({
    Login: { screen: LoginStack },
    App: { screen: HomeTabs },
}, {
    initialRouteName: APP_TITLES.LOGIN,
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

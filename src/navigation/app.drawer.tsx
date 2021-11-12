import React from 'react';
import { Button, Text } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { SafeAreaView } from 'react-navigation';
import { AdminStack, HomeStack, GroupStack, HomeTabs } from './app.stack';
import { APP_TITLES } from '../shared/constants/common.constants';
import NavigationService from './navigation.service';
import { AppStore } from '../core/store/configureStore';
import { LOGOUT } from '../core/actionTypes';
import { ROUTER } from './navigation.constants';
const CustomDrawer = (props: any) => {
    const navigation = new NavigationService();

    const onLogOut = () => {
        AppStore.dispatch({ type: LOGOUT });
        navigation.navigate(ROUTER.SCREEN.LOGIN);
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text style={{ fontSize: 32 }}>Drawer</Text>
            <DrawerItems {...props} />
            <Button title="Logout" onPress={() => onLogOut()} />
        </SafeAreaView>
    );
};

const MyDrawer = createDrawerNavigator({
    Home: { screen: HomeTabs },
    Administration: { screen: AdminStack },
}, {
    initialRouteName: APP_TITLES.HOME,
    contentComponent: CustomDrawer,

});

export default MyDrawer;
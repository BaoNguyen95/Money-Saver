import { createStackNavigator } from 'react-navigation-stack';
import RegistrationScreen from '../screens/registration/registration';
import LoginScreen from '../screens/login/login';
import AdminScreen from '../screens/admin/admin';
import React from 'react'

import { APP_TITLES } from '../shared/constants/common.constants';
import HomeScreen from '../screens/home/home';
import GroupScreen from '@moneysaver/screens/home/spending/group/spending.group';
import SpendingGroupScreen from '@moneysaver/screens/home/spending/group/spending.group.list';
import { APP_COLORS, APP_STYLE } from '@moneysaver/styles/app.style';
import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import UserProfileScreen from '../screens/user-profile/user-profile';
import { ROUTER } from './navigation.constants';

const PAGE = ROUTER.SCREEN;

const configSubScreen = (screen: any) => ({
    screen,
    navigationOptions: {
        headerTransparent: true,
    },
})

export type TabBarIconProps = {
    focused: boolean;
    tinColor: string;
    horizontal: boolean;
}

export const HomeStack = createStackNavigator({
    Home: HomeScreen,
    [PAGE.USER_PROFILE]: configSubScreen(UserProfileScreen),
}, {
    initialRouteName: APP_TITLES.HOME,
    initialRouteParams: { transition: 'fade' },
    navigationOptions: ({ navigation }) => {
        let tabBarVisible = true;
        let routeName = navigation.state.routes[navigation.state.index].routeName
        if (routeName == PAGE.USER_PROFILE) {
            tabBarVisible = false
        }
        return (
            {
                tabBarLabel: "My Plan",
                tabBarIcon: ({ focused }: TabBarIconProps) => <Icon size={20} name={'user'} color={focused ? APP_COLORS.MAIN_COLOR : APP_COLORS.LIGHT_GRAY} />,
                tabBarVisible
            }
        )
    },
})

export const GroupStack = createStackNavigator({
    Group: GroupScreen,
    SpendingGroup: configSubScreen(SpendingGroupScreen),
    [PAGE.USER_PROFILE]: configSubScreen(UserProfileScreen),
}, {
    initialRouteName: APP_TITLES.GROUP,
    navigationOptions: ({ navigation }) => {
        let tabBarVisible = true;
        let routeName = navigation.state.routes[navigation.state.index].routeName
        if (routeName == PAGE.USER_PROFILE) {
            tabBarVisible = false
        }
        return (
            {
                tabBarLabel: "My Group",
                tabBarIcon: ({ focused }: TabBarIconProps) => <Icon size={20} name={'users'} color={focused ? APP_COLORS.MAIN_COLOR : APP_COLORS.LIGHT_GRAY} />,
                tabBarVisible
            }
        )
    },
})

export const AdminStack = createStackNavigator({
    Administration: AdminScreen,
}, {
    initialRouteName: APP_TITLES.ADMINISTRATION,
})

export const LoginStack = createStackNavigator({
    Login: LoginScreen,
    Registration: RegistrationScreen,
}, {
    initialRouteName: APP_TITLES.LOGIN,
});

export const HomeTabs = createMaterialBottomTabNavigator({
    Home: HomeStack,
    Group: GroupStack,
}, {
    initialRouteName: APP_TITLES.HOME,
    barStyle: {
        ...APP_STYLE.boxShadow,
        backgroundColor: APP_COLORS.SOLID_WHITE,
        borderTopWidth: 0,
    },
    labeled: false,
    shifting: false,
});



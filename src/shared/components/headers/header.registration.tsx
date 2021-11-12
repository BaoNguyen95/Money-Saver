import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { APP_COLORS, APP_STYLE } from '../../../styles/app.style';
import { APP_TITLES } from '../../constants/common.constants';
import MenuButton from '../menu.button';
import ProfileButton from '../profile.button';

const HeaderRegistration = ({ navigation }) => ({
    title: APP_TITLES.REGISTRATION,
    headerTitleStyle: APP_STYLE.headerStyle,
    headerTintColor: "rgba(255,255,255,0.8)",
    headerBackground: () => (
        <LinearGradient
            colors={[APP_COLORS.SUB_COLOR, APP_COLORS.MAIN_COLOR]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        />
    ),
    headerRightContainerStyle: {
        paddingRight: 10
    },
    headerLeft: () => <MenuButton navigation={navigation} />,
    headerRight: () => <ProfileButton />
})

export default HeaderRegistration;

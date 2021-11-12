import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MenuButton from '../menu.button';
import { APP_NAME } from '../../constants/common.constants';
import { APP_COLORS, APP_LINEAR_COLOR, APP_STYLE } from '../../../styles/app.style';
import { StackHeaderOptions } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import ProfileButton from '../profile.button';
import LogoutButton from '../logout.button';

const HeaderHome = ({ navigation }: any): StackHeaderOptions => ({
    headerTitle: '',
    headerTitleStyle: APP_STYLE.headerStyle,
    headerTintColor: "rgba(255,255,255,0.8)",
    headerBackground: () => (
        <LinearGradient
            colors={APP_LINEAR_COLOR.COLOR}
            start={APP_LINEAR_COLOR.START}
            end={APP_LINEAR_COLOR.END}
            style={{ flex: 1 }}
        />
    ),
    headerRightContainerStyle: {
        paddingRight: 10
    },
    // headerLeft: () => <MenuButton navigation={navigation} />,
    headerLeft: () => <ProfileButton navigation={navigation} />,
    headerRight: () => <LogoutButton navigation={navigation} />,
})

export default HeaderHome;

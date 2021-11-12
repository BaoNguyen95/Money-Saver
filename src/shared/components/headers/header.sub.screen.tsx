import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StackHeaderOptions } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { APP_COLORS, APP_STYLE } from '../../../styles/app.style';

const HeaderSubScreen = (headerTitle: string): StackHeaderOptions => {
    return (
        {
            headerTitle,
            headerTitleStyle: APP_STYLE.headerStyle,
            headerTintColor: "rgba(255,255,255,0.8)",
            // headerBackground: () => (
            //     <LinearGradient
            //         colors={[APP_COLORS.SUB_COLOR, APP_COLORS.MAIN_COLOR]}
            //         start={{ x: 0, y: 1 }}
            //         end={{ x: 1, y: 1 }}
            //         style={{ flex: 1 }}
            //     />
            // ),
            
        }
    )
}

export default HeaderSubScreen;

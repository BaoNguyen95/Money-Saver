import React from 'react';
import { StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import { APP_COLORS } from '../../styles/app.style';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MenuButton = ({ navigation }: any) => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => navigation.openDrawer()}>
            <Icon
                style={styles.icon}
                name={'menu'}
            ></Icon >
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 15,
    },
    icon: {
        fontSize: 32,
        color: APP_COLORS.SOLID_WHITE,
    }
})


export default MenuButton;
import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5";
import { APP_COLORS } from '../../styles/app.style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppState } from '../../core/reducers/rootReducer';
import { connect } from 'react-redux';
import NavigationService from '../../navigation/navigation.service';
import { AppStore } from '@moneysaver/core/store/configureStore';
import { LOGOUT } from '@moneysaver/core/actionTypes';
import { APP_TITLES } from '../constants/common.constants';
import { ROUTER } from '@moneysaver/navigation/navigation.constants';

interface IProps {
    navigation: NavigationService;
    username: string;
}

const LogoutButton = ({ navigation, username }: IProps) => {

    const onLogOut = () => {
        AppStore.dispatch({ type: LOGOUT });
        navigation.navigate(ROUTER.SCREEN.LOGIN);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onLogOut()} style={styles.iconContainer}>
                <Icon
                    style={styles.icon}
                    name={'sign-out-alt'}
                ></Icon >
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        username: state.user.displayName,
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        color: APP_COLORS.SOLID_WHITE,
        paddingRight: 10,
        fontSize: 14,
    },
    iconContainer: {
        paddingHorizontal: 10
    },
    icon: {
        fontSize: 24,
        color: APP_COLORS.SOLID_WHITE,
    }
})


export default connect(mapStateToProps, null)(LogoutButton);
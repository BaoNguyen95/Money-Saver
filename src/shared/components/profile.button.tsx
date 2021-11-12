import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import { APP_COLORS } from '../../styles/app.style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppState } from '../../core/reducers/rootReducer';
import { connect } from 'react-redux';
import { ROUTER } from '@moneysaver/navigation/navigation.constants';
import { NavigationScreenProp } from 'react-navigation';
import { IUser } from '../models/common.model';
import { Avatar } from 'react-native-ui-lib';
import { getAvatarName } from '../helper/helper';

interface IProps {
    navigation: NavigationScreenProp<null>;
    user: IUser;
}

const ProfileButton = ({ navigation, user }: IProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTER.SCREEN.USER_PROFILE, { title: ROUTER.SCREEN.USER_PROFILE })} style={styles.iconContainer}>
                <Avatar size={40} source={{ uri: user.image }} containerStyle={styles.avatar} />
            </TouchableOpacity>
            <Text style={styles.text}>{`${user.displayName}`}</Text>
        </View >
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user,
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
        fontSize: 32,
        color: APP_COLORS.SOLID_WHITE,
    },
    avatar: {

    }
})


export default connect(mapStateToProps, null)(ProfileButton);
import React, { Dispatch, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { AppState } from '@moneysaver/core/reducers/rootReducer';
import MyButton from '@moneysaver/shared/components/my.button';
import { MyTextInput } from '@moneysaver/shared/components/my.textInput';
import { APP_TITLES } from '@moneysaver/shared/constants/common.constants';
import { useMergeState } from '@moneysaver/shared/helper/helper';
import { IRole, IUser } from '@moneysaver/shared/models/common.model';
import { APP_COLORS, APP_LINEAR_COLOR, APP_STYLE } from '@moneysaver/styles/app.style';
import { getRolesRequest, getUserRequest, LoginRequest } from './login.actionCreators';
import { GetRolesAction, GetUserAction, LoginActions } from './login.actionTypes';
import { ILoginResponse } from './login.reducer';
import { AppDataAction, LOGOUT } from '@moneysaver/core/actionTypes';
import { getBillRequest, getSpendingTypeRequest } from '@moneysaver/core/actionCreators/data.actionCreators';
import { IOptions } from '@moneysaver/shared/components';
import { AppStore } from '@moneysaver/core/store/configureStore';
import { Card, MaskedInput } from 'react-native-ui-lib';
import LinearGradient from 'react-native-linear-gradient';
import MyDialog from '@moneysaver/shared/components/my.dialog';
import RegistrationScreen from '../registration/registration';
export interface ILoginState {
    username: string;
    password: string;
    rememberMe?: boolean;
    showDialog?: boolean;
}
interface ILoginProps {
    navigation: NavigationScreenProp<any, any>;
    userId?: string;
    roles?: IRole[];
    loginResponse: ILoginResponse;
    listSpendingType: IOptions[];
    listBill: IOptions[];
    user: IUser;
    onLogin: (data: ILoginState) => void;
    getRoles: () => void;
    getUser: (data: string) => void;
    getSpendingType: () => void;
    getBill: () => void;
}

const initState = {
    username: 'bao',
    password: '',
    showDialog: false,
};

const LoginScreen = (props: ILoginProps) => {
    const [state, setState] = useMergeState(initState);
    const { username, password, showDialog }: ILoginState = state;
    const {
        navigation, getUser, onLogin, user, getBill, getRoles, listBill,
        roles, loginResponse: { id, isLogin }, getSpendingType, listSpendingType
    } = props;
    useEffect(() => {
        initAppData();

        if (isLogin && user?.id && listSpendingType?.length && roles?.length && listBill?.length) {
            navigation.navigate(APP_TITLES.HOME);
        }

        if (isLogin && !user.id) {
            // bug call duplicate5
            getUser(id);
        }
    }, [user?.id, isLogin])

    const initAppData = () => {
        getRoles();
        getSpendingType();
        getSpendingType();
        getBill();
    }

    const listButton = [
        { title: 'Login', onPress: () => onClickLogin(), outline: false, },
        { title: 'Register', onPress: () => toggleShowDialog(true), outline: true, }
    ]

    const onChange = (value: string, name: string) => {
        setState({ [name]: value });
    };

    const onClickLogin = () => {
        AppStore.dispatch({ type: LOGOUT });
        onLogin({ username, password });
    }

    const toggleShowDialog = (value: boolean) => setState({ showDialog: value });

    return (
        <LinearGradient
            colors={APP_LINEAR_COLOR.COLOR}
            start={APP_LINEAR_COLOR.START}
            end={APP_LINEAR_COLOR.END}
            style={styles.container}
        >
            <Card style={styles.content}>
                <MyTextInput title="Username" value={username} onChange={(value) => onChange(value, 'username')} />
                <MyTextInput secureTextEntry title="Password" value={password} onChange={(value) => onChange(value, 'password')} />
                {listButton.map((s, i) => (
                    <View key={i} style={styles.button}>
                        <MyButton title={s.title} onPress={s.onPress} outline={s.outline} />
                    </View>
                ))}
            </Card>
            <MyDialog title="" visible={showDialog as boolean} onDismiss={() => toggleShowDialog(false)}  >
                <RegistrationScreen toggleDialog={toggleShowDialog} />
            </MyDialog>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
    },
    container: {
        justifyContent: 'center',
        backgroundColor: APP_COLORS.MAIN_COLOR,
        height: '100%',
    },
    content: {
        width: 250,
        height: 350,
        alignSelf: 'center',
        padding: 20,
    }
})

LoginScreen.navigationOptions = {
    headerShown: false,
}

const mapStateToProps = (state: AppState) => {
    return {
        ...state,
        user: state.user,
        roles: state.roles.roles,
        loginResponse: state.login,
        listSpendingType: state.appData?.listSpendingType as IOptions[],
        listBill: state.appData?.listBill as IOptions[],
    }
}

const mapDispatchToProps = (dispatch: Dispatch<LoginActions | GetRolesAction | GetUserAction | AppDataAction>) => {
    return {
        getRoles: () => dispatch(getRolesRequest()),
        onLogin: (data: ILoginState) => dispatch(LoginRequest(data)),
        getUser: (data: string) => dispatch(getUserRequest(data)),
        getSpendingType: () => dispatch(getSpendingTypeRequest()),
        getBill: () => dispatch(getBillRequest()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
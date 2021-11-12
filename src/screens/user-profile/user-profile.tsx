import { GetUserAction } from '@moneysaver/core/actionTypes';
import { AppState } from '@moneysaver/core/reducers/rootReducer';
import { IOptions, MyTextInput } from '@moneysaver/shared/components';
import HeaderSubScreen from '@moneysaver/shared/components/headers/header.sub.screen';
import MyButton from '@moneysaver/shared/components/my.button';
import { getAvatarName, handleShowMessage, useMergeState } from '@moneysaver/shared/helper/helper';
import { IUser } from '@moneysaver/shared/models/common.model';
import { updateUser, uploadUserProfile } from '@moneysaver/shared/services/user.service';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar, Card } from 'react-native-ui-lib';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { APP_COLORS, APP_LINEAR_COLOR, APP_STYLE } from '../../styles/app.style';
import { getUserRequest } from '../login/login.actionCreators';
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker';
interface IProps {
    navigation: NavigationScreenProp<IUserProfileState>;
    user: IUser;
    listRoles: IOptions[];
    getUser: (data: string) => void;
}
export interface IUserProfileState extends IUser {
    asset?: Asset;
    loading: boolean;
}

const initState: IUserProfileState = {
    username: '',
    displayName: '',
    roleId: '',
    loading: false,
}

const UserProfileScreen = (props: IProps) => {

    const { navigation, user, listRoles, getUser } = props;
    const [state, setState] = useMergeState(initState);
    const { username, displayName, roleId, createdAt, asset, loading }: IUserProfileState = state;

    useEffect(() => {
        setState(user);
        return (() => {
            setState(initState);
        });
    }, [user.displayName])

    const onChange = (value: string, key: string) => {
        setState({ [key]: value });
    }

    const userRole = listRoles.find(s => s.value === roleId)?.label;

    const updateProfile = () => {
        if (!loading) {
            setState({ loading: true })
            updateUser(state, (data => {
                if (data.success) {
                    getUser(user.id as string);
                }
                setState({ loading: false })
                handleShowMessage(data);
            }))
        }
    }

    const onPressAvatar = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, data => {
            if (data.assets?.length) {
                setState({ asset: data.assets[0] });
            }
        })
    }

    return (
        <LinearGradient
            colors={APP_LINEAR_COLOR.COLOR}
            start={APP_LINEAR_COLOR.START}
            end={APP_LINEAR_COLOR.END}
            style={styles.container}
        >
            <Card style={styles.content}>
                <Avatar
                    size={120}
                    source={{ uri: asset?.uri ? asset?.uri : user.image }}
                    containerStyle={styles.avatar}
                    onPress={onPressAvatar}
                />
                <View style={styles.information}>
                    <MyTextInput title={"Username"} disabled={true} editable={false} value={username} onChange={() => null} />
                    <MyTextInput title={"Display Name*"} value={displayName} onChange={(value) => onChange(value, "displayName")} />
                    <MyTextInput title={"User role"} disabled={true} editable={false} value={userRole} onChange={() => null} />
                    {/* <MyTextInput title={"Registered at"} disabled={true} editable={false} value={`${createdAt?.toDateString()} - ${createdAt?.toLocaleTimeString()}`} onChange={() => null} /> */}
                    <MyButton title={'Update'} onPress={updateProfile} loading={loading} />
                </View>
            </Card>
        </LinearGradient>
    )
}

UserProfileScreen.navigationOptions = ({ navigation }: any) => HeaderSubScreen(navigation.getParam('title'));

const styles = StyleSheet.create({
    container: {
        backgroundColor: APP_COLORS.MAIN_COLOR,
        height: '100%',
        padding: 20,
        paddingTop: 120,
    },
    content: {
        ...APP_STYLE.boxShadow,
        padding: 10,
    },
    information: {
        marginTop: 60,
        padding: 20,
    },
    avatar: {
        top: -60,
        position: 'absolute',
        zIndex: 9,
        alignSelf: 'center',
        borderColor: APP_COLORS.SOLID_WHITE,
        ...APP_STYLE.boxShadow,
    }
})

const mapStateToProps = (state: AppState) => ({
    user: state.user,
    listRoles: state.roles.roles?.map(s => ({ label: s.name, value: s.id })) as IOptions[],
})

const mapDispatchToProps = (dispatch: Dispatch<GetUserAction>) => ({
    getUser: (data: string) => dispatch(getUserRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
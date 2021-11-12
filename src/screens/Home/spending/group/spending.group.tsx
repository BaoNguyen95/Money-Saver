import { getListUserRequest } from '@moneysaver/core/actionCreators/data.actionCreators';
import { AppDataAction, DeletedGroup, SpendingMineActions } from '@moneysaver/core/actionTypes';
import { AppState } from '@moneysaver/core/reducers/rootReducer';
import { ROUTER } from '@moneysaver/navigation/navigation.constants';
import NavigationService from '@moneysaver/navigation/navigation.service';
import HeaderHome from '@moneysaver/shared/components/headers/header.home';
import MyButton from '@moneysaver/shared/components/my.button';
import MyDialog from '@moneysaver/shared/components/my.dialog';
import { MESSAGE_TYPE, MODE } from '@moneysaver/shared/constants/common.constants';
import { handleShowMessage, myMessage, useMergeState } from '@moneysaver/shared/helper/helper';
import { IResponse, IUser } from '@moneysaver/shared/models/common.model';
import { createSpendingGroup, getListGroup, updateSpendingGroup } from '@moneysaver/shared/services/spending.service';
import { APP_STYLE } from '@moneysaver/styles/app.style';
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { MessageType, showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import GroupDialog, { IGroupData } from '../../components/group.dialog';
import GroupList from '../../components/group.list';
import { onDeletedGroup } from '../mine/spending.mine.actionCreators';

interface IProps {
    navigation: NavigationService;
    listUser?: IUser[];
    getListUserData: () => void;
    setValueReload: (data: boolean) => void
    user: IUser;
}

interface IState {
    showDialog: boolean;
    dataEdit?: IGroupData;
    mode: string;
    listGroup: IGroupData[];
}

const initState: IState = {
    showDialog: false,
    mode: MODE.ADD,
    listGroup: [],
}

const SpendingGroupScreen = (props: IProps) => {
    const { navigation, getListUserData, listUser, setValueReload, user } = props;
    const [state, setState] = useMergeState(initState);
    let { showDialog, mode, dataEdit, listGroup }: IState = state;

    useEffect(() => {
        getListUserData();
        getListData();
    }, [listUser?.length]);

    const toggleShowDialog = (value: boolean) => {
        setState({ showDialog: value, mode: MODE.ADD })
    };

    const onClickSubmitDialog = async (data: IGroupData) => {
        switch (mode) {
            case MODE.ADD:
                const result: IResponse = await createSpendingGroup(data);
                if (result.success) {
                    toggleShowDialog(false);
                }
                handleShowMessage(result)
                break;
            case MODE.EDIT:
                updateSpendingGroup(data, response => {
                    if (response.success) {
                        toggleShowDialog(false);
                    }
                    handleShowMessage(response)
                });
                break;
        }
        getListData();
    }

    const getListData = (): void => {
        getListGroup((data) => setState({ listGroup: data }));
    };

    const onClickListItem = async (data: IGroupData, mode: string) => {
        switch (mode) {
            case MODE.EDIT:
                if (user.id === data.createdBy) {
                    setState({ dataEdit: data, showDialog: true, mode });
                } else {
                    myMessage("You don't have permission to edit this group !", MESSAGE_TYPE.INFO);
                }
                break;
            case MODE.VIEW:
                navigation.navigate(ROUTER.SCREEN.SPENDING_GROUP, {
                    group: data, onRefresh: () => {
                        getListData();
                        setValueReload(true);
                    }
                });
                break;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonAdd}>
                <MyButton style={styles.buttonStyle} title={''} iconName="add" onPress={() => toggleShowDialog(!showDialog)} />
            </View>
            <MyDialog visible={showDialog} title={''} onDismiss={() => toggleShowDialog(false)}  >
                <GroupDialog mode={mode} data={dataEdit} onSubmit={onClickSubmitDialog} onCancel={() => toggleShowDialog(false)} />
            </MyDialog>
            <GroupList onClickListItem={onClickListItem} data={listGroup} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...APP_STYLE.container,
    },
    buttonAdd: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    buttonStyle: {
        flex: 0,
        width: 40
    }
})

SpendingGroupScreen.navigationOptions = HeaderHome;

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppDataAction | DeletedGroup>) => {
    return {
        getListUserData: () => dispatch(getListUserRequest()),
        setValueReload: (data: boolean) => dispatch(onDeletedGroup(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpendingGroupScreen);
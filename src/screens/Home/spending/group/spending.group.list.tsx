import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '@moneysaver/core/reducers/rootReducer';
import MyButton from '@moneysaver/shared/components/my.button';
import MyDialog from '@moneysaver/shared/components/my.dialog';
import MyPicker from '@moneysaver/shared/components/my.picker';
import { MODE, MONTHS, SPENDING_TYPE, YEARS } from '@moneysaver/shared/constants/common.constants';
import { findUser, formatVND, useMergeState } from '@moneysaver/shared/helper/helper';
import { APP_COLORS, APP_LINEAR_COLOR, APP_STYLE } from '@moneysaver/styles/app.style';
import SpendingDialog, { ISpendingMoneyData } from '@moneysaver/screens/home/components/spending.dialog';
import SpendingList from '../../components/spending.list';
import { addNewSpending, deleteGroup, deleteSpendingMine, editSpendingMine, getSpendingGroup } from '@moneysaver/shared/services/spending.service';
import HeaderSubScreen from '@moneysaver/shared/components/headers/header.sub.screen';
import { IGroupData } from '../../components/group.dialog';
import LinearGradient from 'react-native-linear-gradient';
import * as _ from 'lodash';
import { IUser } from '@moneysaver/shared/models/common.model';
import { AppStore } from '@moneysaver/core/store/configureStore';
import { NavigationScreenProp } from 'react-navigation';
import { SpendingMineActions } from '@moneysaver/core/actionTypes';
import { addNewSpendingMoneyRequest, onDeletedGroup } from '../mine/spending.mine.actionCreators';
import { Avatar } from 'react-native-ui-lib';

interface IState {
    month: number;
    year: number;
    showDialog: boolean;
    dataEdit?: ISpendingMoneyData;
    mode: string;
    refreshing: boolean;
    listData: ISpendingMoneyData[];
    showDialogDetail: boolean;
}

interface IProps {
    navigation: NavigationScreenProp<IProps>;
    onCreateNew: (data: ISpendingMoneyData) => void;
    setValueReload: (data: boolean) => void;
    user: IUser;
}

const initialState: IState = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    showDialog: false,
    dataEdit: undefined,
    mode: MODE.ADD,
    refreshing: false,
    listData: [],
    showDialogDetail: false
}

const SpendingGroupScreen = (props: IProps) => {

    const [state, setState] = useMergeState(initialState)
    const { mode, month, year, showDialog, dataEdit, refreshing, listData }: IState = state;
    const { navigation, setValueReload, user } = props;
    const group: IGroupData = navigation?.getParam("group");

    useEffect(() => {
        getListData();
    }, [month])

    const listMonths = [{ value: 0, label: 'All' }, ...MONTHS];
    const listYears = [{ value: 0, label: 'All Items' }, ...YEARS.reverse()];

    const onChangePicker = (value: any, key: string) => {
        setState({ [key]: value });
        key === 'month' ? getListData(value, year) : getListData(month, value)
    };

    const toggleShowDialog = (value: boolean) => setState({ showDialog: value, mode: MODE.ADD });

    const onClickSubmitDialog = async (_data: ISpendingMoneyData) => {
        let result;
        let data: ISpendingMoneyData = { ..._data, group }
        switch (mode) {
            case MODE.ADD:
                result = await addNewSpending(data);
                break;
            case MODE.EDIT:
                result = await editSpendingMine(data);
                break;
        }
        if (result) {
            toggleShowDialog(false);
            getListData();
            setValueReload(true);
        }
    }

    const getListData = (_month = month, _year = year) => {
        getSpendingGroup(month, year, group, response => {
            if (response.listSpendingMoney) {
                setState({ listData: response.listSpendingMoney });
            }
        });
    }

    const onClickListItem = async (data: ISpendingMoneyData, mode: string) => {
        switch (mode) {
            case MODE.EDIT:
            case MODE.VIEW:
                setState({ dataEdit: data, showDialog: true, mode });
                break;
            case MODE.DELETE:
                const result = await deleteSpendingMine(data.id as string);
                result && getListData();
                setValueReload(true);
                break;
        }
    }

    const onRefresh = () => {
        // setState({ refreshing: true })
        // getListData(month)
    }

    const onDeleteGroup = async () => {
        await deleteGroup(group?.id as string, response => {
            if (response.success) {
                navigation.goBack();
                navigation?.getParam("onRefresh")();
                setValueReload(true);
            }
        });
    }

    const formatData = listData?.map(x => ({ ...x, amount: x.spendingType === SPENDING_TYPE.MONEY_IN ? x.amount : -x.amount }));
    const summary = formatData?.reduce((a, b) => (a + +b.amount), 0) || 0;

    return (
        <LinearGradient
            colors={APP_LINEAR_COLOR.COLOR}
            start={APP_LINEAR_COLOR.START}
            end={APP_LINEAR_COLOR.END}
            style={styles.container}
        >
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.summaryContent}>
                    <View style={styles.period}>
                        <MyPicker
                            style={styles.myPicker}
                            value={month}
                            options={listMonths}
                            onChange={(item) => onChangePicker(item, 'month')}
                            hideUnderline
                        />
                        <MyPicker
                            style={styles.myPicker}
                            value={year}
                            options={listYears}
                            onChange={(item) => onChangePicker(item, 'year')}
                            hideUnderline
                        />
                    </View>
                    <Text style={styles.summaryValue}>{formatVND(summary)}</Text>
                </View>
                {listData?.length && group?.id ? renderDetailContent(formatData, group.participant, summary) : null}
                <View style={styles.buttonContainer}>
                    <MyButton iconStyle={styles.addButton} outline={true} circle title={'Add'} iconName="add" onPress={() => toggleShowDialog(!showDialog)} />
                    {group?.id && group.createdBy === user.id && <MyButton iconStyle={styles.addButton} outline={true} circle title={'Delete'} iconName="delete" onPress={() => onDeleteGroup()} />}
                </View>
                <View style={styles.listSpending}>
                    <SpendingList data={listData} groupProps={group} onClickListItem={onClickListItem} />
                </View>
                <MyDialog visible={showDialog} title={''} onDismiss={() => toggleShowDialog(false)}  >
                    <SpendingDialog mode={mode} group={group} data={dataEdit} month={month} year={year} onSubmit={onClickSubmitDialog} onCancel={() => toggleShowDialog(false)} />
                </MyDialog>
            </ScrollView >
        </LinearGradient>
    )
}

const renderDetailContent = (data: ISpendingMoneyData[], participant: IUser[], summary: number) => {
    const currentUserId = AppStore.getState().user.id;
    const formatData = data.map(s => ({ ...s, displayName: findUser(s.createdBy, participant) }));
    const groupUsers = _.groupBy(formatData, "displayName");

    const listRender = participant.map(s => ({
        isOwner: s.id === currentUserId,
        displayName: s.displayName,
        count: groupUsers[s.displayName]?.reduce((a, b) => (a + +b.amount), 0) || 0,
        uri: s.image as string
    })).sort((a, b) => a.count - b.count);

    const renderListUser = () => {
        return listRender.map((s, i) => {
            const totalCount = formatVND((summary / participant.length) - s.count);
            return (
                <View key={i} style={styles.userContainer}>
                    {/* <Text style={styles.numberIndex}>{i + 1}</Text> */}
                    <Avatar size={35} source={{ uri: s.uri }} />
                    <Text style={{ ...styles.userText, ...(s.isOwner && styles.owner) }}>{s.displayName}</Text>
                    <Text style={styles.numberText}>{formatVND(s.count)}</Text>
                    <Text style={styles.numberText}>{totalCount}</Text>
                </View>
            )
        })
    }

    return (
        <View style={styles.detailContent}>
            {renderListUser()}
        </View>
    )
}

SpendingGroupScreen.navigationOptions = ({ navigation }: any) => HeaderSubScreen(`${navigation.getParam("group").title}`);

const styles = StyleSheet.create({
    container: {
        ...APP_STYLE.marginHeader,
    },
    period: {
        flexDirection: 'row',
    },
    myPicker: {
        alignSelf: 'center',
        fontSize: 28,
        color: APP_COLORS.SOLID_WHITE,
        backgroundColor: APP_COLORS.LIGHT_WHITE,
        paddingHorizontal: 15,
        borderRadius: 50,
    },
    addButton: {
        flex: 0,
        fontSize: 24
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    listSpending: {
        paddingTop: 25,
        backgroundColor: APP_COLORS.SOLID_WHITE,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        height: '100%',
    },
    summaryContent: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    summaryText: {
        color: APP_COLORS.SOLID_WHITE,
        fontSize: 24,
    },
    summaryValue: {
        color: APP_COLORS.SOLID_WHITE,
        fontSize: 32,
        marginBottom: 20,
    },
    detailContent: {
    },
    userContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 10,
        alignItems: 'center'
    },
    userText: {
        fontSize: 16,
        color: APP_COLORS.SOLID_WHITE,
        flex: 1,
        marginLeft: 10,
    },
    numberText: {
        fontSize: 16,
        color: APP_COLORS.SOLID_WHITE,
        flex: 1,
        textAlign: 'center'
    },
    owner: {
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    numberIndex: {
        fontSize: 16,
        color: APP_COLORS.SOLID_WHITE,
        backgroundColor: APP_COLORS.LIGHT_WHITE,
        paddingHorizontal: 7,
        paddingBottom: 1,
        borderRadius: 50,
        marginRight: 2,
        height: 23,
        alignSelf: 'center'
    }
})

const mapStateToProp = (state: AppState) => {
    return {
        listData: state.spendingMine?.listSpendingMoney,
        createdSuccess: state.spendingMine?.success,
        user: state.user,
    }
}

const mapDispatchToProp = (dispatch: Dispatch<SpendingMineActions>) => {
    return {
        onCreateNew: (data: ISpendingMoneyData) => dispatch(addNewSpendingMoneyRequest(data)),
        setValueReload: (data: boolean) => dispatch(onDeletedGroup(data)),
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(SpendingGroupScreen);
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '@moneysaver/core/reducers/rootReducer';
import MyButton from '@moneysaver/shared/components/my.button';
import MyDialog from '@moneysaver/shared/components/my.dialog';
import MyPicker from '@moneysaver/shared/components/my.picker';
import { MONTHS, MODE, SPENDING_TYPE, YEARS } from '@moneysaver/shared/constants/common.constants';
import { formatVND, useMergeState } from '@moneysaver/shared/helper/helper';
import { APP_COLORS, APP_LINEAR_COLOR } from '@moneysaver/styles/app.style';
import SpendingDialog, { ISpendingMoneyData } from '@moneysaver/screens/home/components/spending.dialog';
import { SpendingMineActions } from './spending.mine.actionTypes';
import { addNewSpendingMoneyRequest, onDeletedGroup } from './spending.mine.actionCreators';
import SpendingList from '../../components/spending.list';
import { addNewSpending, deleteSpendingMine, editSpendingMine, getMySpending } from '@moneysaver/shared/services/spending.service';
import LinearGradient from 'react-native-linear-gradient';
import * as _ from 'lodash';
import { NavigationScreenProp } from 'react-navigation';

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
    onReload?: boolean;
    setValueReload: (data: boolean) => void;
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

const SpendingMineScreen = (props: IProps) => {

    const [state, setState] = useMergeState(initialState)
    const { mode, month, year, showDialog, dataEdit, refreshing, listData }: IState = state;
    const { onReload, setValueReload } = props;

    const listMonths = [{ value: 0, label: '-' }, ...MONTHS];
    const listYears = [{ value: 0, label: 'All Items' }, ...YEARS.reverse()];

    useEffect(() => {
        onReload && getListData();
    }, [month, onReload])

    const onChangePicker = (value: any, key: string) => {
        setState({ [key]: value });
        key === 'month' ? getListData(value, year) : getListData(month, value)
    };

    const toggleShowDialog = (value: boolean) => setState({ showDialog: value, mode: MODE.ADD });

    const onClickSubmitDialog = async (data: ISpendingMoneyData) => {
        let result;
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
        }
    }

    const getListData = (_month = month, _year = year) => {
        getMySpending(_month, _year, response => {
            if (response.listSpendingMoney) {
                setState({ listData: response.listSpendingMoney });
                setValueReload(false);
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
                break;
        }
    }

    const onRefresh = () => {
        // setState({ refreshing: true })
        // getListData(month)
    }

    const formatData = listData?.map(x => ({ ...x, amount: x.spendingType === SPENDING_TYPE.MONEY_IN ? x.amount : -x.amount }));
    const summary = formatData?.reduce((a, b) => (a + +b.amount), 0) || 0;

    return (

        <LinearGradient
            colors={APP_LINEAR_COLOR.COLOR}
            start={APP_LINEAR_COLOR.START}
            end={APP_LINEAR_COLOR.END}
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
                <View style={styles.buttonContainer}>
                    <MyButton iconStyle={styles.addButton} outline={true} circle title={'Add'} iconName="add" onPress={() => toggleShowDialog(!showDialog)} />
                </View>
                <View style={styles.listSpending}>
                    <SpendingList data={listData} onClickListItem={onClickListItem} />
                </View>
                <MyDialog visible={showDialog} title={''} onDismiss={() => toggleShowDialog(false)}  >
                    <SpendingDialog mode={mode} data={dataEdit} month={month} year={year} onSubmit={onClickSubmitDialog} onCancel={() => toggleShowDialog(false)} />
                </MyDialog>
            </ScrollView >
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        // ...APP_STYLE.container,
        backgroundColor: APP_COLORS.MAIN_COLOR
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
    },
    userText: {
        fontSize: 16,
        color: APP_COLORS.SOLID_WHITE,
        flex: 1,
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
        onReload: state.spendingMine?.reload,
    }
}

const mapDispatchToProp = (dispatch: Dispatch<SpendingMineActions>) => {
    return {
        onCreateNew: (data: ISpendingMoneyData) => dispatch(addNewSpendingMoneyRequest(data)),
        setValueReload: (data: boolean) => dispatch(onDeletedGroup(data)),
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(SpendingMineScreen);
import { SpendingMineActions } from '@moneysaver/core/actionTypes';
import MyPicker from '@moneysaver/shared/components/my.picker';
import { MyTextInputMask } from '@moneysaver/shared/components/my.textInputMask';
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../../core/reducers/rootReducer';
import { IOptions, MyTextInput } from '../../../shared/components';
import MyButton from '../../../shared/components/my.button';
import MyRadioButton from '../../../shared/components/my.radio.button';
import { MODE, SPENDING_TYPE } from '../../../shared/constants/common.constants';
import { convertStringToNumber, formatVND, useMergeState } from '../../../shared/helper/helper';
import { APP_STYLE } from '../../../styles/app.style';
import { resetCreatedSuccess } from '../spending/mine/spending.mine.actionCreators';
import { IGroupData } from './group.dialog';

export interface ISpendingMoneyData {
    id?: string;
    billId: string;
    amount: number | string;
    month?: number;
    year?: number;
    spendingType: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
    description?: string;
    group?: IGroupData;
}

interface IProps {
    mode?: string;
    onSubmit: (data: ISpendingMoneyData) => void;
    onCancel: () => void;
    data?: ISpendingMoneyData;
    resetCreatedSuccess: () => void;
    month: number;
    year: number;
    listSpendingType: IOptions[];
    listBill: IOptions[];
    group: IGroupData;
}
interface IState extends ISpendingMoneyData {
    disabled: boolean;
}

const initState: IState = {
    billId: '',
    amount: 0,
    spendingType: SPENDING_TYPE.MONEY_OUT,
    createdBy: '',
    createdAt: new Date(),
    disabled: false,
}

const SpendingDialog = (props: IProps) => {
    let { mode, onSubmit, onCancel, data, resetCreatedSuccess,
        month, year, listSpendingType, group, listBill
    } = props;
    const [state, setState] = useMergeState(initState);
    const { billId, amount, spendingType, description, disabled }: IState = state;

    useEffect(() => {
        initData();
        return () => {
            resetCreatedSuccess();
            setState(initState);
        }
    }, []);

    const initData = () => {
        switch (mode) {
            case MODE.EDIT:
                setState(data);
                break;
            case MODE.VIEW:
                setState({ disabled: true, ...data })
                break;
            case MODE.ADD:
                break;
        }

    }

    const onClickSubmit = () => {
        if (billId && amount) {
            let _amount = amount;
            if (typeof amount === 'string') {
                _amount = convertStringToNumber(amount);
            }
            onSubmit({ ...state, amount: _amount, month, year });
        }
    }


    const onChangeInput = (key: string, value: any) => {
        setState({ [key]: value });
        if (key === 'spendingType') {
            setState({ billId: '' });
        }
    };


    const pickerOptions = listBill.filter(s => s.type === spendingType);

    if (group?.id) {
        listSpendingType = listSpendingType.map(s => ({ ...s, disabled: s.value === SPENDING_TYPE.MONEY_IN }))
    }

    return (
        <View style={APP_STYLE.cardContainer}>
            <MyRadioButton options={listSpendingType} value={spendingType} disabled={disabled} onValueChange={(value) => onChangeInput('spendingType', value)} />
            <MyPicker options={pickerOptions} placeholder="Bill" value={billId} onChange={value => onChangeInput('billId', value)} />
            <MyTextInputMask type={'money'} title={'10,000'} value={amount} editable={!disabled} keyboardType="numeric" onChange={(value) => onChangeInput('amount', value)} />
            <MyTextInput title={'Description'} value={description} editable={!disabled} multiline onChange={(value) => onChangeInput('description', value)} />
            {!disabled && <View style={APP_STYLE.actionsButton}>
                <MyButton style={{ flex: 1 }} title={'Submit'} position="flex-end" onPress={onClickSubmit} />
                <MyButton style={{ flex: 1 }} title={'Cancel'} position="flex-end" onPress={onCancel} outline={true} />
            </View>}
        </View>
    )
}

const mapStateToProp = (state: AppState) => {
    return {
        listBill: state.appData.listBill || [],
        listSpendingType: state.appData.listSpendingType || [],
    }
}

const mapDispatchToProp = (dispatch: Dispatch<SpendingMineActions>) => {
    return {
        resetCreatedSuccess: () => dispatch(resetCreatedSuccess())
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(SpendingDialog);
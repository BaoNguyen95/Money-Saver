import { SpendingMineActions } from '@moneysaver/core/actionTypes';
import { AppStore } from '@moneysaver/core/store/configureStore';
import MyPicker from '@moneysaver/shared/components/my.picker';
import { IUser } from '@moneysaver/shared/models/common.model';
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '@moneysaver/core/reducers/rootReducer';
import { IOptions, MyTextInput } from '@moneysaver/shared/components';
import MyButton from '@moneysaver/shared/components/my.button';
import { MODE } from '@moneysaver/shared/constants/common.constants';
import { useMergeState } from '@moneysaver/shared/helper/helper';
import { APP_STYLE } from '@moneysaver/styles/app.style';

export interface IGroupData {
    id?: string;
    title: string;
    description?: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
    participant: IUser[];
}

interface IProps {
    mode?: string;
    onSubmit: (data: IGroupData) => void;
    onCancel: () => void;
    data?: IGroupData;
    listUser?: IUser[];
    listParticipant: IOptions[];
}
interface IState extends IGroupData {
    disabled: boolean;
    _participant: string[];
}


const initState: IState = {
    title: '',
    participant: [],
    createdBy: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    disabled: false,
    _participant: [],
}

const GroupDialog = (props: IProps) => {
    const { mode, onSubmit, onCancel, data, listUser, listParticipant } = props;
    const [state, setState] = useMergeState(initState);
    let { disabled, title, description, _participant }: IState = state;
    const currentUSer = AppStore.getState().user;

    useEffect(() => {
        initData();
    }, []);

    const initData = () => {
        switch (mode) {
            case MODE.EDIT:
                setState({ ...data, _participant: data?.participant.map(s => s.id) });
                break;
            case MODE.VIEW:
                setState({ disabled: true, ...data })
                break;
            case MODE.ADD:
                break;
        }
    }

    const onClickSubmit = async () => {
        const participant = listUser?.filter(x => _participant.includes(x.id as string)) as IUser[];
        if (title && description) {
            delete state._participant;
            onSubmit({ ...state, participant, createdBy: currentUSer.id });
        }
    }

    const onChangeInput = (key: string, value: any) => {
        setState({ [key]: value });
    };

    return (
        <View style={APP_STYLE.cardContainer}>
            <MyPicker showSearch options={listParticipant} defaultValue={currentUSer.id} placeholder="Participant" mode="MULTI" value={_participant} onChange={(value) => onChangeInput('_participant', value)} />
            <MyTextInput title={'Title'} value={title} editable={!disabled} onChange={(value) => onChangeInput('title', value)} />
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
        listUser: state.appData.listUser,
        listParticipant: state.appData.listUser?.map(x => ({ value: x.id, label: x.displayName, disabled: state.user.id === x.id, image: x.image })) || [],
    }
}

const mapDispatchToProp = (dispatch: Dispatch<SpendingMineActions>) => {
    return {
    }
}

export default connect(mapStateToProp, null)(GroupDialog);
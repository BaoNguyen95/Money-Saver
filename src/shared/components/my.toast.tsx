import React from 'react'
import { Text, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Toast } from 'react-native-ui-lib';
import { AppStore } from '../../core/store/configureStore';
import { APP_COLORS } from '../../styles/app.style';
import { MESSAGE_TYPE } from '../constants/common.constants';

export interface IMyToast {
    message: string;
    autoDismiss?: number;
    action?: any;
    position?: 'top' | 'bottom';
    color?: string;
    onDismiss?: () => void;
    visible?: boolean;
    showDismiss?: boolean;
    messageType: 'Success' | 'Warning' | 'Error' | 'Info';
};

const MyToast = (props: IMyToast) => {
    const {
        message,
        position = 'bottom',
        color,
        onDismiss,
    } = props;

    const messageTypeColor = {
        [MESSAGE_TYPE.SUCCESS]: APP_COLORS.MAIN_COLOR,
        [MESSAGE_TYPE.INFO]: APP_COLORS.DARK_GREEN,
        [MESSAGE_TYPE.ERROR]: APP_COLORS.RED,
        [MESSAGE_TYPE.WARNING]: APP_COLORS.ORANGE,
    }

    return (
        <FlashMessage
            message={message}
            position={position}
            color={color}
        />
    )
}

export default MyToast;

export const showToast = (data: IMyToast) => {
    return {
        type: SHOW_TOAST,
        data,
    }
}
export const hideToast = () => {
    return {
        type: HIDE_TOAST
    }
}

const initState: IMyToast = {
    message: '',
    visible: false,
    messageType: 'Info',
};

export const ToastReducer = (state = initState, action: ToastActions): IMyToast => {
    switch (action.type) {
        case SHOW_TOAST:
            return { ...state, ...action.data };
        case HIDE_TOAST:
            return initState;
        default:
            return state;
    }
}

export const SHOW_TOAST = 'SHOW_TOAST';
export interface ShowToast {
    type: typeof SHOW_TOAST,
    data: IMyToast
}

export const HIDE_TOAST = 'HIDE_TOAST';
export interface HideToast {
    type: typeof HIDE_TOAST,
}

export type ToastActions = ShowToast | HideToast;
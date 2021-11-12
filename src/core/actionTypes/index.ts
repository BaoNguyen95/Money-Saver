export * from "@moneysaver/screens/registration/registration.actionTypes";
export * from "@moneysaver/screens/login/login.actionTypes";
export * from '@moneysaver/screens/home/spending/mine/spending.mine.actionTypes';
export * from './data.actionTypes';

export const RESET_REDUCER = 'RESET_REDUCER';
export const resetReducer = (): ResetReducer => {
    return {
        type: RESET_REDUCER,
    }
}

export interface ResetReducer {
    type: typeof RESET_REDUCER
}
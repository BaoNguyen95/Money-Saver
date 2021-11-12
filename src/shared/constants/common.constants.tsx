import { IOptions } from "../components/my.picker";
import { AppLanguage } from "./language.constants";

export const APP_NAME = 'Money Saver';

export const STRING_REPLACE = {
    REPLACE_0: '{0}',
    REPLACE_1: '{1}',
    REPLACE_2: '{2}',
}

export const MODE = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    VIEW: 'VIEW',
    DELETE: 'DELETE',
}

export const MESSAGE_TYPE = {
    SUCCESS: 'Success',
    WARNING: 'Warning',
    ERROR: 'Error',
    INFO: 'Info',
}

export const BASE64 = 'data:image/jpeg;base64,';

export const LOCAL_STORAGE = {
    USER_INFO: 'USER_INFO',
    REMEMBER_ME: 'REMEMBER_ME',
    REMEMBER_ME_VALUE: 'REMEMBER_ME_VALUE',
}

export const ROLE = {
    SUPER_ADMIN: '5def1540432ec62744ddee8a',
    CUSTOMER: '5def1596a307034ec0e93681',
    ADMINISTRATOR: '5def1b470d63811a60361b06',
    EDITOR: '5def1b7d0d63811a60361b07',
    SALES_MANAGER: '5def1db93dc16c2c2c3f1dc4',
}

export const ROLE_NAME = {
    SUPER_ADMIN: 'Super Administrator',
    CUSTOMER: 'Customer',
    ADMINISTRATOR: 'Administrator',
    EDITOR: 'Editor',
    SALES_MANAGER: 'Sales Manager',
}

export const SOCKET_EVENTS = {
    INIT_CONVERSATION: 'INIT_CONVERSATION',
    SEND_MESSAGE: 'SEND_MESSAGE',
    RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
    JOIN_CONVERSATION: 'JOIN_CONVERSATION',
    CONNECT_SERVER: 'CONNECT_SERVER',
}

export const DATABASE_STORE = {
    USERS: 'Users',
    ROLES: 'roles',
    SPENDING_PLAN_MINE: 'Spending',
    SPENDING_TYPE: 'SpendingType',
    BILL: 'bill',
    GROUP: 'Group',
    USER_PROFILE_IMAGE: `user-profile/${STRING_REPLACE.REPLACE_0}`,
}

export const APP_TITLES = {
    HOME: 'Home',
    ADMINISTRATION: 'Administration',
    REGISTRATION: 'Registration',
    LOGIN: 'Login',
    SPENDING: 'SpendingMine',
    GROUP: 'Group',
}

export const USER_ROLES = {
    USER: 'LjmZ5KWibOZUPEWct6Zz',
    ADMIN: 'VYi34aQw3DVtkiXkCDFP',
}

export const SPENDING_TYPE = {
    MONEY_IN: 'PMqFDMUsG9nE1RSXCvxe',
    MONEY_OUT: 'beU9r56My3LcgMjokkPY',
}

export const MONTHS: IOptions[] = AppLanguage.MONTHS.map((m, i) => ({ label: m[i + 1], value: i + 1 }));

const renderYear = (): IOptions[] => {
    let result: IOptions[] = [];
    let year = 2010;
    while (year <= new Date().getFullYear()) {
        result.push({ value: year, label: year + "" });
        year++;
    }
    return result;
}

export const YEARS: IOptions[] = renderYear();

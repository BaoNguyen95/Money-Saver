import Axios from "axios";
import { Observable, from } from "rxjs";
import { showMessage } from "react-native-flash-message";
import { MESSAGE_TYPE } from "../constants/common.constants";
// import AuthorizedService from "./authorized.service";

import FireStore from '@react-native-firebase/firestore';
import { IResponse } from "../models/common.model";

// const authorService = new AuthorizedService();

const setHeader = () => {
    const headers = {
        'ContentType': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        // 'Authorization': "Bearer " + authorService.getToken(),
    }
    return headers;
}

const extend = { timeout: 10000 };

const get = (url: string, config?: any): Observable<any> => {
    config = { ...config, extend };
    return from(Axios
        .create({ headers: setHeader() })
        .get(url, config).then(result => handleData(result))
        .catch(err => handleError(err)));
}

const post = (url: string, body: any, config?: any): Observable<any> => {
    config = { ...config, extend };
    return from(Axios.create({ headers: setHeader() })
        .post(url, body, config).then(result => handleData(result))
        .catch(err => handleError(err)));
}


const handleData = ({ data }: any) => {
    if (data.message) {
        showMessage({
            message: MESSAGE_TYPE.ERROR,
            description: data.message,
            type: 'danger'
        })
        return null;
    }
    return data;
}

const handleError = (err: IResponse) => {
    showMessage({
        message: MESSAGE_TYPE.ERROR,
        description: err.message,
        type: 'danger'
    })
    return null;
}

const firestore = (path: string) => FireStore().collection(path);

export { get, post, firestore, handleError };

import { get, post } from './app.service';
import { CATEGORY_API } from '../constants/api.constants';
import { billStore, spendingTypeStore, userStore } from '../firebase/store';
import { IGetAppDataResponse } from '@moneysaver/core/reducers/data.reducer';
import { IOptions } from '../components';
import { AppLanguage } from '../constants/language.constants';
import { IResponse, IUser } from '../models/common.model';
import { APP_COLORS } from '@moneysaver/styles/app.style';

export default class CommonService {
    getCategories = () => {
        return get(CATEGORY_API.GET_ALL);
    }
}

export const getColor = (flag: boolean, color1 = APP_COLORS.MAIN_COLOR, color2 = APP_COLORS.RED) => flag ? color1 : color2;

export const getSpendingType = async (): Promise<IGetAppDataResponse> => {
    const data = await spendingTypeStore.get();
    if (data.empty) {
        return { message: AppLanguage.DATA_NOT_FOUND };
    }
    const result = data.docs.map(x => ({ ...x.data() })) as IOptions[];

    return { listSpendingType: result };
}

export const getBill = async (): Promise<IGetAppDataResponse> => {
    const data = await billStore.orderBy("label", "asc").get();
    if (data.empty) {
        return { message: AppLanguage.DATA_NOT_FOUND };
    }
    const result = data.docs.map(x => ({ ...x.data() })) as IOptions[];

    return { listBill: result };
}


export const getListUser = async (): Promise<IUser[] | IResponse> => {
    const data = await userStore.orderBy("displayName", "asc").get();
    if (data.empty) {
        return { message: AppLanguage.DATA_NOT_FOUND };
    }
    const result: IUser[] = data.docs.map(x => {
        const user = { id: x.id, ...x.data() } as IUser;
        delete user.password;
        delete user.createdAt;
        return user;
    });
    return result;
}

import { AppStore } from '../../core/store/configureStore';
import { IRegistrationState } from '../../screens/registration/registration';
import { IAddUserResponse } from '../../screens/registration/registration.reducer';
import { USER_ROLES } from '../constants/common.constants';
import { AppLanguage } from '../constants/language.constants';
import { userStore } from '../firebase/store';
import { IUser } from '../models/common.model';
import { getUserImage, USER_IMAGE_DEFAULT } from './user.service';

export const createUser = async (body: IRegistrationState): Promise<IAddUserResponse> => {
    const roles = AppStore.getState().roles.roles;
    const doc = await userStore.where('username', '==', body.username).get();
    if (doc.empty) {
        const data: IUser = {
            ...body,
            createdAt: new Date(),
            roleId: roles.find(s => s.id === USER_ROLES.USER)?.id || '',
            image: await getUserImage(USER_IMAGE_DEFAULT),
        };
        const user = await userStore.add(data);
        return { id: user.id };
    } else {
        return { id: '', message: AppLanguage.REGISTRATION.USER_EXISTED }
    }
};

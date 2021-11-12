import { IGetRoleResponse, IGetUserResponse } from "@moneysaver/screens/login/login.reducer";
import { IUserProfileState } from "@moneysaver/screens/user-profile/user-profile";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Asset } from "react-native-image-picker";
import { roleStore, userProfileStore, userStore } from "../firebase/store";
import { getPlatformPath } from "../helper/helper";
import { IResponse, IUser } from "../models/common.model";

export const USER_IMAGE_DEFAULT = 'user-default.png';

export const getRoles = async (): Promise<IGetRoleResponse> => {
    const data: FirebaseFirestoreTypes.QuerySnapshot = await roleStore.get();

    if (!data.empty) {
        const result = data.docs.map(s => ({ id: s.id, name: s.data().name, actions: s.data().actions }));
        return { roles: result };
    }
    return { message: 'error', roles: [] };
}

export const getUser = async (id: string): Promise<IGetUserResponse> => {
    const data: FirebaseFirestoreTypes.DocumentData = await userStore.doc(id).get();
    if (!data.exists) {
        throw Error('User not exists');
    }
    const doc = data.data();
    let image = doc.image;
    if (!doc.image) {
        image = await getUserImage(USER_IMAGE_DEFAULT);
    }
    return {
        username: doc.username,
        id: data.id,
        roleId: doc.roleId,
        createdAt: doc.createdAt.toDate(),
        displayName: doc.displayName,
        image
    };
}

export const updateUser = async (data: IUserProfileState, callback: (response: IResponse) => void) => {
    let result: IResponse;
    if (data.asset) {
        uploadUserProfile(data.asset as Asset, async response => {
            if (response.success) {
                result = await _updateUser(data, response.downloadURL);
            } else {
                result = { success: response.success, message: response.message }
            }
            return callback(result);
        });
    } else {
        result = await _updateUser(data);
        return callback(result);
    }
}

const _updateUser = async (data: IUserProfileState, downloadURL = "") => {
    const doc = await userStore.doc(data.id).update({ displayName: data.displayName, image: downloadURL ? downloadURL : data.image });
    return { success: doc === null, message: doc === null ? 'User update successfully !' : 'User update failure !' };
}

export const uploadUserProfile = async (data: Asset, callback: (response: IResponse) => void) => {
    const fileUploader = await userProfileStore(data.fileName as string);
    await fileUploader.putFile(data.uri as string)
        .then(async () => callback({ success: true, message: 'Upload image success', downloadURL: await fileUploader.getDownloadURL() }))
        .catch(() => callback({ success: false, message: 'Upload image failure' }))
}

export const getUserImage = async (fileName: string) => {
    const fileUploader = await userProfileStore(fileName);
    return await fileUploader.getDownloadURL();
}


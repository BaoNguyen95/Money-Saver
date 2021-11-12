import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { userStore } from "../firebase/store";
import { ILoginState } from "../../screens/login/login";
import { ILoginResponse } from "../../screens/login/login.reducer";

export const login = async (body: ILoginState): Promise<ILoginResponse> => {
    const data: FirebaseFirestoreTypes.QuerySnapshot = await userStore.where('username', '==', body.username).where('password', '==', body.password).get();
    if (data.empty) {
        return {
            isLogin: false,
            id: '',
            message: 'Wrong username or password'
        }
    }
    return { isLogin: true, id: data.docs[0].id };;
}
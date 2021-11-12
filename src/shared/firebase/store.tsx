import { DATABASE_STORE, STRING_REPLACE } from "../constants/common.constants";
import { firestore } from "../services/app.service";
import storage from "@react-native-firebase/storage";

export const userStore = firestore(DATABASE_STORE.USERS);
export const roleStore = firestore(DATABASE_STORE.ROLES);
export const spendingStore = firestore(DATABASE_STORE.SPENDING_PLAN_MINE);
export const spendingTypeStore = firestore(DATABASE_STORE.SPENDING_TYPE);
export const billStore = firestore(DATABASE_STORE.BILL);
export const groupStore = firestore(DATABASE_STORE.GROUP);
export const userProfileStore = async (fileName: string) => await storage().ref(DATABASE_STORE.USER_PROFILE_IMAGE.replace(STRING_REPLACE.REPLACE_0, fileName));
import { IGroupData } from "@moneysaver/screens/home/components/group.dialog";
import { ISpendingMineResponse } from "@moneysaver/screens/home/spending/mine/spending.mine.reducer";
import { firebase } from "@react-native-firebase/storage";
import { AppStore } from "../../core/store/configureStore";
import { ISpendingMoneyData } from "../../screens/home/components/spending.dialog";
import { AppLanguage } from "../constants/language.constants";
import { groupStore, spendingStore } from "../firebase/store";
import { getUniqueListBy } from "../helper/helper";
import { IResponse, IUser } from "../models/common.model";
import { handleError } from "./app.service";


export const addNewSpending = async (data: ISpendingMoneyData): Promise<ISpendingMineResponse> => {
    const user: IUser = AppStore.getState().user;
    const result = await spendingStore.add({ ...data, createdBy: user.id });
    return { success: result?.id ? true : false };
}

export const getMySpending = async (month: number, year: number, callback: (response: ISpendingMineResponse) => void) => {
    const user = AppStore.getState().user;
    const store = spendingStore.orderBy("createdAt", "asc").where('createdBy', '==', user.id).where('year', '==', year);
    const _result = month === 0 ? store : store.where('month', '==', month);
    const result = await _result.get();
    return callback({
        listSpendingMoney: result.docs.map(s => ({
            ...s.data(),
            id: s.id,
            createdAt: s.data().createdAt.toDate(),
            updatedAt: s.data().updatedAt?.toDate(),
        }) as ISpendingMoneyData)
    });
}

export const getSpendingGroup = async (month: number, year: number, group: IGroupData, callback: (response: ISpendingMineResponse) => void) => {
    const store = spendingStore.where('group.id', '==', group.id).where('year', '==', year).orderBy("createdAt", "asc");
    const result = month === 0 ? await store.get() : await store.where('month', '==', month).get();
    return callback({
        listSpendingMoney: result.docs.map(s => ({
            ...s.data(),
            id: s.id,
            createdAt: s.data().createdAt.toDate(),
            updatedAt: s.data().updatedAt?.toDate(),
        }) as ISpendingMoneyData)
    });
}


export const editSpendingMine = async (data: ISpendingMoneyData): Promise<boolean> => {
    const result = await spendingStore.doc(data.id).update({ ...data, updatedAt: new Date() })
        .catch(err => handleError({ message: err.message }));
    if (data.group) {
        await groupStore.doc(data.group.id).update({ updatedAt: new Date() });
    }
    return result === null;
}

export const deleteSpendingMine = async (id: string): Promise<boolean> => {
    const result = await spendingStore.doc(id).delete()
        .catch(err => handleError({ message: err.message }));
    return result === null;
}

export const createSpendingGroup = async (data: IGroupData): Promise<IResponse> => {
    const result = await groupStore.add(data);
    return {
        success: result.id ? true : false,
        message: result.id ? 'Create group successfully' : AppLanguage.MESSAGE_RESPONSE_ERROR,
    };
}

export const updateSpendingGroup = async (data: IGroupData, callback: (response: IResponse) => void) => {
    const listParticipantId = data.participant.map(s => s.id);
    const editGroup = await groupStore.doc(data.id).update({ ...data, updatedAt: new Date() });
    const group = await spendingStore.where("group.id", "==", data.id).get();
    const deleteItem = group.docs.filter(s => !listParticipantId.includes(s.data().createdBy));
    if (deleteItem.length) {
        deleteItem.forEach(async s => await s.ref.delete());
    }
    return callback({
        success: editGroup === null,
        message: editGroup === null ? 'Update group successfully' : AppLanguage.MESSAGE_RESPONSE_ERROR,
    });
}

export const getListGroup = async (callback: (data: IGroupData[]) => void) => {
    const user = AppStore.getState().user;
    delete user.password;
    delete user.createdAt;

    const docs = await groupStore
        .where('createdBy', '==', user.id)
        .orderBy('createdAt', 'desc')
        .get();
    const relativeDoc = await groupStore
        .where('participant', "array-contains", user)
        .orderBy('createdAt', 'desc')
        .get();

    const filteredArray = getUniqueListBy([...docs?.docs, ...relativeDoc?.docs], "id");
    const result = filteredArray.map(s => ({
        ...s.data(),
        id: s.id,
        createdAt: s.data().createdAt.toDate(),
        updatedAt: s.data().updatedAt?.toDate(),
    })) as IGroupData[];
    return callback(result);
}

export const deleteGroup = async (groupId: string, callback: (data: IResponse) => void) => {
    const deleteGroup = await groupStore.doc(groupId).delete()
        .catch(err => handleError({ message: err.message }));
    const spendingGroupData = await spendingStore.where('group.id', '==', groupId).get();
    spendingGroupData.forEach(async s => await s.ref.delete());
    const spendingGroupDataAfterDeleted = await spendingStore.where('group.id', '==', groupId).get();
    return callback({ success: deleteGroup === null && spendingGroupDataAfterDeleted.empty });
}

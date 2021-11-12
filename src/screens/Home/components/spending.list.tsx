import { AppState } from '@moneysaver/core/reducers/rootReducer';
import { AppStore } from '@moneysaver/core/store/configureStore';
import { IOptions } from '@moneysaver/shared/components';
import MyButton from '@moneysaver/shared/components/my.button';
import { MODE, SPENDING_TYPE } from '@moneysaver/shared/constants/common.constants';
import { findUser, formatVND, notFoundContent } from '@moneysaver/shared/helper/helper';
import { IUser } from '@moneysaver/shared/models/common.model';
import { getColor } from '@moneysaver/shared/services/common.service';
import { APP_COLORS, APP_STYLE } from '@moneysaver/styles/app.style';
import React from 'react'
import { StyleSheet, Text, TextStyle, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Avatar, View } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import { IGroupData } from './group.dialog';
import { ISpendingMoneyData } from './spending.dialog';

interface IProps {
    data?: ISpendingMoneyData[];
    onClickListItem: (item: ISpendingMoneyData | undefined, mode: string) => void;
    listBill: IOptions[];
    groupProps?: IGroupData;
}

const SpendingList = (props: IProps) => {
    const { data, onClickListItem, listBill, groupProps } = props;
    const formatData = data?.map(x => ({ ...x, amount: x.spendingType === SPENDING_TYPE.MONEY_IN ? x.amount : -x.amount }));
    const currentUser = AppStore.getState().user;

    const onClickItem = (id: string, mode: string) => {
        const item = data?.find(x => x.id === id);
        onClickListItem(item, mode);
    }


    const ownerStyle = (isOwner: boolean): TextStyle => {
        if (isOwner) {
            return {
                fontWeight: 'bold',
            }
        } return {};
    }

    const renderListItem = () => {
        return formatData?.map(item => {

            const { id, billId, amount, spendingType, description = '', createdBy, group, createdAt, updatedAt } = item;

            const isGroup = groupProps?.id;

            const isOwner = currentUser.id === createdBy;

            const buttonStyle = { width: 70 };

            const _description = description?.length > 20 ? `${description?.slice(0, 35)}...` : description;

            const _billName = listBill.find(x => x.value === billId)?.label;

            const groupName = groupProps?.id ? undefined : group?.id ? group?.title : undefined;

            const disableButton = groupProps?.id ? !isOwner : group?.id !== undefined;

            const avatar = groupProps?.participant.find(s => s.id === createdBy);

            return (
                <ListItem.Swipeable
                    key={id}
                    rightContent={
                        <View style={styles.buttonSwipe}>
                            <MyButton disabled={disableButton} color={APP_COLORS.RED} outline={true} size="medium" title="Delete" onPress={() => onClickItem(id as string, MODE.DELETE)} />
                        </View>
                    }
                >
                    <TouchableOpacity style={styles.listItem} onPress={() => isOwner ? onClickItem(id as string, MODE.EDIT) : null} >
                        <View style={styles.rightContent}>
                            {avatar && <Avatar imageStyle={{ borderRadius: 3 }} containerStyle={{ marginRight: 10 }} size={35} source={{ uri: avatar.image }} />}
                            <View>
                                {groupName && <Text style={styles.groupName} >{groupName}</Text>}
                                <View style={styles.descriptionContent}>
                                    <Text style={APP_STYLE.titleComponent}>{_billName}</Text>
                                    {_description?.length > 0 && <Text style={styles.description}>{` - ${_description}`}</Text>}
                                </View>
                                {isGroup && <Text style={{ ...styles.createdBy, ...ownerStyle(isOwner) }}>{avatar?.displayName}</Text>}
                            </View>
                        </View>
                        <View style={styles.leftContent}>
                            <Text style={styles.createAt}>{`${createdAt.toLocaleString()}`}</Text>
                            <Text style={{ ...styles.amount, color: getColor(spendingType === SPENDING_TYPE.MONEY_IN) }}>{formatVND(amount as number)}</Text>
                            {updatedAt && <Text style={styles.updatedAt}>{`Last update at ${updatedAt?.toLocaleString()}`}</Text>}
                        </View>
                    </TouchableOpacity>
                </ListItem.Swipeable>
            )
        })
    }

    return (
        <View style={styles.container}>
            {formatData?.length ? renderListItem() : notFoundContent()}
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {

    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    leftContent: {
        alignItems: 'flex-end',
        flex: 1,
    },
    buttonSwipe: {
        alignItems: 'center',
    },
    groupName: {
        color: APP_COLORS.SOLID_WHITE,
        borderRadius: 50,
        borderColor: APP_COLORS.GRAY,
        borderWidth: 1.5,
        paddingHorizontal: 6,
        paddingTop: 1.5,
        fontSize: 8,
        backgroundColor: APP_COLORS.GRAY,
        alignSelf: 'flex-start'
    },
    listItem: {
        backgroundColor: APP_COLORS.SOLID_WHITE,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    amount: {
        fontWeight: 'bold',
    },
    createdByContent: {
        width: '100%',
        alignItems: 'flex-end',
    },
    createdBy: {
        fontSize: 10,
        color: APP_COLORS.ORANGE,
        fontStyle: 'italic',
    },
    descriptionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    createAt: {
        fontSize: 12,
        color: APP_COLORS.GRAY,
        fontStyle: 'italic',
    },
    description: {
        color: APP_COLORS.GRAY,
        fontStyle: 'italic',
        fontSize: 12
    },
    updatedAt: {
        color: APP_COLORS.GRAY,
        fontSize: 10,
        textAlign: 'right'
    }
});

const mapStateToProp = (state: AppState) => {
    return {
        listSpendingType: state.appData.listSpendingType,
        listBill: state.appData.listBill,
    }
}

export const SpendingListStyle = styles;

export default connect(mapStateToProp, null)(SpendingList)
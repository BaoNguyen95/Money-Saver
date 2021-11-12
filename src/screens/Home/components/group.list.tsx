import { AppState } from '@moneysaver/core/reducers/rootReducer';
import { AppStore } from '@moneysaver/core/store/configureStore';
import StackedAvatar from '@moneysaver/shared/components/my.stacked.avatar';
import { MODE } from '@moneysaver/shared/constants/common.constants';
import { findUser, notFoundContent } from '@moneysaver/shared/helper/helper';
import { IUser } from '@moneysaver/shared/models/common.model';
import { APP_COLORS, APP_STYLE } from '@moneysaver/styles/app.style';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Avatar } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import { IGroupData } from './group.dialog'
import { SpendingListStyle, styles as SpendingListStyles } from './spending.list';

interface IProps {
    data: IGroupData[];
    onClickListItem: (item: IGroupData, mode: string) => void;
    listUser: IUser[];
}

const GroupList = (props: IProps) => {
    const { data, onClickListItem, listUser } = props;

    const onClickItem = (id: string, mode: string) => {
        const item = data?.find(x => x.id === id) as IGroupData;
        onClickListItem(item, mode);
    }

    const currentUser = AppStore.getState().user;

    const renderListItem = (item: IGroupData) => {
        const { id, title, description, participant, createdBy, createdAt, updatedAt } = item;
        const avatars = participant.map(s => ({ uri: s.image }));
        return (
            <TouchableOpacity
                key={id}
                style={styles.listItem}
                onPress={() => onClickItem(id as string, MODE.VIEW)}
                onLongPress={() => onClickItem(id as string, MODE.EDIT)}
            >
                <View style={styles.information}>
                    < View style={styles.createdContent}>
                        <View style={styles.owner}>
                            <Text style={styles.createAt}>{`${createdAt.toLocaleString()}, `}</Text>
                            <Text style={styles.createdBy}>{`${findUser(createdBy, listUser)}`}</Text>
                        </View>
                        <View style={styles.avatarContainer}>
                            <StackedAvatar maxAvatars={3} round={true} size={25} avatars={avatars} />
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={APP_STYLE.titleComponent}>{title}</Text>
                        <Text style={styles.description}>{` - ${description}`}</Text>
                    </View>
                    {updatedAt && <Text style={styles.updatedAt}>{`Last update at ${updatedAt?.toLocaleString()}`}</Text>}
                </View>
            </TouchableOpacity>
        )
    }

    const renderListContent = () => {
        if (data?.length) {
            return (
                <View>
                    {data.map(x => renderListItem(x))}
                </View>
            )
        } else {
            return notFoundContent();
        }
    }

    return (
        <View style={styles.container}>
            {renderListContent()}
        </View>
    )
}

const mapStateToProps = (state: AppState) => ({
    listUser: state.appData.listUser,
})

export default connect(mapStateToProps, null)(GroupList);

const styles = StyleSheet.create({
    ...SpendingListStyles,
    listItem: {
        backgroundColor: APP_COLORS.SOLID_WHITE,
        marginBottom: 5,
    },
    createdBy: {
        fontSize: 12,
        color: APP_COLORS.ORANGE,
        fontStyle: 'italic',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    owner: {
        flexDirection: 'row'
    },
    information: {
        padding: 10,
    },
    participant: {
        fontSize: 12,
        color: APP_COLORS.GRAY
    },
    avatarContainer: {
        justifyContent: 'flex-end',
    },
    createdContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    description: {
        color: APP_COLORS.GRAY,
        fontStyle: 'italic',
        fontSize: 12,
    },
    updatedAt: {
        color: APP_COLORS.GRAY,
        fontSize: 10,
        textAlign: 'right'
    }
});
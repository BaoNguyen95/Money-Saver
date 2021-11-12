import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '@moneysaver/core/reducers/rootReducer';
import NavigationService from '@moneysaver/navigation/navigation.service';
import HeaderHome from '@moneysaver/shared/components/headers/header.home';
import { useMergeState } from '@moneysaver/shared/helper/helper';
import { APP_LINEAR_COLOR, APP_STYLE } from '@moneysaver/styles/app.style';
import SpendingMineScreen from './spending/mine/spending.mine';
import MyButton from '@moneysaver/shared/components/my.button';
import LinearGradient from 'react-native-linear-gradient';
interface IState {
}

interface IProps {
    navigation: NavigationService;
}

const initialState: IState = {
}

const HomeScreen = (props: IProps) => {

    const [state, setState] = useMergeState(initialState)

    const { navigation } = props;

    useEffect(() => {

    }, [])

    return (
        <View style={styles.container}>
            {/* <View
                style={styles.switchButtonContainer}
            >
                <TouchableOpacity style={styles.button}><Text>My Plan</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text>My Group</Text></TouchableOpacity>
            </View> */}
            <SpendingMineScreen navigation={navigation} />
        </View >
    )
}

HomeScreen.navigationOptions = HeaderHome

const styles = StyleSheet.create({
    container: {
        // ...APP_STYLE.container
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        ...APP_STYLE.titleComponent,
        alignSelf: 'center',
        width: 80,
    },
    addSpendingMoneyButton: {
        maxWidth: 100
    },
    switchButtonContainer: {

    },
    button: {

    }
})

const mapStateToProp = (state: AppState) => {
    return {
    }
}

const mapDispatchToProp = (dispatch: Dispatch) => {
    return {
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(HomeScreen);
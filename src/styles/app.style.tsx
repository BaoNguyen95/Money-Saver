import { StyleSheet, Dimensions } from "react-native"

export const APP_COLORS = {
    GREEN: '#00a19c',
    DARK: '#00817d',
    DARK_GREEN: '#395542',
    RED: '#f50057',
    ORANGE: '#FF851B',
    LIGHT_ORANGE: '#ffc18c',
    PURPLE: '#58478d',
    DARK_PURPLE: '#432c5f',
    VIOLET: '#615e9b',
    LIGHT_GRAY: '#cccccc',
    WHITE_SMOKE: '#f2f2f2',
    SOLID_WHITE: '#ffffff',
    LIGHT_WHITE: 'rgba(255, 255, 255, 0.2)',
    MAIN_COLOR: 'rgb(37, 165, 51)',
    SUB_COLOR: '#00a19c',
    BLUE: '#0074D9',
    GRAY: '#36454f',
    BLACK: '#000000',
}
export const APP_LINEAR_COLOR = {
    COLOR: [APP_COLORS.SUB_COLOR, APP_COLORS.MAIN_COLOR],
    START: { x: 0, y: 0 },
    END: { x: 1, y: 1 },
}

export const APP_STYLE = StyleSheet.create({
    marginHeader: {
        paddingTop: 50,
    },
    container: {
        backgroundColor: APP_COLORS.WHITE_SMOKE,
        height: '100%',
        display: 'flex',
        padding: 10
    },
    cardContainer: {
        backgroundColor: APP_COLORS.SOLID_WHITE,
        padding: 20,
    },
    actionsButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    appLinear: {
        backgroundColor: `linear-gradient(to right, ${APP_COLORS.SUB_COLOR} , ${APP_COLORS.MAIN_COLOR})`
    },
    // BOX_SHADOW: '0 2px 4px 0 rgba(0, 0, 0, 0.4)',
    headerStyle: {
        textAlign: "left",
        fontSize: 18
    },
    titleComponent: {
        fontSize: 16,
        color: APP_COLORS.MAIN_COLOR,
        fontWeight: 'bold',
    },
    subTitleComponent: {
        fontSize: 16,
        fontWeight: 'bold',
        color: APP_COLORS.MAIN_COLOR,
        paddingVertical: 1,
        paddingHorizontal: 8,
        backgroundColor: 'rgba(41, 46, 73, 0.1)',
        borderRadius: 16,
    },
    boxShadow: {
        elevation: 5,
        shadowColor: '#ccc',
        shadowOffset: { width: 1, height: -1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    appPadding: {
        padding: 10,
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
})

export const DIMENSIONS = Dimensions.get('window');


import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Dialog, PanningDirections, PanningProvider } from 'react-native-ui-lib';
import { APP_COLORS, APP_STYLE } from '../../styles/app.style';

interface IProps {
    visible: boolean
    width?: number
    onDismiss?: () => void;
    onDialogDismissed?: () => void;
    ignoreBackgroundPress?: boolean;
    overlayBackgroundColor?: string;
    panDirection?: PanningDirections;
    useSafeArea?: boolean;
    title?: string;
    children?: any;
    height?: number
}

const MyDialog = (props: IProps) => {

    const {
        visible,
        width,
        onDismiss,
        onDialogDismissed,
        ignoreBackgroundPress,
        overlayBackgroundColor,
        panDirection = PanningProvider.Directions.DOWN,
        useSafeArea,
        title,
        children,
        height
    } = props;

    return (
        <Dialog
            visible={visible}
            width={width}
            onDismiss={onDismiss}
            onDialogDismissed={onDialogDismissed ? onDialogDismissed : onDismiss}
            ignoreBackgroundPress={ignoreBackgroundPress}
            overlayBackgroundColor={overlayBackgroundColor}
            panDirection={panDirection}
            useSafeArea={useSafeArea}
            height={height}
        >
            <Card style={APP_STYLE.cardContainer}>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>{title}</Text>
                </View>
                <View style={styles.content}>
                    {children}
                </View>
            </Card>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    title: {

    },
    textTitle: {
        ...APP_STYLE.titleComponent
    },
    content: {
        borderTopColor: APP_COLORS.MAIN_COLOR,
        borderTopStartRadius: 2
    }
});

export default MyDialog;
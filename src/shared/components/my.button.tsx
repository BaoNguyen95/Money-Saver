import React from 'react'
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'
import { View } from 'react-native-ui-lib';
import { APP_COLORS } from '../../styles/app.style';
import { Button, } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface IMyButton {
    title: string;
    color?: string;
    backgroundColor?: string;
    onPress: () => void;
    outline?: boolean;
    size?: 'small' | 'medium' | 'large' | 'xSmall';
    disabled?: boolean;
    position?: 'flex-end' | 'flex-start' | 'center';
    style?: ViewStyle;
    iconName?: string;
    containerStyle?: ViewStyle,
    iconStyle?: ViewStyle,
    circle?: boolean,
    loading?: boolean,
}

const MyButton = (props: IMyButton) => {
    const {
        title,
        color,
        backgroundColor,
        onPress, outline,
        size = 'large',
        disabled,
        position = 'center',
        style,
        iconName,
        containerStyle,
        iconStyle,
        circle = false,
        loading = false,
    } = props;

    const buttonStyle = () => {
        if (outline) {
            return {
                color: APP_COLORS.MAIN_COLOR,
                backgroundColor: APP_COLORS.SOLID_WHITE,
                borderColor: APP_COLORS.MAIN_COLOR,
                borderWidth: 1.5,
                borderRadius: circle ? 50 : 4,
            }
        } else {
            return {
                color: APP_COLORS.SOLID_WHITE,
                backgroundColor: APP_COLORS.MAIN_COLOR,
                borderRadius: circle ? 50 : 4,
            }
        }
    }

    const myStyle = {
        ...style,
    }

    return (
        <View style={{ ...styles.container, ...myStyle }}>
            {circle ?
                <View style={styles.circleButton}>
                    <Button
                        titleStyle={{ color: outline ? APP_COLORS.MAIN_COLOR : APP_COLORS.SOLID_WHITE, }}
                        // color={buttonStyle().color}
                        onPress={onPress}
                        disabled={disabled}
                        containerStyle={styles.containerStyle}
                        buttonStyle={buttonStyle()}
                        icon={
                            <View>
                                {iconName && <Icon
                                    style={{ fontSize: 12, ...iconStyle }}
                                    name={iconName as string}
                                    color={buttonStyle().color}
                                />}
                            </View>
                        }
                    />
                    <Text style={{ color: APP_COLORS.SOLID_WHITE, fontSize: 12 }}>{title}</Text>
                </View>
                :
                <Button
                    titleStyle={{ color: outline ? APP_COLORS.MAIN_COLOR : APP_COLORS.SOLID_WHITE, }}
                    title={title}
                    // color={buttonStyle().color}
                    onPress={onPress}
                    disabled={disabled}
                    containerStyle={containerStyle}
                    buttonStyle={buttonStyle()}
                    icon={
                        <View>
                            {iconName && <Icon
                                style={{ fontSize: 20, ...iconStyle }}
                                name={iconName as string}
                                color={buttonStyle().color}
                            />}
                        </View>
                    }
                    loading={loading}
                />
            }
            {/* <Button
                label={title}
                color={buttonStyle().color}
                backgroundColor={buttonStyle().backgroundColor}
                onPress={onPress}
                outline={outline}
                size={Button.sizes[size]}
                outlineColor={buttonStyle().outlineColor}
                disabled={disabled}
                borderRadius={3}
            /> */}
        </View >
    )
}

export default MyButton;

const styles = StyleSheet.create({
    container: {
        margin: 5
    },
    button: {
    },
    circleButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerStyle: {
        width: 45,
        height: 45,
    },
})
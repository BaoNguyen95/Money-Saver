import React from 'react'
import { KeyboardTypeOptions, StyleSheet } from 'react-native'
import { TextField, View } from 'react-native-ui-lib';
import { APP_COLORS } from '../../styles/app.style';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface IMyTextInput {
    title: string;
    color?: string;
    backgroundColor?: string;
    onChange: (value: string) => void;
    outline?: boolean;
    floatingPlaceholder?: boolean;
    value: any;
    placeholder?: string;
    secureTextEntry?: boolean;
    placeHolder?: string;
    disabled?: boolean;
    keyboardType?: KeyboardTypeOptions;
    iconName?: string;
    editable?: boolean;
    multiline?: boolean;
    errorMessage?: string;
}

export const MyTextInput = (props: IMyTextInput) => {
    const {
        title,
        color = APP_COLORS.MAIN_COLOR,
        backgroundColor,
        onChange,
        outline = true,
        floatingPlaceholder = true,
        secureTextEntry,
        value,
        placeHolder,
        disabled = false,
        keyboardType,
        iconName,
        editable,
        multiline,
        errorMessage
    } = props;

    const _value = value === 0 ? '' : value || '';

    return (
        <View style={styles.container}>
            {/* <Input
                style={styles.myStyle}
                onChangeText={onChange}
                placeholder={title}
                secureTextEntry={secureTextEntry}
                value={_value.toString()}
                disabled={disabled}
                keyboardType={keyboardType}
                editable={editable}
                multiline={multiline}
                errorMessage={errorMessage}
                leftIcon={
                    <View>
                        {iconName && <Icon
                            name={iconName as string}
                            size={20}
                            color={color}
                        />}
                    </View>
                }
            /> */}

            <TextField
                color={APP_COLORS.BLACK}
                backgroundColor={backgroundColor}
                onChangeText={onChange}
                outline={outline}
                outlineColor={color}
                floatingPlaceholder={floatingPlaceholder}
                floatOnFocus={true}
                placeholder={title}
                value={_value.toString()}
                underlineColor={color}
                floatingPlaceholderColor={color}
                secureTextEntry={secureTextEntry}
                error={errorMessage}
                editable={editable}
                disabled={disabled}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    myStyle: {
    }
})
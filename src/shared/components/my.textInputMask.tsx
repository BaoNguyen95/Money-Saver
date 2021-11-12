import React from 'react'
import { KeyboardTypeOptions, StyleSheet } from 'react-native'
import { View } from 'react-native-ui-lib';
import { APP_COLORS } from '../../styles/app.style';
import { Input } from 'react-native-elements';
import { TextInputMask, TextInputMaskTypeProp } from 'react-native-masked-text';
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
    type: TextInputMaskTypeProp;
}

export const MyTextInputMask = (props: IMyTextInput) => {
    const {
        title,
        color = APP_COLORS.MAIN_COLOR,
        backgroundColor,
        onChange,
        secureTextEntry,
        value,
        keyboardType,
        editable,
        multiline,
        type,
    } = props;

    const _value = value === 0 ? '' : value || '';

    return (
        <TextInputMask
            type={type}
            value={_value.toString()}
            style={styles.myStyle}
            onChangeText={onChange}
            placeholder={title}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            editable={editable}
            multiline={multiline}
            options={{
                precision: 0,
                separator: ',',
                delimiter: '',
                unit: '',
                suffixUnit: ''
            }}
            clearButtonMode={'always'}
        />
    )
}

const styles = StyleSheet.create({
    myStyle: {
        margin: 10,
        color: APP_COLORS.GRAY,
        fontSize: 16,
        borderBottomColor: APP_COLORS.MAIN_COLOR,
        borderBottomWidth: 1.5,
    }
})
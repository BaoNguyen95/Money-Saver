import { APP_COLORS } from '@moneysaver/styles/app.style';
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Avatar, Picker, PickerItemValue } from 'react-native-ui-lib';
import { PickerItemRenderItemFunc } from 'react-native-ui-lib/typings';
export interface IOptions {
    value: any;
    label: string;
    disabled?: boolean;
    type?: string;
    image?: string;
}

interface IProps {
    placeholder?: string;
    floatingPlaceholder?: boolean,
    value: any;
    enableModalBlur?: boolean
    onChange: (value: string | string[]) => void;
    showSearch?: boolean;
    searchPlaceholder?: string;
    options: IOptions[];
    style?: any;
    mode?: 'SINGLE' | 'MULTI';
    multiple?: boolean,
    hideUnderline?: boolean,
    defaultValue?: any;
}

const MyPicker = (props: IProps) => {
    const {
        placeholder,
        floatingPlaceholder,
        value,
        enableModalBlur = true,
        onChange,
        showSearch,
        searchPlaceholder,
        options,
        style,
        mode,
        multiple,
        hideUnderline = false,
        defaultValue
    } = props;

    const onClickItem = (data: any) => {
        let value = data?.length ? data as string[] : data?.value as string;
        if (value?.length && defaultValue) {
            value = [...new Set(value.concat(defaultValue))];
        }
        onChange(value);
    }

    return (
        <Picker
            hideUnderline={hideUnderline}
            style={{ ...styles.container, ...style }}
            placeholder={placeholder}
            floatingPlaceholder={floatingPlaceholder}
            value={value}
            enableModalBlur={enableModalBlur}
            onChange={onClickItem}
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            mode={mode}
            multiple={multiple}
        >
            {
                options.map(({ value, label, disabled, image }) =>
                    <Picker.Item
                        key={value}
                        value={value}
                        label={label}
                        disabled={disabled}
                        renderItem={(item, props) => (
                            <View style={{ ...styles.item, backgroundColor: disabled ? 'rgba(0,0,0,0.2)' : 'white' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {image && <Avatar containerStyle={styles.avatar} size={40} source={{ uri: image }} />}
                                    <Text style={styles.text} >{label}</Text>
                                </View>
                                {(props.isSelected || disabled) && <Icon style={{ alignSelf: 'flex-end' }} size={20} color={APP_COLORS.MAIN_COLOR} name={'check'} />}
                            </View>
                        )}
                    />)
            }
        </Picker>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    avatar: {
    },
    text: {
        fontSize: 16,
        marginLeft: 10,
    }
})

export default MyPicker
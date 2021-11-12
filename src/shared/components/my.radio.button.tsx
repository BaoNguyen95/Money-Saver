import React from 'react'
import { ImageSourcePropType, ImageStyle, View } from 'react-native';
import { RadioButton, RadioGroup } from 'react-native-ui-lib';
import { APP_COLORS } from '../../styles/app.style';
import { IOptions } from './'

interface IProps {
    options?: IOptions[]
    iconStyle?: ImageStyle;
    iconSource?: ImageSourcePropType;
    color?: string;
    size?: number;
    value?: any;
    label?: any;
    borderRadius?: number;
    disabled?: boolean;
    isRow?: boolean;
    onValueChange: (value: any) => void;
}

const MyRadioButton = (props: IProps) => {
    const {
        options,
        size = 18,
        color = APP_COLORS.MAIN_COLOR,
        value,
        iconSource,
        iconStyle,
        label,
        borderRadius = 50,
        disabled,
        isRow = true,
        onValueChange,
    } = props;

    const renderRadioButton = () => {
        if (!options?.length) {
            options?.push({ value: value, label: label, disabled: disabled })
        }

        return options?.map((x, i) =>
            <RadioButton
                containerStyle={{ marginTop: 10, marginRight: 10, marginBottom: isRow ? 10 : 0 }}
                key={x.value}
                value={x.value}
                size={size}
                color={color}
                borderRadius={borderRadius}
                iconSource={iconSource}
                iconStyle={iconStyle}
                label={x.label}
                disabled={disabled ? disabled : x.disabled}
                onValueChange={onValueChange}
            />
        );
    }

    if (options?.length) {
        return (
            <RadioGroup onValueChange={onValueChange} initialValue={value} >
                <View style={{ flexDirection: isRow ? 'row' : 'column' }}>
                    {renderRadioButton()}
                </View >
            </RadioGroup>
        )
    } else {
        return (
            <View>
                {renderRadioButton()}
            </View>
        )
    }

}

export default MyRadioButton;
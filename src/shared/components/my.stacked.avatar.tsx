import { APP_COLORS } from "@moneysaver/styles/app.style";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-ui-lib";


const DEFAULT_MAX_AVATARS = 5;

function renderRemaining(props: any) {
    const { avatars = [], maxAvatars = DEFAULT_MAX_AVATARS, size } = props;
    const remaining = avatars.length - maxAvatars;

    if (remaining < 1) return null;

    return <View style={styles.participantItem}>
        <Avatar
            label={`+${remaining}`}
            backgroundColor={APP_COLORS.MAIN_COLOR}
            labelColor={APP_COLORS.SOLID_WHITE}
            containerStyle={styles.avatarStyle}
            size={size + 5}
        />
    </View>;
}

export default function StackedAvatar(props: any) {
    const { avatars = [], maxAvatars = DEFAULT_MAX_AVATARS, ...others } = props;
    return (
        <View style={styles.participantContainer}>
            {avatars.slice(0, maxAvatars).map((s: any, i: number) => (
                <View key={i} style={styles.participantItem}>
                    <Avatar
                        source={{ uri: s.uri }}
                        containerStyle={styles.avatarStyle}
                        {...others}
                    />
                </View>
            ))}
            {renderRemaining(props)}
        </View>
    );
}

const styles = StyleSheet.create({
    participantContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    participantItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: -7
    },
    avatarStyle: {
        borderColor: APP_COLORS.SOLID_WHITE,
        borderWidth: 1.5,
    }
});

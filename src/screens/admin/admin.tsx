import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderAdmin from '../../shared/components/headers/header.admin';
import { APP_STYLE } from '../../styles/app.style';

const AdminScreen = (props: any) => {

    const { navigation } = props;

    useEffect(() => {

    }, [])

    return (
        <View style={styles.container}>
            <Text>Admin Screen Admin</Text>
        </View>
    )
}

AdminScreen.navigationOptions = HeaderAdmin;

const styles = StyleSheet.create({
    container: {
        ...APP_STYLE.container
    }
})

export default AdminScreen;
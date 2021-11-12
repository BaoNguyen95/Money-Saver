import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { AppState } from '../../core/reducers/rootReducer'
import MyToast, { IMyToast } from '../components/my.toast'

interface IHelperComponentProps {
    toast: IMyToast;
}


const HelperComponent = (props: IHelperComponentProps) => {
    const { toast } = props;
    return (
        <View>
            <MyToast
                message={toast.message}
                visible={toast.visible}
                messageType={toast.messageType}
            />
        </View>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        toast: state.toast,
    }
}


export default connect(mapStateToProps, null)(HelperComponent);

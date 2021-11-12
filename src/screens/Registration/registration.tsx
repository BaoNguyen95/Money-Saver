import React, { Dispatch, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { myMessage, useMergeState } from '../../shared/helper/helper';
import { APP_STYLE } from '../../styles/app.style';
import { connect } from 'react-redux';
import { addUserRequest } from './registration.actionCreators';
import { RegistrationActions, resetReducer } from '../../core/actionTypes';
import { IAddUserResponse } from './registration.reducer';
import HeaderSubScreen from '../../shared/components/headers/header.sub.screen';
import { AppState } from '../../core/reducers/rootReducer';
import NavigationService from '../../navigation/navigation.service';
import { MyTextInput } from '../../shared/components/my.textInput';
import MyButton from '../../shared/components/my.button';
import { MESSAGE_TYPE } from '../../shared/constants/common.constants';
import { showMessage } from 'react-native-flash-message';

export interface IRegistrationState {
  username: string;
  displayName: string;
  password: string;
  reEnterPassword?: string;
  loading?: boolean;
}

export interface IRegistrationProps extends IAddUserResponse {
  onSubmit: (data: IRegistrationState) => void;
  onResetId: () => void;
  navigation: NavigationService,
  toggleDialog: (flag: boolean) => void;
  id: string;
  message?: string;
}

const initState: IRegistrationState = {
  username: '',
  displayName: '',
  password: '',
  reEnterPassword: '',
  loading: false,
};

const RegistrationScreen = (props: IRegistrationProps) => {
  const { navigation, onSubmit, id, onResetId, toggleDialog, message } = props;
  const [state, setState] = useMergeState(initState);
  const { username, password, reEnterPassword, displayName, loading } = state;

  useEffect(() => {
    onResetId();
    if (id) {
      toggleDialog(false);
      myMessage('Registered successfully', MESSAGE_TYPE.SUCCESS);
      setState({ loading: false })
    }
  }, [id]);

  const onChange = (value: string, name: string) => {
    setState({ [name]: value });
  };

  const onClickSubmit = () => {
    if ((reEnterPassword === password && username && displayName) && !loading) {
      onSubmit({ username, password, displayName })
      setState({ loading: true })
    } else {
      if (reEnterPassword !== password) {
        showMessage({
          description: 'Password is not matched',
          message: MESSAGE_TYPE.WARNING,
          type: 'warning',
          icon: 'warning',
        })
      }
    }
  }

  const disabledButton = !(username && displayName && (reEnterPassword === password));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <MyTextInput title={'Username'} value={username} errorMessage={message} onChange={(value) => onChange(value, 'username')}></MyTextInput>
      <MyTextInput title={'Display Name'} value={displayName} onChange={(value) => onChange(value, 'displayName')}></MyTextInput>
      <MyTextInput secureTextEntry title={'Password'} value={password} onChange={(value) => onChange(value, 'password')}></MyTextInput>
      <MyTextInput secureTextEntry title={'Re-enter password'} value={reEnterPassword} onChange={(value) => onChange(value, 'reEnterPassword')}></MyTextInput>
      <View style={APP_STYLE.actionsButton}>
        <MyButton loading={loading} style={{ flex: 1 }} title="Submit" onPress={onClickSubmit} disabled={disabledButton} />
        <MyButton style={{ flex: 1 }} title="Cancel" onPress={() => toggleDialog(false)} outline={true} />
      </View>
    </View >
  );
};

RegistrationScreen.navigationOptions = HeaderSubScreen('Register');

const styles = StyleSheet.create({
  title: {
    ...APP_STYLE.titleComponent,
    textAlign: 'center',
    fontSize: 30,
  },
  container: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
})

const mapStateToProps = (state: AppState) => {
  return { id: state.registration.id, message: state.registration.message };
}

const mapDispatchToProps = (dispatch: Dispatch<RegistrationActions>) => {
  return {
    onResetId: () => dispatch(resetReducer()),
    onSubmit: (data: IRegistrationState) => dispatch(addUserRequest(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);

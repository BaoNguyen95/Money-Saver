import React, { useEffect, useRef } from 'react'
import { APP_COLORS } from '@moneysaver/styles/app.style';
import { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { IResponse, IUser } from '../models/common.model';
import { Icon, MessageType, showMessage } from 'react-native-flash-message';
import { MESSAGE_TYPE } from '../constants/common.constants';

export const useMergeState = (initialState?: any) => {
  const [state, setState] = useState(initialState);
  const callbackRef = useRef(() => undefined);

  const setMergedState = (newState: any, callback: () => any) => {
    callbackRef.current = callback;
    return setState((prevState: any) => Object.assign({}, prevState, newState));
  }

  useEffect(() => {
    callbackRef.current?.();
  }, [state]);

  return [state, setMergedState];
};

export const sortByDate = (a: Date, b: Date) => new Date(a).getTime() - new Date(b).getTime();

export const notFoundContent = () => {
  return (
    <View style={styles.notFoundContent}>
      <Text style={styles.textNotFound}>Data not found</Text>
    </View>
  )
}

export const convertStringToNumber = (value: string, pointType = "."): number => +value.split(pointType).join("");

export const formatVND = (value: number): string => Intl.NumberFormat('en-VN').format(Math.round(value));

export const getUniqueListBy = (arr: any[], key: string) => [...new Map(arr.map(item => [item[key], item])).values()];

export const findUser = (id: string, listUser: IUser[]) => listUser?.length ? listUser.find(user => user.id === id)?.displayName : "User not found";

export const getAvatarName = (name: string) => name.split(" ").map(str => str[0]).join("");

export const myMessage = (message: string, type: string) => {
  const data = type.toLocaleLowerCase();
  showMessage({
    description: message,
    message: type,
    type: data as MessageType,
    icon: data as Icon,
  })
}

export const getPlatformPath = ({ path, uri }: any) => {
  return Platform.select({
    android: { value: path },
    ios: { value: uri }
  })
}

export const handleShowMessage = (data: IResponse) => {
  myMessage(data.message as string, data.success ? MESSAGE_TYPE.SUCCESS : MESSAGE_TYPE.ERROR);
}

const styles = StyleSheet.create({
  notFoundContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNotFound: {
    fontSize: 18,
    color: APP_COLORS.LIGHT_GRAY
  }
});
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListHistory } from '../../components'
import { colors, getData } from '../../utils'
import {getListHistory} from '../../config/actions/HistoryAction';
import { useDispatch } from 'react-redux';

const History = ({navigation}) => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    getData('user').then((res) => {
      const data = res;

      if (!data) {
        navigation.replace('Login');
      } else {
        dispatch(getListHistory(data.uid));
      }
    });
  },[])
  
  return (
    <View style={styles.pages}>
      <ListHistory/>
    </View>
  )
    }
    export default History

const styles = StyleSheet.create({
    pages: {
        backgroundColor: colors.white,
        flex: 1
    }
})

import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {CardHistory} from '../../kecil';
import { useSelector } from 'react-redux';
import { colors, fonts } from '../../../utils';
import { Shopping } from '../../../assets';

const ListHistory = () => {
  const {getListHistoryLoading, getListHistoryResult} = useSelector(s => s.HistoryReducer);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {getListHistoryResult ? (
          Object.keys(getListHistoryResult).map(key => {
            return (
              <CardHistory
                pesanan={getListHistoryResult[key]}
                key={key}
                id={key}
              />
            );
          })
        ) : getListHistoryLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <View style={styles.emptyData}>
            <Image source={Shopping} style={styles.shopping} />
            <Text style={styles.textEmptyData}>Tidak Ada Pesanan</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ListHistory;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 30,
  },
  emptyData: {
    display: "flex",
    alignItems: "center",
    marginTop: "50%"
  },
  shopping: {
    width: 60,
    height: 60
  },
  textEmptyData : {
    fontFamily: fonts.primary.bold,
  fontSize: 16,
  }
});

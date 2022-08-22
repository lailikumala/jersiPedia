import React from 'react';
import {StyleSheet, Text, View, ScrollView, ActivityIndicator, Image} from 'react-native';
import {CardKeranjang} from '../../kecil';
import { colors, fonts } from '../../../utils';
import { useSelector } from 'react-redux';
import { IconKeranjang, Shopping } from '../../../assets';

const ListKeranjang = () => {
  const {
    getListKeranjangLoading,
    getListKeranjangResult,
    getListKeranjangError,
  } = useSelector(s => s.KeranjangReducer)
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
      {getListKeranjangResult ? (
          Object.keys(getListKeranjangResult.pesanans).map((key) => {
            return (
              <CardKeranjang
                keranjang={getListKeranjangResult.pesanans[key]}
                keranjangUtama={getListKeranjangResult}
                key={key}
                id={key}
              />
            );
          })
        ) : getListKeranjangLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : getListKeranjangError ? (
          <Text>{getListKeranjangError}</Text>
        ) : (
          <View style={styles.emptyData}>
            <Image source={Shopping} style={styles.shopping} />
            <Text style={styles.textEmptyData}>Keranjang Kosong</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ListKeranjang;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
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

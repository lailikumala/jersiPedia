import React from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import { useSelector } from 'react-redux';
import { colors } from '../../../utils';
import { CardLiga } from '../../kecil'

const ListLiga = ({ligas}) => {

  const {getListLigaLoading, getListLigaResult, getListLigaError} = useSelector(
    s => s.LigaReducer
  );

    return (
      <View style={styles.container}>
        {getListLigaResult ? (
          Object.keys(getListLigaResult).map((key) => {
            return <CardLiga liga={getListLigaResult[key]} key={key} id={key} />;
          })
        ) : getListLigaLoading ? (
          <View style={styles.loading}>
              <ActivityIndicator color={colors.primary} />
          </View>
        ) : getListLigaError ? (
          <Text>{getListLigaError}</Text>
        ) :(
          <Text>Data Kosong</Text>
        )}
      </View>
    )
}

export default ListLiga

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    }
})

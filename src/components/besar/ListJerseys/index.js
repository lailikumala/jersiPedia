import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux';
import { colors } from '../../../utils';
import { CardJersey } from '../../kecil'

const ListJerseys = ({jerseys, navigation}) => {

  const {getListJerseyLoading,
    getListJerseyResult,
    getListJerseyError} = useSelector(s => s.JerseyReducer);

  return (
    <View style={styles.container}>
      {getListJerseyResult ? (
        Object.keys(getListJerseyResult).map((key) => {
          return (
            <CardJersey
              key={key}
              jersey={getListJerseyResult[key]}
            />
          );
        })
      ) : getListJerseyLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : getListJerseyError ? (
        <Text>{getListJerseyError}</Text>
      ) : (
        <Text>Data Kosong</Text>
      )}
    </View>
  )
}

export default ListJerseys

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10
    }
})

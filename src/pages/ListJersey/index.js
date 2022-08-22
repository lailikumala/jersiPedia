import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {HeaderComponent, ListJerseys, ListLiga} from '../../components';
import {colors, fonts} from '../../utils';
import {Jarak} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getListJersey} from '../../config/actions/JerseyAction';
import {getListLiga} from '../../config/actions/LigaAction';

const ListJersey = ({navigation}) => {
  const dispatch = useDispatch();
  const {idLiga, keyword, namaLiga} = useSelector(s => s.JerseyReducer);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getListLiga());
      dispatch(getListJersey(idLiga, keyword));
    });
    return unsubscribe;
  }, [idLiga, keyword]);

  useEffect(() => {
    if (keyword) dispatch(getListJersey(idLiga, keyword))
    else if (idLiga) dispatch(getListJersey(idLiga, keyword))
  }, [keyword, idLiga]);

  
    return (
      <View style={styles.page}>
        <HeaderComponent navigation={navigation} page="ListJersey"/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.pilihLiga}>
            <ListLiga navigation={navigation} />
          </View>

          <View style={styles.pilihJersey}>
            {keyword ? (
              <Text style={styles.label}>
                Cari : <Text style={styles.boldLabel}>{keyword}</Text>
              </Text>
            ) : (
              <Text style={styles.label}>
                Pilih <Text style={styles.boldLabel}>Jersey </Text>
                {namaLiga ? namaLiga : 'Yang Anda Inginkan'}
              </Text>
            )}
            <ListJerseys navigation={navigation} />
          </View>
          <Jarak height={100} />
        </ScrollView>
      </View>
    );
  }
  export default ListJersey

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white},
  container: {
    marginTop: -30,
  },
  pilihLiga: {
    marginHorizontal: 30,
  },
  pilihJersey: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
});

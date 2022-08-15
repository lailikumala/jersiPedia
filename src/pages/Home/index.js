import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from "react-redux";
import {
  BannerSlider,
  HeaderComponent,
  ListJerseys,
  ListLiga,
  Tombol,
} from '../../components';
import {colors, fonts} from '../../utils';
import { Jarak } from '../../components';
import { getListLiga } from '../../config/actions/LigaAction';
import { limitJersey } from '../../config/actions/JerseyAction';

const Home = ({navigation}) => {
  const dispatch = useDispatch(); 

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getListLiga());
      dispatch(limitJersey());
    });

    return unsubscribe;
  }, []);

    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderComponent navigation={navigation} page="Home"/>
          <BannerSlider />
          <View style={styles.pilihLiga}>
            <Text style={styles.label}>Pilih Liga</Text>
            <ListLiga ligas={navigation} />
          </View>

          <View style={styles.pilihJersey}>
            <Text style={styles.label}>
              Pilih <Text style={styles.boldLabel}>Jersey</Text> Yang Anda
              Inginkan
            </Text>
            <ListJerseys navigation={navigation}/>

            <Tombol title="Lihat Semua" type="text" padding={7} />
          </View>

          <Jarak height={100}/>
        </ScrollView>
      </View>
    );
  }
  export default Home

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white},
  pilihLiga: {
    marginHorizontal: 30,
    marginTop: 10,
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

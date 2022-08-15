import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {colors, responsiveHeight, responsiveWidth} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const CardLiga = ({liga, id}) => {

  const navigation = useNavigation();
  const dispatch   = useDispatch();

  const toJerseyByLiga = (id, namaLiga) => {

    // ke Jersey Action 
    // dispatch(getJerseyByLiga(id, namaLiga));

    // navigate ke ListJersey
    navigation.navigate('ListJersey');

  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => toJerseyByLiga(id, liga.namaLiga)}
      >
      <Image source={{uri: liga.image}} style={styles.logo} />
    </TouchableOpacity>
  );
};

export default CardLiga;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    borderRadius: 15,
  },
  logo: {
    width: responsiveWidth(57),
    height: responsiveHeight(70),
  },
});

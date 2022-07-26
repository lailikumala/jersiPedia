import React, {useEffect, useState} from 'react';
import { StyleSheet, View, TextInput} from 'react-native';
import {colors, fonts, getData, responsiveHeight} from '../../../utils';
import { IconCari } from '../../../assets'
import { Jarak, Tombol } from '../../kecil'
import {useSelector} from 'react-redux';
import {saveKeywordJersey} from '../../../config/actions/JerseyAction';
import {getListKeranjang} from '../../../config/actions/KeranjangAction';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export default function HeaderComponent({page}) {
  const [search, setSearch] = useState('');
  const [totalKeranjang, setTotal] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {getListKeranjangResult} = useSelector(state => state.KeranjangReducer);

  useEffect(() => {
    getData('user').then(res => {
      if (res) {
        dispatch(getListKeranjang(res.uid));
      }
    });
  }, []);

  useEffect(() => {
    if (getListKeranjangResult) {
      setTotal(Object.keys(getListKeranjangResult.pesanans).length);
    }else {
      setTotal(false);
    }
  }, [getListKeranjangResult]);

  const selesaiCari = () => {
    //jalankan action save keyword
    dispatch(saveKeywordJersey(search));

    //jika itu halaman home kita navigate ke listJersey
    if (page !== 'ListJersey') {
      navigation.navigate('ListJersey');
    }

    //kembalikan state search itu ke string kosong
    setSearch('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperHeader}>
        {/* Input Pencarian  */}
        <View style={styles.searchSection}>
          <IconCari />
          <TextInput
            placeholder="Cari Jersey. . ."
            style={styles.input}
            value={search}
            onChangeText={search => setSearch(search)}
            onSubmitEditing={() => selesaiCari()}
          />
        </View>
        <Jarak width={10} />
        <Tombol
          icon="keranjang"
          padding={10}
          onPress={() => navigation.navigate('Keranjang')}
          totalKeranjang={totalKeranjang}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: responsiveHeight(125),
  },
  wrapperHeader: {
    marginTop: 15,
    marginHorizontal: 30,
    flexDirection: 'row',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingLeft: 10,
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
  },
});

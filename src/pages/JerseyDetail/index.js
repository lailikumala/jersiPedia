import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {
  colors,
  fonts,
  numberWithCommas,
  responsiveHeight,
  heightMobileUI,
  responsiveWidth,
  getData
} from '../../utils';
import {
  CardLiga,
  Inputan,
  Jarak,
  JerseySlider,
  Pilihan,
  Tombol,
} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {getDetailLiga} from '../../config/actions/LigaAction';
import {clearSaveKeranjang, masukKeranjang} from '../../config/actions/KeranjangAction';

const JerseyDetail = ({navigation, route}) => {
  const {jersey}              = route.params;
  const images                = jersey.gambar
  const dispatch              = useDispatch();
  const [jumlah, setJumlah]   = useState('');
  const [ukuran, setUkuran]   = useState('');
  const [keterangan, setKet]  = useState('');
  const {getDetailLigaResult} = useSelector(s => s.LigaReducer);
  const {saveKeranjangLoading, 
        saveKeranjangResult}  = useSelector(s => s.KeranjangReducer);

  useEffect(() => {
    dispatch(getDetailLiga(jersey.liga));
  }, []);

  useEffect(() => {
    if (saveKeranjangResult) {
      dispatch(clearSaveKeranjang());
      navigation.navigate('Keranjang');
    }
  }, [saveKeranjangResult]);

  const submitKeranjang = () => {
    getData('user').then(res => {
      if (res) {
      //validasi form
      if (jumlah && ukuran && keterangan && res.uid) {
        //dispatch ke action masukKeranjang
        dispatch(
          masukKeranjang({
            jersey: jersey,
            ukuran: ukuran,
            jumlah: jumlah,
            keterangan: keterangan,
            uid: res.uid,
          }),
        );
      } else {
        Alert.alert('Error', 'Jumlah, Ukuran & Keterangan harus diisi');
      }
    } else {
      Alert.alert('Info', 'Silahkan Login Terlebih Dahulu');
      navigation.replace('Login');
    }
    });
  };
      
    return (
      <View style={styles.page}>
        <View style={styles.button}>
          <Tombol
            icon="arrow-left"
            padding={7}
            onPress={() => navigation.goBack()}
          />
        </View>
        <JerseySlider images={jersey && jersey.gambar} />
        <View style={styles.container}>
          <View style={styles.liga}>
            <CardLiga 
            liga={getDetailLigaResult}
            navigation={navigation}
            id={jersey.liga}
            />
          </View>
          <View style={styles.desc}>
            <Text style={styles.nama}>{jersey.nama}</Text>
            <Text style={styles.harga}>
              Harga : Rp. {numberWithCommas(jersey.harga)}
            </Text>

            <View style={styles.garis} />

            <View style={styles.wrapperJenisBerat}>
              <Text style={styles.jenisBerat}>Jenis : {jersey.jenis}</Text>
              <Text style={styles.jenisBerat}>Berat : {jersey.berat}</Text>
            </View>

            <View style={styles.wrapperInput}>
              <Inputan
                label="Jumlah"
                width={responsiveWidth(166)}
                height={responsiveHeight(43)}
                fontSize={13}
                value={jumlah}
                onChangeText={jumlah => setJumlah(jumlah)}
                keyboardType="number-pad"
              />
              <Pilihan
                label="Pilih Ukuran"
                width={responsiveWidth(166)}
                height={responsiveHeight(43)}
                fontSize={13}
                datas={jersey.ukuran}
                onValueChange={ukuran => setUkuran(ukuran)}
                selectedValue={ukuran}
              />
            </View>
            <Inputan
              label="Keterangan"
              textarea
              fontSize={13}
              placeholder="Isi jika ingin menambahkan Name Tag (nama & nomor punggung"
              value={keterangan}
              onChangeText={keterangan => setKet(keterangan)}
            />
            <Jarak height={15} />
            <Tombol 
              title="Masuk Keranjang"
              type="textIcon"
              icon="keranjang-putih"
              padding={responsiveHeight(17)}
              fontSize={18}
              onPress={() => submitKeranjang()}
              loading={saveKeranjangLoading}
            />
          </View>
        </View>
      </View>
    );
  }

  export default JerseyDetail

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: responsiveHeight(465),
    width: '100%',
    backgroundColor: colors.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  button: {
    position: 'absolute',
    marginTop: 30,
    marginLeft: 30,
    zIndex: 1,
  },
  desc: {
    marginHorizontal: 30,
  },
  nama: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.bold,
    textTransform: 'capitalize',
  },
  harga: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.light,
  },
  liga: {
    alignItems: 'flex-end',
    marginRight: 30,
    marginTop: -30,
  },
  garis: {
    borderWidth: 0.5,
    marginVertical: 5,
  },
  wrapperJenisBerat: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  jenisBerat: {
    fontSize: 13,
    fontFamily: fonts.primary.regular,
    marginRight: 30,
  },
  wrapperInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

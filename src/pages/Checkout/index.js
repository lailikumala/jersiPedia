import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {CardAlamat, Jarak, Pilihan, Tombol} from '../../components';
import {colors, fonts, numberWithCommas, responsiveHeight, getData, API_RAJAONGKIR} from '../../utils';
import {getKotaDetail, postOngkir} from '../../config/actions/RajaOngkirAction';
import {couriers} from '../../data';
import { useDispatch, useSelector } from 'react-redux';
import { clearSnapTransactions, snapTransactions } from '../../config/actions/PaymentAction';

const Checkout = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [profile, setProfile]     = useState(false);
  const [alamat, setAlamat]       = useState('');
  const [ongkir, setOngkir]       = useState(0);
  const [estimasi, setEstimasi]   = useState('');
  const [kota, setKota]           = useState('');
  const [provinsi, setProvinsi]   = useState('');
  const [date]                    = useState(new Date().getTime());
  const [ekspedisiSelected, 
          setEkspedisiSelected]   = useState(false);
  const {totalHarga, totalBerat}  = route.params;
  const {getKotaDetailResult, 
        ongkirResult}             = useSelector(s => s.RajaOngkirReducer);
  const {snapTransactionsResult, 
        snapTransactionsLoading}  = useSelector(s => s.PaymentReducer);
        
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      if (data) {
        setProfile(data);
        setAlamat(data.alamat);
        dispatch(getKotaDetail(data.kota));
      } else {
        navigation.replace('Login');
      }
    });
  }, []);

  useEffect(() => {
    if (getKotaDetailResult) {
      setProvinsi(getKotaDetailResult.province);
      setKota(getKotaDetailResult.type + ' ' + getKotaDetailResult.city_name);
    }
  }, [getKotaDetailResult]);

  useEffect(() => {
    if (ongkirResult) {
      setOngkir(ongkirResult.cost[0].value);
      setEstimasi(ongkirResult.cost[0].etd);
    }
  }, [ongkirResult]);

  useEffect(() => {
    if (snapTransactionsResult) {
      const params = {
        url: snapTransactionsResult.redirect_url,
        ongkir: ongkir,
        estimasi: estimasi,
        order_id: 'TEST-' + date + '-' + profile.uid,
      };

      dispatch(clearSnapTransactions());

      navigation.navigate('Midtrans', params);
    }
  }, [snapTransactionsResult]);

  const ubahEkspedisi = ekspedisiSelected => {
    if (ekspedisiSelected) {
      setEkspedisiSelected(ekspedisiSelected);

      const data = {
        profile: profile,
        totalBerat: totalBerat,
      };
      dispatch(postOngkir(data, ekspedisiSelected));
    }
  };

  const Bayar = () => {
    const data = {
      transaction_details: {
        order_id: 'TEST-' + date + '-' + profile.uid,
        gross_amount: parseInt(totalHarga + ongkir),
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: profile.nama,
        email: profile.email,
        phone: profile.nohp,
      },
    };
    console.log("dataaa", data)
    if (!ongkir == 0) {
      dispatch(snapTransactions(data));
    } else {
      Alert.alert('Error', 'Silahkan Ongkir Dipilih Terlebih Dahulu');
    }
  };
    return (
      <View style={styles.pages}>
        <View style={styles.isi}>
          <Text style={styles.textBold}>Apakah Benar Alamat ini ?</Text>
          <CardAlamat 
            alamat={alamat}
            provinsi={provinsi}
            kota={kota}
            navigation={navigation}
          />

          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Total Harga :</Text>
            <Text style={styles.textBold}>
              Rp. {numberWithCommas(totalHarga)}
            </Text>
          </View>

          <Pilihan 
            label="Ekspedisi" 
            datas={couriers}
            selectedValue={ekspedisiSelected}
            onValueChange={ekspedisiSelected => ubahEkspedisi(ekspedisiSelected)}
          />
          <Jarak height={10} />

          <Text style={styles.textBold}>Biaya Ongkir :</Text>

          <View style={styles.ongkir}>
            <Text style={styles.text}>Untuk Berat : {totalBerat} kg</Text>
            <Text style={styles.textBold}>Rp. {numberWithCommas(ongkir)}</Text>
          </View>

          <View style={styles.ongkir}>
            <Text style={styles.text}>Estimasi Waktu</Text>
            <Text style={styles.textBold}>{estimasi} Hari</Text>
          </View>
        </View>

        <View style={styles.footer}>
            {/* Total Harga  */}
            <View style={styles.totalHarga}>
              <Text style={styles.textBold}>Total Harga :</Text>
              <Text style={styles.textBold}>
                Rp. {numberWithCommas(totalHarga+15000)}
              </Text>
            </View>

            {/* Tombol  */}
            <Tombol
              title="Bayar"
              type="textIcon"
              fontSize={18}
              padding={responsiveHeight(15)}
              icon="keranjang-putih"
              onPress={() => Bayar()}
              loading={snapTransactionsLoading}
            />
          </View>
      </View>
    );
  }

  export default Checkout

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 30,
    justifyContent: 'space-between'
  },
  isi: {
    paddingHorizontal: 30,
  },
  textBold: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  totalHarga: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  ongkir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    paddingHorizontal: 30,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 11,
    paddingBottom: 30
  },
});

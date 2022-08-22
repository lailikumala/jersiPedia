import React, {useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {ListKeranjang, Tombol} from '../../components';
import {colors, fonts, numberWithCommas, responsiveHeight, getData} from '../../utils';
import {getListKeranjang} from '../../config/actions/KeranjangAction';
import { useDispatch, useSelector } from 'react-redux';

const Keranjang = ({navigation}) => {

  const dispatch = useDispatch();
  const {getListKeranjangResult, deleteKeranjangResult} = useSelector(s => s.KeranjangReducer)
  
  useEffect(() => {
    getData('user').then((res) => {
      if (res) {
        //udah login
        dispatch(getListKeranjang(res.uid));
      } else {
        // belum login
        navigation.replace('Login');
      }
    });
  },[])

  useEffect(() => {
    if(deleteKeranjangResult) {
      getData('user').then((res) => {
        if (res) {
          //udah login
          dispatch(getListKeranjang(res.uid));
        } else {
          // belum login
          navigation.replace('Login');
        }
      });
    }
  },[deleteKeranjangResult])

    return (
      <View style={styles.page}>
        <ListKeranjang/>
        <View style={styles.footer}>
          {/* Total Harga  */}
          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Total Harga :</Text>
            <Text style={styles.textBold}>
              Rp.{' '}
              {getListKeranjangResult
                ? numberWithCommas(getListKeranjangResult.totalHarga)
                : 0}
            </Text>
          </View>

          {/* Tombol  */}
          {getListKeranjangResult ? (
          <Tombol
            title="Check Out"
            type="textIcon"
            fontSize={18}
            padding={responsiveHeight(15)}
            icon="keranjang-putih"
            onPress={() =>
              navigation.navigate('Checkout', {
                totalHarga: getListKeranjangResult.totalHarga,
                totalBerat: getListKeranjangResult.totalBerat,
              })
            }
          />
        ) : (
          <Tombol
            title="Check Out"
            type="textIcon"
            fontSize={18}
            padding={responsiveHeight(15)}
            icon="keranjang-putih"
            disabled={true}
          />
        )}
        </View>
      </View>
    );
  }

  export default Keranjang

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
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
  totalHarga: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 20
  },
  textBold: {
      fontSize: 20,
      fontFamily: fonts.primary.bold
  }
});

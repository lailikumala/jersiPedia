import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert
} from 'react-native';
import {colors, fonts, responsiveWidth} from '../../utils';
import {IlustrasiRegister2} from '../../assets';
import {Inputan, Jarak, Pilihan, Tombol} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {getProvinsiList, getKotaList} from '../../config/actions/RajaOngkirAction';
import { registerUser } from '../../config/actions/AuthAction';

const Register2 = ({navigation, route}) => {
  const [address, setAddress]               = useState('');
  const [dataCity, setDataCity]             = useState(false);
  const [dataProvince, setDataProvince]     = useState(false);
  const dispatch                            = useDispatch();
  const {getProvinsiResult, getKotaResult}  = useSelector((s) => s.RajaOngkirReducer);
  const {registerLoading, registerResult, } = useSelector(state => state.AuthReducer);
  const {name, email, nohp, password}       = route.params

  useEffect(() => {
    dispatch(getProvinsiList())
  },[])

  useEffect(async() => {
    if(registerResult) {
      await Alert.alert("sukses", "User Berhasil Terdaftar!")
      navigation.replace("MainApp");
    }
  },[registerResult])
  
  const ubahProvinsi = (provinsi) => {
    console.log("idd", provinsi)
    setDataProvince(provinsi)
    dispatch(getKotaList(provinsi));
  };

  const onSubmit = () => {
    if(dataCity && dataProvince && address) {
      const data = {
        nama: name,
        email: email,
        nohp: nohp,
        alamat: address,
        provinsi: dataProvince,
        kota: dataCity,
        status: 'user'
      }
      //ke Auth Action
      dispatch(registerUser(data, password));
    }else {
      Alert.alert("Error", 'Alamat, Kota, dan Provinsi harus diisi')
    }
  }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.page}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.btnBack}>
              <Tombol
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
            </View>

            <View style={styles.ilustrasi}>
              <IlustrasiRegister2 />
              <Jarak height={5} />
              <Text style={styles.title}>Isi Alamat</Text>
              <Text style={styles.title}>Lengkap Anda</Text>

              <View style={styles.wrapperCircle}>
                <View style={styles.circleDisabled}></View>
                <Jarak width={10} />
                <View style={styles.circlePrimary}></View>
              </View>
            </View>

            <View style={styles.card}>
              <Inputan 
                label="Address" 
                textarea 
                value={address}
                onChangeText={(address => setAddress(address))}  
              />

              <Pilihan 
              label="Provinsi" 
              datas={getProvinsiResult ? getProvinsiResult : []}
              selectedValue={dataProvince}
              onValueChange={(province) => ubahProvinsi(province)}
              />
              
              <Pilihan 
              label="Kota/Kab" 
              datas={getKotaResult ? getKotaResult : []}
              selectedValue={dataCity}
              onValueChange={(city) => setDataCity(city)}
              />
              <Jarak height={25} />
              <Tombol
                title="Daftar"
                type="textIcon"
                icon="submit"
                padding={10}
                fontSize={18}
                onPress={() => onSubmit()}
                loading={registerLoading}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  export default Register2

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
  },
  ilustrasi: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.primary.light,
    color: colors.primary,
  },
  wrapperCircle: {
    flexDirection: 'row',
    marginTop: 10,
  },
  circlePrimary: {
    backgroundColor: colors.primary,
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 10,
  },
  circleDisabled: {
    backgroundColor: colors.border,
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 10,
  },
  card: {
    backgroundColor: colors.white,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  btnBack: {
    marginLeft: 30,
    position: 'absolute',
  },
});

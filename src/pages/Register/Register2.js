import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {colors, fonts, responsiveWidth} from '../../utils';
import {IlustrasiRegister2} from '../../assets';
import {Inputan, Jarak, Pilihan, Tombol} from '../../components';
import { useNavigation } from '@react-navigation/native';

const Register2 = () => {
  const [dataKota, setDataKota]         = useState([]);
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const navigation                       = useNavigation();
    
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
              <Inputan label="Alamat" textarea />

              <Pilihan label="Provinsi" datas={dataProvinsi} />
              <Pilihan label="Kota/Kab" datas={dataKota} />
              <Jarak height={25} />
              <Tombol
                title="Continue"
                type="textIcon"
                icon="submit"
                padding={10}
                fontSize={18}
                onPress={() => navigation.navigate('MainApp')}
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

import React, {useState} from 'react';
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
import {IlustrasiRegister1} from '../../assets';
import {Inputan, Jarak, Tombol} from '../../components';

const Register1 = ({navigation}) => { 
  
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [nohp, setNohp]         = useState('');
  const [password, setPassword] = useState('');

  const onContinue = () => {
    if (name && email && nohp && password) {
      navigation.navigate('Register2', {name, email, nohp, password});
    } else {
      Alert.alert(
        'Error',
        'Nama, email, no. telp, dan password harus diisi',
      );
    }
  };


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
              <IlustrasiRegister1 />
              <Jarak height={5} />
              <Text style={styles.title}>Daftar</Text>
              <Text style={styles.title}>Isi Data Diri Anda</Text>

              <View style={styles.wrapperCircle}>
                <View style={styles.circlePrimary}></View>
                <Jarak width={10} />
                <View style={styles.circleDisabled}></View>
              </View>
            </View>

            <View style={styles.card}>
              <Inputan 
                label="Nama"
                value={name}
                onChangeText={name => setName(name)} 
              />
              <Inputan 
                label="Email"
                value={email}
                onChangeText={email => setEmail(email)} 
              />
              <Inputan 
                label="No. Telp" keyboardType="number-pad" 
                value={nohp}
                onChangeText={nohp => setNohp(nohp)}
              />
              <Inputan 
                label="Password" 
                secureTextEntry 
                value={password}
                onChangeText={password => setPassword(password)}
              />
              <Jarak height={25} />
              <Tombol
                title="Selanjutnya"
                type="textIcon"
                icon="submit"
                padding={10}
                fontSize={18}
                onPress={() => onContinue()}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  export default Register1

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20
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
    marginBottom: 10
  },
  btnBack: {
    marginLeft: 30,
    position: 'absolute',
  },
});

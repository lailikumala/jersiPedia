import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {Ilustrasi, Logo} from '../../assets';
import {Inputan, Jarak, Tombol} from '../../components';
import { loginUser } from '../../config/actions/auth';
import {colors, fonts, responsiveHeight} from '../../utils';

const Login = ({navigation}) => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const dispatch                = useDispatch();
  const {loginLoading, loginResult} = useSelector(s => s.Auth);

  useEffect(() => {
    if (loginResult) navigation.replace('MainApp')
  }, [loginResult]);

  const login = () => {
    if (email && password) {
      //action
      dispatch(loginUser(email, password));
    } else {
      Alert.alert('Error', 'Email & Password harus diisi');
    }
  };
    return (
      <View style={styles.pages}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <View style={styles.cardLogin}>
          <Inputan 
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
            
          />
          <Inputan 
            label="Password" 
            secureTextEntry 
            value={password}
          onChangeText={password => setPassword(password)}

          />
          <Jarak height={25} />
          <Tombol 
            title="Masuk" 
            type="text" 
            padding={12} 
            fontSize={18} 
            loading={loginLoading}
            onPress={() => login()}
          />
        </View>

        <View style={styles.register}>
            <Text style={styles.textBlue}>Belum Punya akun ?</Text>
            <Text style={styles.textBlue}>Klik untuk <Text onPress={() => navigation.navigate('Register1')} style={{color: "red"}}>Daftar</Text></Text>
        </View>

        <View style={styles.ilustrasi}>
          <Ilustrasi />
        </View>
      </View>
    );
  }

  export default Login

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  ilustrasi: {
    position: 'absolute',
    bottom: 0,
    right: -100,
  },
  logo: {
    alignItems: 'center',
    marginTop: responsiveHeight(70),
  },
  cardLogin: {
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
    padding: 30,
    borderRadius: 10,
    marginTop: 10
  },
  register: {
      alignItems: 'center',
      marginTop: 10
  },
  textBlue: {
      fontSize: 18,
      fontFamily: fonts.primary.bold,
      color: colors.primary
  }
});

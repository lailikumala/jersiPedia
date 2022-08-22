import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {colors, responsiveHeight, getData} from '../../utils';
import {Inputan, Tombol} from '../../components';
import {changePassword, clearChangePassword} from '../../config/actions/ProfileAction';
import { useDispatch, useSelector } from 'react-redux';

const ChangePassword = ({navigation}) => {
  const [password, setPassword]       = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, 
        setNewPasswordConfirmation]   = useState('');
  const dispatch                      = useDispatch();
  const {changePasswordLoading, 
    changePasswordResult}             = useSelector(s => s.ProfileReducer);

  const onSubmit = () => {
    if (newPassword !== newPasswordConfirmation) {
      Alert.alert(
        'Error',
        'Password Baru dan Konfirmasi Password Baru Harus Sama',
      );
    } else if (password && newPassword && newPasswordConfirmation) {
      //ambil data email dari local storage
      getData('user').then((res) => {
        const parameter = {
          email: res.email,
          password: password,
          newPassword: newPassword,
        };

        dispatch(changePassword(parameter));
      });
    } else {
      Alert.alert(
        'Error',
        'Password Lama, Password Baru dan Konfirmasi Password Baru Harus Diisi',
      );
    }
  };
  
  useEffect(() => {
    if(changePasswordResult){
      dispatch(clearChangePassword());
      Alert.alert('Sukses', 'Change Password Success');
      navigation.replace('MainApp');
    }
  }, [changePasswordResult])
  
    return (
      <View style={styles.pages}>
        <View>
          <Inputan 
            label="Password Lama" 
            secureTextEntry
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
          <Inputan 
            label="Password Baru" 
            secureTextEntry
            value={newPassword}
            onChangeText={(newPassword) => setNewPassword(newPassword)} 
          />
          <Inputan 
            label="Konfirmasi Password Baru" 
            secureTextEntry
            value={newPasswordConfirmation}
            onChangeText={(newPassConfir) =>
            setNewPasswordConfirmation(newPassConfir)}
          />
        </View>

        <View style={styles.submit}>
          <Tombol
            title="Submit"
            type="textIcon"
            icon="submit"
            padding={responsiveHeight(15)}
            fontSize={18}
            onPress={() => onSubmit()}
            loading={changePasswordLoading}
          />
        </View>
      </View>
    );
  }
  export default ChangePassword

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingTop: 10,
    justifyContent: 'space-between'
  },
  submit: {
    marginVertical: 30,
  },
});

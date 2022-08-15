import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, ScrollView, Image, Alert, PermissionsAndroid} from 'react-native';
import {colors, fonts, getData, responsiveHeight, responsiveWidth} from '../../utils';
import {Inputan, Pilihan, Tombol} from '../../components';
import {getKotaList, getProvinsiList} from '../../config/actions/RajaOngkirAction';
import {DefaultImage} from '../../assets';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {clearUpdateProfile, updateProfile} from '../../config/actions/ProfileAction';
import {useDispatch, useSelector} from 'react-redux';

const EditProfile = ({navigation}) => {
  
  const dispatch                                     = useDispatch();
  const {getProvinsiResult, getKotaResult}           = useSelector(s => s.RajaOngkirReducer);
  const {updateProfileLoading, updateProfileResult } = useSelector(s => s.ProfileReducer);
  const [state, setState] = useState({
    uid: '',
    nama: '',
    email: '',
    nohp: '',
    alamat: '',
    provinsi: false,
    kota: false,
    avatar: false,
    avatarForDB: '',
    avatarLama: '',
    updateAvatar: false,
  });

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setState({
        ...state,
        uid: data.uid,
        nama: data.nama,
        email: data.email,
        nohp: data.nohp,
        alamat: data.alamat,
        kota: data.kota,
        provinsi: data.provinsi,
        avatar: data.avatar,
        avatarLama: data.avatar,
      });
      dispatch(getKotaList(data.provinsi));
    });
    dispatch(getProvinsiList());
  }, []);

  useEffect(() => {
    if (updateProfileResult) {
      dispatch(clearUpdateProfile());
      Alert.alert('Sukses', 'Update Profile Success');
      navigation.replace('MainApp');
    }
  }, [updateProfileResult]);

  const ubahProvinsi = provinsi => {
    setState({ ...state, provinsi: provinsi});
    dispatch(getKotaList(provinsi));
  };

  const requestLibrary = () => {
    launchImageLibrary(
      {
        quality: 1,
        maxWidth: 500,
        maxHeight: 500,
        includeBase64: true,
        selectionLimit: 1,
        cameraType: 'front',
      },
      response => {
        if (response.didCancel || response.errorCode || response.errorMessage) {
          Alert.alert('Error', 'Maaf sepertinya anda tidak memilih fotonya');
        } else {
          const source = response.assets[0].uri;
          const fileString = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;

          setState({
            ...state,
            avatar: source,
            avatarForDB: fileString,
            updateAvatar: true,
          });
        }
      },
    );
  };

  // IMAGE PICKER FROM CAMERA FOR CUST_PHOTO
  const requestCameraPermission = () => {
    launchCamera(
      {
        quality: 1,
        maxWidth: 500,
        maxHeight: 500,
        includeBase64: true,
        selectionLimit: 1,
        cameraType: 'front',
      },
      response => {
        if (response.didCancel || response.errorCode || response.errorMessage) {
          Alert.alert('Error', 'Maaf sepertinya anda tidak memilih fotonya');
        } else {
          const source = response.assets[0].uri;
          const fileString = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;

          setState({
            ...state,
            avatar: source,
            avatarForDB: fileString,
            updateAvatar: true,
          });
        }
      },
    );
  };

  const getImage = () => {
    Alert.alert(
      "Pilih Foto",
      "Pilih Foto yang akan digunakan sebagi profil",
      [
        {
          text: "Batal",
          onPress: () => console.log("Logout Cancel"),
          style: "cancel"
        },
        { text: "Kamera", onPress: requestCameraPermission },
        { text: "Galeri", onPress: requestLibrary },
      ]
    );
  }

  const onSubmit = () => {
    const {nama, alamat, nohp, provinsi, kota} = state;
    if (nama && nohp && alamat && provinsi && kota) {
      //dispatch update
      dispatch(updateProfile(state));
    } else {
      Alert.alert('Error', 'Nama No. HP, Alamat, Kota, Provinsi harus diis');
    }
  };

  const {nama, email, alamat, nohp, provinsi, kota, avatar} = state;

    return (
      <View style={styles.pages}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Inputan
          label="Nama"
          value={nama}
          onChangeText={nama => setState({...state, nama})}
        />
        <Inputan label="Email" value={email} disabled />
        <Inputan
          label="No. Handphone"
          value={nohp}
          onChangeText={nohp => setState({...state, nohp})}
          keyboardType="number-pad"
        />
        <Inputan
          label="Alamat"
          value={alamat}
          onChangeText={alamat => setState({...state, alamat})}
          textarea
        />
        <Pilihan
          label="Provinsi"
          datas={getProvinsiResult ? getProvinsiResult : []}
          selectedValue={provinsi}
          onValueChange={provinsi => ubahProvinsi(provinsi)} 
        />
        <Pilihan
          label="Kota/Kab"
          datas={getKotaResult ? getKotaResult : []}
          selectedValue={kota}
          onValueChange={(kota) => setState({...state, kota})}
        />
        <View style={styles.inputFoto}>
          <Text style={styles.label}>Foto Profil :</Text>
          <View style={styles.wrapperUpload}>
            <Image
              source={avatar ? {uri: avatar} : DefaultImage}
              style={styles.foto}
            />
            <View style={styles.tombolChangePhoto}>
              <Tombol
                title="Pilih Foto"
                type="text"
                padding={7}
                onPress={getImage}
              />
            </View>
          </View>
        </View>
        <View style={styles.submit}>
          <Tombol
            loading={updateProfileLoading}
            title="Ubah"
            type="textIcon"
            icon="submit"
            padding={responsiveHeight(15)}
            fontSize={18}
            onPress={() => onSubmit()}
          />
        </View>
        </ScrollView>
      </View>
    );
  }
  export default EditProfile

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  inputFoto: {
      marginTop: 20
  },
  label: {
      fontSize: 18, 
      fontFamily: fonts.primary.regular
  },
  foto: {
    width: responsiveWidth(150),
    height: responsiveWidth(150),
    borderRadius: 40,
  },
  wrapperUpload: {
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center'
  },
  tombolChangePhoto: {
      marginLeft: 20,
      flex: 1,
  },
  submit: {
      marginVertical: 30
  }
});

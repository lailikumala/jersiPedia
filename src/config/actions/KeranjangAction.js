import FIREBASE from '../firebase';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../../utils';

export const MASUK_KERANJANG = 'MASUK_KERANJANG';
export const GET_LIST_KERANJANG = 'GET_LIST_KERANJANG';
export const DELETE_KERANJANG = 'DELETE_KERANJANG';
export const CLEAR_SAVE_KERANJANG = 'CLEAR_SAVE_KERANJANG';

export const clearSaveKeranjang = () => dispatch => {
  return dispatchSuccess(dispatch, CLEAR_SAVE_KERANJANG, "");
}

export const masukKeranjang = (data) => dispatch => {
    //loading
    dispatchLoading(dispatch, MASUK_KERANJANG);

    // Cek Apakah Data Keranjang User tersebut sudah ada atau tidak
    return FIREBASE.database()
      .ref('keranjangs/' + data.uid)
      .once('value', (querySnapshot) => {

        if (querySnapshot.val()) {
          //Update Keranjang Utama
          const keranjangUtama = querySnapshot.val();
          const beratBaru =
            parseInt(data.jumlah) * parseFloat(data.jersey.berat);
          const hargaBaru = parseInt(data.jumlah) * parseInt(data.jersey.harga);

          FIREBASE.database()
            .ref('keranjangs')
            .child(data.uid)
            .update({
              totalHarga: keranjangUtama.totalHarga + hargaBaru,
              totalBerat: keranjangUtama.totalBerat + beratBaru,
            })
            .then((response) => {
              //Simpan Ke Keranjang Detail
              dispatch(masukKeranjangDetail(data));
            })
            .catch((error) => {
              dispatchError(dispatch, MASUK_KERANJANG, error);
              alert(error);
            });
        } else {
          //Simpan Keranjang Utama
          const keranjangUtama = {
            user: data.uid,
            tanggal: new Date().toDateString(),
            totalHarga: parseInt(data.jumlah) * parseInt(data.jersey.harga),
            totalBerat: parseInt(data.jumlah) * parseFloat(data.jersey.berat),
          };

          FIREBASE.database()
            .ref('keranjangs')
            .child(data.uid)
            .set(keranjangUtama)
            .then((response) => {
              //Simpan Ke Keranjang Detail
              dispatch(masukKeranjangDetail(data));
            })
            .catch((error) => {
              dispatchError(dispatch, MASUK_KERANJANG, error);
              alert(error);
            });
        }
      })
      .catch((error) => {
        dispatchError(dispatch, MASUK_KERANJANG, error);
        alert(error);
      });
};

export const masukKeranjangDetail = (data) => dispatch => {
    const pesanans = {
      product: data.jersey,
      jumlahPesan: data.jumlah,
      totalHarga: parseInt(data.jumlah) * parseInt(data.jersey.harga),
      totalBerat: parseInt(data.jumlah) * parseFloat(data.jersey.berat),
      keterangan: data.keterangan,
      ukuran: data.ukuran,
    };

    return FIREBASE.database()
      .ref('keranjangs/' + data.uid)
      .child('pesanans')
      .push(pesanans)
      .then((response) => {
        dispatchSuccess(dispatch, MASUK_KERANJANG, response ? response : []);
      })
      .catch((error) => {
        dispatchError(dispatch, MASUK_KERANJANG, error);
        alert(error);
      });
};

export const getListKeranjang = (id) => dispatch => {
    //loading
    dispatchLoading(dispatch, GET_LIST_KERANJANG);

    return FIREBASE.database()
      .ref('keranjangs/' + id)
      .once('value', (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();
        dispatchSuccess(dispatch, GET_LIST_KERANJANG, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_KERANJANG, error);
        alert(error);
      });
};

export const deleteKeranjang = (id, keranjangUtama, keranjang) => dispatch => {
  //loading
    dispatchLoading(dispatch, DELETE_KERANJANG);

    const totalHargaBaru = keranjangUtama.totalHarga - keranjang.totalHarga;
    const totalBeratBaru = keranjangUtama.totalBerat - keranjang.totalBerat;
    if (totalHargaBaru === 0) {
      // hapus keranjang utama & detail
      return FIREBASE.database()
        .ref('keranjangs')
        .child(keranjangUtama.user)
        .remove()
        .then((response) => {
          dispatchSuccess(
            dispatch,
            DELETE_KERANJANG,
            'Keranjang Sukses Dihapus',
          );
        })
        .catch((error) => {
          dispatchError(dispatch, DELETE_KERANJANG, error);
          alert(error);
        });
    } else {
      // update total harga & total berat keranjang utama
      return FIREBASE.database()
        .ref('keranjangs')
        .child(keranjangUtama.user)
        .update({
          totalBerat: totalBeratBaru,
          totalHarga: totalHargaBaru,
        })
        .then((response) => {
          // hapus pesanan/keranjang detail
          dispatch(deleteKeranjangDetail(id, keranjangUtama));
        })
        .catch((error) => {
          dispatchError(dispatch, DELETE_KERANJANG, error);
          alert(error);
        });
    }
};

export const deleteKeranjangDetail = (id, keranjangUtama) => dispatch => {
  //loading
    return FIREBASE.database()
      .ref('keranjangs/' + keranjangUtama.user)
      .child('pesanans')
      .child(id)
      .remove()
      .then((response) => {
        dispatchSuccess(dispatch, DELETE_KERANJANG, 'Keranjang Sukses Dihapus');
      })
      .catch((error) => {
        dispatchError(dispatch, DELETE_KERANJANG, error);
        alert(error);
      });
};

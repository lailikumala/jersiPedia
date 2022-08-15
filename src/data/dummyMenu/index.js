import React from 'react';
import { IconChangePassword, IconEditProfile, IconHistory, IconSignOut } from "../../assets";

export const dummyMenu = [
  {
    id: 1,
    nama: 'Ubah Profil',
    gambar: <IconEditProfile />,
    halaman: 'EditProfile'
  },
  {
    id: 2,
    nama: 'Ubah Password',
    gambar: <IconChangePassword />,
    halaman: 'ChangePassword'
  },
  {
    id: 3,
    nama: 'Riwayat Pemesanan',
    gambar: <IconHistory />,
    halaman: 'History'
  },
  {
    id: 4,
    nama: 'Keluar',
    gambar: <IconSignOut />,
    halaman: 'Login'
  },
];
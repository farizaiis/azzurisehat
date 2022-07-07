'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('identitastamus', [
        {
          NoIdentitas: '3674020101960002',
          Nama: 'Agus Supriyana',
          TempatLahir : 'Tangerang',
          TglLahir: '03/02/2006',
          JenisKelamin: 'L',
          Alamat: 'Jl. Sukasuka, RT.007 RW.004, Tangerang Selatan',
          NoHandphone: '085719490099',
          TlpRmh: '0217379755',
          Email: 'aguspriyana@gmail.com',
          KdPropinsi: '08',
          KdKotaKabupaten: '0926',
          KdKecamatan: '092601',
          KdKelurahan: '092601003',
          Kodepos: '15225',
          KdJenisId: '1',
          PhotoDiriKtp: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FDl6oFIjW0AACwKF.jpg%3Alarge&f=1&nofb=1',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          NoIdentitas: '3674020101960001',
          Nama: 'Dedi Supriyana',
          TempatLahir : 'Tangerang',
          TglLahir: '03/02/2006',
          JenisKelamin: 'L',
          Alamat: 'Jl. Sukasuka, RT.007 RW.004, Tangerang Selatan',
          NoHandphone: '085719490099',
          TlpRmh: '0217379755',
          Email: 'dedi@gmail.com',
          KdPropinsi: '08',
          KdKotaKabupaten: '0926',
          KdKecamatan: '092601',
          KdKelurahan: '092601003',
          Kodepos: '15225',
          KdJenisId: '1',
          PhotoDiriKtp: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FDl6oFIjW0AACwKF.jpg%3Alarge&f=1&nofb=1',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          NoIdentitas: '3674090101960002',
          Nama: 'Agus Mahendra',
          TempatLahir : 'Tangerang',
          TglLahir: '03/02/2006',
          JenisKelamin: 'L',
          Alamat: 'Jl. Sukasuka, RT.007 RW.004, Tangerang Selatan',
          NoHandphone: '085719490099',
          TlpRmh: '0217379755',
          Email: 'mahendra@gmail.com',
          KdPropinsi: '08',
          KdKotaKabupaten: '0926',
          KdKecamatan: '092601',
          KdKelurahan: '092601003',
          Kodepos: '15225',
          KdJenisId: '1',
          PhotoDiriKtp: '',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          NoIdentitas: '3674080101960001',
          Nama: 'Raisa Adriana',
          TempatLahir : 'Tangerang',
          TglLahir: '03/02/2006',
          JenisKelamin: 'P',
          Alamat: 'Jl. Sukasuka, RT.007 RW.004, Tangerang Selatan',
          NoHandphone: '085719490099',
          TlpRmh: '0217379755',
          Email: 'raisa@gmail.com',
          KdPropinsi: '08',
          KdKotaKabupaten: '0926',
          KdKecamatan: '092601',
          KdKelurahan: '092601003',
          Kodepos: '15225',
          KdJenisId: '2',
          PhotoDiriKtp: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FDl6oFIjW0AACwKF.jpg%3Alarge&f=1&nofb=1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
    ], {});
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

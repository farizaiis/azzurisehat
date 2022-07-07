
# DietOn

#### TECH STACK USED (Back End)
- Javascript
- NodeJs
- Express
- Moment
- Joi
- Joi/date
- Sequelize
- MySQL

#### HOW TO RUN IN LOCAL
- After clone this repo run npm install
- For create database ---> npx sequelize db:create OR node_modules/.bin/sequelize db:create OR create manual database with name "bukutamu"
- For migrate database ---> npx sequelize db:migrate OR node_modules/.bin/sequelize db:migrate
- For seeding all mock up date ---> npx sequelize db:seed:all OR node_modules/.bin/sequelize db:seed:all

#### HOW TO RUN USING ENDPOIT
- for port is 8000 (basic url is localhost:8000/)

### LIST ENDPOINT BAGIAN
- POST /v1/bagian = Create Bagian Data (body = KodeBagian, NamaBagian, and Keterangan)
- GET /v1/bagian = Read All Bagian Data
- GET /v1/bagian?kode={kode} = Read All Bagian Data Where KodeBagian like {kode}
- GET /v1/bagian?namabagian={namabagian} = Read All Bagian Data Where NamaBagian like {namabagian}
- PUT /v1/bagian/{kodebagian} = Update Bagian Data Where KodeBagian is {kodebagian}
- DELETE /v1/bagian/{kodebagian} = Delete Bagian Data where KodeBagian is {kodebagian}

### LIST ENDPOINT SUBBAGIAN
- POST /v1/subbagian = Create SubBagian Data (body = KodeBagian, KdSubBag, Jabatan and Keterangan)
- GET /v1/subbagian = Read All SubBagian Data
- GET /v1/subbagian?kodebagian={kodebagian} = Read All SubBagian Data Where KodeBagian like {kodebagian}
- GET /v1/subbagian?kodesub={kodesub} = Read All SubBagian Data Where KdSubBag like {kodesub}
- GET /v1/subbagian?jabatan={jabatan} = Read All SubBagian Data Where Jabatan like {jabatan}
- PUT /v1/subbagian/{kdsubbag} = Update SubBagian Data Where KdSubBag is {kdsubbag}
- DELETE /v1/subbagian/{kdsubbag} = Delete SubBagian Data where KdSubBag is {kdsubbag}

### LIST ENDPOINT TIKETANTRIAN
- POST /v1/tiketantrian = Create TiketAntrian Data (body = NoTiket, TglBuatTiket, StatusTiket and StatusCetak)
- GET /v1/tiketantrian = Read All TiketAntrian Data
- GET /v1/tiketantrian?tiket={tiket} = Read All TiketAntrian Data Where NoTiket like {tiket}
- PUT /v1/tiketantrian/{tiket} = Update TiketAntrian Data Where NoTiket is {tiket}
- DELETE /v1/tiketantrian/{tiket} = Delete TiketAntrian Data where NoTiket is {tiket}

### LIST ENDPOINT TIKETTAMU
- POST /v1/tikettamu = Create TiketTamu Data (body = NoTiket, NoIdentitas, KodeBagian, KdSubBag, KeperluanBertamu, TglMintaBertamu, MintaJamBertamu)
- GET /v1/tikettamu = Read All TiketTamu Data
- GET /v1/tikettamu?tiket={tiket} = Read All TiketTamu Data Where NoTiket like {tiket}
- PUT /v1/tikettamu/{tiket} = Update TiketTamu Data Where NoTiket is {tiket}
- DELETE /v1/tikettamu/{tiket} = Delete TiketTamu Data where NoTiket is {tiket}

### LIST ENDPOINT IDENTITASTAMU
- POST /v1/identitastamu = Create IdentitasTamu Data (body = NoIdentitas, Nama, TempatLahir, TglLahir, JenisKelamin, Alamat, NoHandphone, TlpRmh, Email, KdPropinsi, KdKotaKabupaten, KdKecamatan, KdKelurahan, Kodepos, KdJenisId, PhotoDiriKtp)
- GET /v1/identitastamu = Read All TdentitasTamu Data
- GET /v1/identitastamu?identitas={identitas} = Read All IdentitasTamu Data Where NoIdentitas like {identitas}
- GET /v1/identitastamu?nama={nama} = Read All IdentitasTamu Data Where Nama like {nama}
- PUT /v1/identitastamu/{identitas} = Update IdentitasTamu Data Where NoIdentitas is {identitas}
- DELETE /v1/identitastamu/{identitas} = Delete IdentitasTamu Data where NoIdentitas is {identitas}




### ANSWER QUESTION TEST
- 1. Big data adalah kumpulan proses yang terdiri volume data dalam jumlah besar yang terstruktur maupun tidak terstruktur dan digunakan untuk membantu kegiatan bisnis. Big data sendiri merupakan pengembangan dari sistem database pada umumnya. Yang membedakan disini adalah proses kecepatan, volume, dan jenis data yang tersedia lebih banyak dan bervariatif daripada umumnya. Sedangkan NoSQL adalah database yang bersifat non-relasional
- 2. Amazon, Firebase, Cloud SQL by Google, dan Azure
- 3. **Jawaban ada jika melakukan migration dari hasil clone code ini
- 4. **Belum terjawab, code hanya berupa CRUD untuk masing-masing Table
- 5. **bisa menggunakan GET /v1/identitastamu , GET /v1/bagian, GET /v1/subbagian, GET /v1/tikettamu, ataupun GET /v1/tiketantrian
- 6. **bisa menggunakan GET /v1/identitastamu , GET /v1/bagian, GET /v1/subbagian, GET /v1/tikettamu, ataupun GET /v1/tiketantrian. Karna setiap endpoint GET/READ menggunakan eager load
- 7. **bisa menggunakan GET /v1/identitastamu , GET /v1/bagian, GET /v1/subbagian, GET /v1/tikettamu, ataupun GET /v1/tiketantrian. Karna setiap endpoint GET/READ menggunakan eager load
- 8. **bisa menggunakan DELETE /v1/identitastamu/{identitas} , DELETE /v1/bagian/{kode}, DELETE /v1/subbagian/{kdsubbag}, DELETE /v1/tikettamu/{tiket}, ataupun DELETE /v1/tiketantrian/{tiket}
- 9. **bisa menggunakan semua endpoint yang memiliki query params seperty GET /v1/identitastamu?nama={nama}, GET /v1/identitastamu?identitas={identitas}, GET /v1/tikettamu?tiket={tiket}, GET /v1/tiketantrian?tiket={tiket}, GET /v1/bagian?kode={kode}, GET /v1/subbagian?kodesub={kdsubbag}
- 10. **Belum terjawab, karna tidak dapat mengejar waktu untuk mengeksplore dan mengetest API Dukcapil


### ERD
![image](https://user-images.githubusercontent.com/46044060/177676528-2bc1095d-ef73-4173-bbdd-0fdbda456f89.png)


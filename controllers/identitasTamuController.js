const Joi = require('joi');
const { identitastamus, tikettamus } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    createIdentitasTamu: async (req, res) => {
        const body = req.body;
        try {
            const schema = Joi.object({
                NoIdentitas: Joi.string().max(20).required(),
                Nama: Joi.string().max(50).required(),
                TempatLahir: Joi.string().max(25).required(),
                TglLahir: Joi.date().format('D/M/YYYY').required(),
                JenisKelamin: Joi.string().max(1).valid('L', 'P').required(),
                Alamat: Joi.string().max(100).required(),
                NoHandphone: Joi.string().max(15),
                TlpRmh: Joi.string().max(12),
                Email: Joi.string().email({tlds:{allow:false}}).max(50),
                KdPropinsi: Joi.string().max(2).required(),
                KdKotaKabupaten: Joi.string().max(4).required(),
                KdKecamatan: Joi.string().max(6).required(),
                KdKelurahan: Joi.string().max(9).required(),
                KodePos: Joi.string().max(5).required(),
                KdJenisId: Joi.string().max(2).valid('1', '2').required(),
                PhotoDiriKtp: Joi.string(),
            });

            const cekInput = schema.validate(
                {
                    NoIdentitas: body.NoIdentitas,
                    Nama: body.Nama,
                    TempatLahir: body.TempatLahir,
                    TglLahir: body.TglLahir,
                    JenisKelamin: body.JenisKelamin,
                    Alamat: body.Alamat,
                    NoHandphone: body.NoHandphone,
                    TlpRmh: body.TlpRmh,
                    Email: body.Email,
                    KdPropinsi: body.KdPropinsi,
                    KdKotaKabupaten: body.KdKotaKabupaten,
                    KdKecamatan: body.KdKecamatan,
                    KdKelurahan: body.KdKelurahan,
                    KodePos: body.KodePos,
                    KdJenisId: body.KdJenisId,
                    PhotoDiriKtp: body.PhotoDiriKtp,
                },
                { abortEarly: false }
            );

            if (cekInput.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Bad Request',
                    errors: cekInput.error['details'].map(
                        ({ message }) => message
                    ),
                });
            }

            const todayDate = new Date();
            const today = new Date(
                todayDate.getFullYear(),
                todayDate.getMonth(),
                todayDate.getDate()
            );

            const dataDate = new Date(body.TglLahir);
            const cekDate = new Date(
                dataDate.getFullYear(),
                dataDate.getMonth(),
                dataDate.getDate()
            );

            if (cekDate > today) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Invalid date',
                });
            }

            const checkData = await identitastamus.findOne({
                where: { NoIdentitas: body.NoIdentitas },
            });

            if (checkData) {
                return res.status(400).json({
                    status: 'failed',
                    message: "Cannot duplicate data",
                });
            }

            const createData = await identitastamus.create(
                {
                    NoIdentitas: body.NoIdentitas,
                    Nama: body.Nama,
                    TempatLahir: body.TempatLahir,
                    TglLahir: body.TglLahir,
                    JenisKelamin: body.JenisKelamin,
                    Alamat: body.Alamat,
                    NoHandphone: body.NoHandphone,
                    TlpRmh: body.TlpRmh,
                    Email: body.Email,
                    KdPropinsi: body.KdPropinsi,
                    KdKotaKabupaten: body.KdKotaKabupaten,
                    KdKecamatan: body.KdKecamatan,
                    KdKelurahan: body.KdKelurahan,
                    KodePos: body.KodePos,
                    KdJenisId: body.KdJenisId,
                    PhotoDiriKtp: body.PhotoDiriKtp,
                }
            );

            return res.status(200).json({
                status: 'Success',
                message: 'Success create IdentitasTamu data',
                data: createData,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },
    
    readIdentitasTamu: async (req, res) => {
        try {
            const requestByIdentitas = req.query.identitas;
            const requestByName = req.query.nama;

            if(requestByIdentitas) {
                const readAll = await identitastamus.findAll({
                    where: {
                        NoIdentitas: { [Op.like]: '%' + requestByIdentitas + '%' }
                    },
                    include : [
                        {
                            model : tikettamus,
                            as : 'tikettamus'
                        }
                    ]
                });
    
                if(!readAll > 0) {
                    return res.status(404).json({
                        status: 'failed',
                        message: 'Data not found',
                    });
                }

                return res.status(200).json({
                    status: 'success',
                    message: 'Success retrieve IdentitasTamu data',
                    data: readAll,
                });
            } else if(requestByName) {
                const readAll = await identitastamus.findAll({
                    where: {
                        Nama: { [Op.like]: '%' + requestByName + '%' }
                    },
                    include : [
                        {
                            model : tikettamus,
                            as : 'tikettamus'
                        }
                    ]
                });
    
                if(!readAll > 0) {
                    return res.status(404).json({
                        status: 'failed',
                        message: 'Data not found',
                    });
                }

                return res.status(200).json({
                    status: 'success',
                    message: 'Success retrieve IdentitasTamu data',
                    data: readAll,
                });
            } else {
                const readAll = await identitastamus.findAll({
                  include : [
                        {
                            model : tikettamus,
                            as : 'tikettamus'
                        }
                    ]
                });
    
                if(!readAll > 0) {
                    return res.status(404).json({
                        status: 'failed',
                        message: 'Data not found',
                    });
                }

                return res.status(200).json({
                    status: 'success',
                    message: 'Success retrieve IdentitasTamu data',
                    data: readAll,
                });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },

    updateIdentitasTamu: async (req, res) => {
        try {
            const body = req.body;
            let identitas = req.params.identitas;

            const schema = Joi.object({
                Nama: Joi.string().max(50),
                TempatLahir: Joi.string().max(25),
                TglLahir: Joi.date().format('D/M/YYYY'),
                JenisKelamin: Joi.string().max(1).valid('L', 'P'),
                Alamat: Joi.string().max(100),
                NoHandphone: Joi.string().max(15),
                TlpRmh: Joi.string().max(12),
                Email: Joi.string().email({tlds:{allow:false}}).max(50),
                KdPropinsi: Joi.string().max(2),
                KdKotaKabupaten: Joi.string().max(4),
                KdKecamatan: Joi.string().max(6),
                KdKelurahan: Joi.string().max(9),
                KodePos: Joi.string().max(5),
                KdJenisId: Joi.string().max(2).valid('1', '2'),
                PhotoDiriKtp: Joi.string(),
            });

            const cekInput = schema.validate(
                {
                    Nama: body.Nama,
                    TempatLahir: body.TempatLahir,
                    TglLahir: body.TglLahir,
                    JenisKelamin: body.JenisKelamin,
                    Alamat: body.Alamat,
                    NoHandphone: body.NoHandphone,
                    TlpRmh: body.TlpRmh,
                    Email: body.Email,
                    KdPropinsi: body.KdPropinsi,
                    KdKotaKabupaten: body.KdKotaKabupaten,
                    KdKecamatan: body.KdKecamatan,
                    KdKelurahan: body.KdKelurahan,
                    KodePos: body.KodePos,
                    KdJenisId: body.KdJenisId,
                    PhotoDiriKtp: body.PhotoDiriKtp,
                },
                { abortEarly: false }
            );

            if (cekInput.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Bad Request',
                    errors: cekInput.error['details'].map(
                        ({ message }) => message
                    ),
                });
            }

            if(body.TglLahir) {
                const todayDate = new Date();
                const today = new Date(
                    todayDate.getFullYear(),
                    todayDate.getMonth(),
                    todayDate.getDate()
                );
    
                const dataDate = new Date(body.TglLahir);
                const cekDate = new Date(
                    dataDate.getFullYear(),
                    dataDate.getMonth(),
                    dataDate.getDate()
                );
    
                if (cekDate > today) {
                    return res.status(400).json({
                        status: 'failed',
                        message: 'Date already passed',
                    });
                }    
            }

            const getData = await identitastamus.findOne({
                where : { NoIdentitas: identitas }
            })

            if(!getData) {
                return res.status(404).json({
                    status: 'failed',
                    message: "Data not found",
                });
            }

            await identitastamus.update({
                Nama: body.Nama,
                TempatLahir: body.TempatLahir,
                TglLahir: body.TglLahir,
                JenisKelamin: body.JenisKelamin,
                Alamat: body.Alamat,
                NoHandphone: body.NoHandphone,
                TlpRmh: body.TlpRmh,
                Email: body.Email,
                KdPropinsi: body.KdPropinsi,
                KdKotaKabupaten: body.KdKotaKabupaten,
                KdKecamatan: body.KdKecamatan,
                KdKelurahan: body.KdKelurahan,
                KodePos: body.KodePos,
                KdJenisId: body.KdJenisId,
                PhotoDiriKtp: body.PhotoDiriKtp,
            }, { where: { NoIdentitas: identitas }})

            const readOne = identitastamus.findOne({
                where: { NoIdentitas : identitas }
            })

            return res.status(200).json({
                status: 'success',
                message: 'Success update IdentitasTamu data',
                data: readOne,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },

    deleteIdentitasTamu: async (req, res) => {
        try {
            const identitas = req.params.identitas;

            const removeData = await identitastamus.destroy({
                where: {
                    NoIdentitas: identitas
                }
            })

            if(!removeData) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Data not Found',
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Success delete IdentitasTamu data'
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },
};
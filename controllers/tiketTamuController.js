const Joi = require('joi');
const { tikettamus, bagians, subbags, identitastamus } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    createTiketTamu: async (req, res) => {
        const body = req.body;
        try {
            const schema = Joi.object({
                NoTiket: Joi.string().min(14).max(14).required(),
                NoIdentitas: Joi.string().max(20).required(),
                KodeBagian: Joi.string().min(3).max(3).required(),
                KdSubBag: Joi.string().min(6).max(6).required(),
                KeperluanBertamu: Joi.string().max(60).required(),
                TglMintaBertamu: Joi.date().format('D/M/YYYY').required(),
                MintaJamBertamu: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required()
            });

            const cekInput = schema.validate(
                {
                    NoTiket: body.NoTiket,
                    NoIdentitas: body.NoIdentitas,
                    KodeBagian: body.KodeBagian,
                    KdSubBag: body.KdSubBag,
                    KeperluanBertamu: body.KeperluanBertamu,
                    TglMintaBertamu: body.TglMintaBertamu,
                    MintaJamBertamu: body.MintaJamBertamu,
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

            const dataDate = new Date(body.TglMintaBertamu);
            const cekDate = new Date(
                dataDate.getFullYear(),
                dataDate.getMonth(),
                dataDate.getDate()
            );

            if (cekDate < today) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Date already passed',
                });
            }

            const checkData = await tikettamus.findOne({
                where: { NoTiket: body.NoTiket },
            });

            if (checkData) {
                return res.status(400).json({
                    status: 'failed',
                    message: "Cannot duplicate data",
                });
            }

            const checkTamu = await identitastamus.findOne({
                where : { NoIdentitas: body.NoIdentitas}
            })

            const checkBagian = await bagians.findOne({
                where : { KodeBagian: body.KodeBagian }
            })

            const checkSubBagian = await subbags.findOne({
                where : { KdSubBag: body.KdSubBag }
            })

            if(!checkTamu || !checkBagian || !checkSubBagian) {
                return res.status(404).json({
                    status: 'failed',
                    message: "Data not found",
                });
            }

            const createData = await tikettamus.create(
                {
                    NoTiket: body.NoTiket,
                    NoIdentitas: body.NoIdentitas,
                    KodeBagian: body.KodeBagian,
                    KdSubBag: body.KdSubBag,
                    KeperluanBertamu: body.KeperluanBertamu,
                    TglMintaBertamu: body.TglMintaBertamu,
                    MintaJamBertamu: body.MintaJamBertamu,
                }
            );

            return res.status(200).json({
                status: 'Success',
                message: 'Success create TiketTamu data',
                data: createData,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },
    
    readTiketTamu: async (req, res) => {
        try {
            const requestByTiket = req.query.tiket;

            if(requestByTiket) {
                const readAll = await tikettamus.findAll({
                    where: {
                        NoTiket: { [Op.like]: '%' + requestByTiket + '%' }
                    },
                    include: [
                        {
                            model: identitastamus
                        },
                        {
                            model: bagians
                        },
                        {
                            model: subbags
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
                    message: 'Success retrieve TiketTamu data',
                    data: readAll,
                });
            } else {
                const readAll = await tikettamus.findAll({
                    include: [
                        {
                            model: identitastamus
                        },
                        {
                            model: bagians
                        },
                        {
                            model: subbags
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
                    message: 'Success retrieve TiketTamu data',
                    data: readAll,
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },

    updateTiketTamu: async (req, res) => {
        try {
            const body = req.body;
            let tiket = req.params.tiket.toUpperCase();

            const schema = Joi.object({
                NoIdentitas: Joi.string().max(20),
                KodeBagian: Joi.string().min(3).max(3),
                KdSubBag: Joi.string().min(6).max(6),
                KeperluanBertamu: Joi.string().max(60),
                TglMintaBertamu: Joi.date().format('D/M/YYYY'),
                MintaJamBertamu: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/)
            });

            const cekInput = schema.validate(
                {
                    NoIdentitas: body.NoIdentitas,
                    KodeBagian: body.KodeBagian,
                    KdSubBag: body.KdSubBag,
                    KeperluanBertamu: body.KeperluanBertamu,
                    TglMintaBertamu: body.TglMintaBertamu,
                    MintaJamBertamu: body.MintaJamBertamu,
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

            if(body.TglMintaBertamu) {
                const todayDate = new Date();
                const today = new Date(
                    todayDate.getFullYear(),
                    todayDate.getMonth(),
                    todayDate.getDate()
                );

                const dataDate = new Date(body.TglMintaBertamu);
                const cekDate = new Date(
                    dataDate.getFullYear(),
                    dataDate.getMonth(),
                    dataDate.getDate()
                );

                if (cekDate < today) {
                    return res.status(400).json({
                        status: 'failed',
                        message: 'Date already passed',
                    });
                }
            }

            const getData = await tikettamus.findOne({
                where : { NoTiket: tiket }
            })

            if(!getData) {
                return res.status(404).json({
                    status: 'failed',
                    message: "Data not found",
                });
            }

            if(body.NoIdentitas) {
                const checkTamu = await identitastamus.findOne({
                    where : { NoIdentitas: body.NoIdentitas}
                })

                if(!checkTamu) {
                    return res.status(404).json({
                        status: 'failed',
                        message: "Data not found",
                    });
                }
            }

            if(body.checkBagian) {
                const checkBagian = await bagians.findOne({
                    where : { KodeBagian: body.KodeBagian }
                })

                if(!checkBagian) {
                    return res.status(404).json({
                        status: 'failed',
                        message: "Data not found",
                    });
                }
            }
            
            if(body.checkSubBagian) {
                const checkSubBagian = await subbags.findOne({
                    where : { KdSubBag: body.KdSubBag }
                })

                if(!checkSubBagian) {
                    return res.status(404).json({
                        status: 'failed',
                        message: "Data not found",
                    });
                }
            }

            await tikettamus.update({
                NoIdentitas: body.NoIdentitas,
                KodeBagian: body.KodeBagian,
                KdSubBag: body.KdSubBag,
                KeperluanBertamu: body.KeperluanBertamu,
                TglMintaBertamu: body.TglMintaBertamu,
                MintaJamBertamu: body.MintaJamBertamu,
            }, { where: { NoTiket: tiket }})

            const readOne = tikettamus.findOne({
                where: { NoTiket : tiket }
            })

            return res.status(200).json({
                status: 'success',
                message: 'Success update TiketTamu data',
                data: readOne,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },

    deleteTiketTamu: async (req, res) => {
        try {
            const tiket = req.params.tiket.toUpperCase();

            const removeData = await tikettamus.destroy({
                where: {
                    NoTiket: tiket
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
                message: 'Success delete TiketTamu data'
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },
};
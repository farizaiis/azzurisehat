const Joi = require('joi');
const { bagians, subbags } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    createBagian: async (req, res) => {
        const body = req.body;
        try {
            const schema = Joi.object({
                KodeBagian: Joi.string().min(3).max(3).required(),
                NamaBagian: Joi.string().max(60).required(),
                Keterangan: Joi.string().max(60)
            });

            const cekInput = schema.validate(
                {
                    KodeBagian: body.KodeBagian,
                    NamaBagian: body.NamaBagian,
                    Keterangan: body.Keterangan,
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

            const checkData = await bagians.findOne({
                where: {
                    [Op.or]: [
                        { KodeBagian: body.KodeBagian },
                        { NamaBagian: body.NamaBagian }
                    ]
                },
            });

            if (checkData) {
                return res.status(400).json({
                    status: 'failed',
                    message: "Cannot duplicate data",
                });
            }

            const createData = await bagians.create(
                {
                    KodeBagian: body.KodeBagian,
                    NamaBagian: body.NamaBagian,
                    Keterangan: body.Keterangan
                }
            );

            return res.status(200).json({
                status: 'Success',
                message: 'Success create Bagian data',
                data: createData,
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },
    
    readBagian: async (req, res) => {
        try {
            const requestByKode = req.query.kode

            const requestByName = req.query.namabagian

            if(requestByKode) { 
                let readAll = await bagians.findAll({
                    where: {
                        KodeBagian: { [Op.like]: '%' + requestByKode + '%'}
                    },
                    include: [
                        {
                            model: subbags,
                            as: 'subbags'
                        }
                    ],
                });

                if(!readAll > 0) {
                    return res.status(404).json({
                        status: 'failed',
                        message: 'Data not found',
                    });
                }
    
                return res.status(200).json({
                    status: 'success',
                    message: 'Success retrieve Bagian data',
                    data: readAll,
                });
            } else if (requestByName) {
                let readAll = await bagians.findAll({
                    where: {
                        NamaBagian: { [Op.like]: '%' + requestByName + '%'}
                    },
                    include: [
                        {
                            model: subbags,
                            as: 'subbags'
                        }
                    ],
                });

                if(!readAll > 0) {
                    return res.status(404).json({
                        status: 'failed',
                        message: 'Data not found',
                    });
                }
    
                return res.status(200).json({
                    status: 'success',
                    message: 'Success retrieve Bagian data',
                    data: readAll,
                });
            } else {
                let readAll = await bagians.findAll({
                    include: [
                        {
                            model: subbags,
                            as: 'subbags'
                        }
                    ],
                });

                if(!readAll > 0) {
                    return res.status(404).json({
                        status: 'failed',
                        message: 'Data not found',
                    });
                }
    
                return res.status(200).json({
                    status: 'success',
                    message: 'Success retrieve Bagian data',
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

    updateBagian: async (req, res) => {
        try {
            const body = req.body;
            let kode = req.params.kode.toUpperCase();

            const schema = Joi.object({
                NamaBagian: Joi.string().max(60),
                Keterangan: Joi.string().max(60)
            });

            const cekInput = schema.validate(
                {
                    NamaBagian: body.NamaBagian,
                    Keterangan: body.Keterangan,
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

            const getData = await bagians.findOne({
                where : { KodeBagian: kode}
            })

            if(!getData) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Data not Found',
                });
            }

            let temp = []

            if(body.NamaBagian) {
                temp.push({NamaBagian: body.NamaBagian})

                const checkData = await bagians.findOne({
                    where: {
                        [Op.or]: temp
                    },
                });
                
                if (checkData) {
                    return res.status(400).json({
                        status: 'failed',
                        message: "Cannot duplicate data",
                    });
                }
            }

            await bagians.update({
                NamaBagian: body.NamaBagian,
                Keterangan: body.Keterangan,
            }, { where: { KodeBagian: kode }})

            const readOne = bagians.findOne({
                where: { KodeBagian : kode }
            })

            return res.status(200).json({
                status: 'success',
                message: 'Success update Bagian data',
                data: readOne,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },

    deleteBagian: async (req, res) => {
        try {
            const kode = req.params.kode.toUpperCase();

            const removeData = await bagians.destroy({
                where: {
                    KodeBagian: kode
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
                message: 'Success delete Bagian data'
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },
};
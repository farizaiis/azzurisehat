const Joi = require('joi');
const { subbags, bagians } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    createSubBagian: async (req, res) => {
        const body = req.body;
        try {
            const schema = Joi.object({
                KodeBagian: Joi.string().min(3).max(3).required(),
                KdSubBag: Joi.string().min(6).max(6).required(),
                Jabatan: Joi.string().max(60).required(),
                Keterangan: Joi.string().max(60)
            });

            const cekInput = schema.validate(
                {
                    KodeBagian: body.KodeBagian,
                    KdSubBag: body.KdSubBag,
                    Jabatan: body.Jabatan,
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

            const checkBagian = await bagians.findOne({
                where : { KodeBagian : body.KodeBagian }
            })

            if(!checkBagian) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Data not Found',
                });
            }

            const checkData = await subbags.findOne({
                where: {
                    [Op.or]: [
                        { KdSubBag: body.KdSubBag },
                        { KdSubBag: body.KdSubBag, Jabatan: body.Jabatan }
                    ]
                },
            });

            if (checkData) {
                return res.status(400).json({
                    status: 'failed',
                    message: "Cannot duplicate data",
                });
            }

            const createData = await subbags.create(
                {
                    KodeBagian: body.KodeBagian,
                    KdSubBag: body.KdSubBag,
                    Jabatan: body.Jabatan,
                    Keterangan: body.Keterangan
                }
            );

            return res.status(200).json({
                status: 'Success',
                message: 'Success create SubBagian data',
                data: createData,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },
    
    readSubBagian: async (req, res) => {
        try {
            const requestByKodeBagian = req.query.kodebagian;
            const requestByKodeSub = req.query.kodesub;
            const requestByJabatan = req.query.jabatan;

            if(requestByKodeBagian) {
                const readAll = await subbags.findAll({
                    where: { 
                        KodeBagian: { [Op.like]: '%' + requestByKodeBagian + '%' }  
                    },
                    include: [
                        {
                            model: bagians
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
                    message: 'Success retrieve SubBagian data',
                    data: readAll,
                });
            } else if (requestByJabatan) {
                const readAll = await subbags.findAll({
                    where: { 
                        Jabatan: { [Op.like]: '%' + requestByJabatan + '%' }  
                    },
                    include: [
                        {
                            model: bagians
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
                    message: 'Success retrieve SubBagian data',
                    data: readAll,
                });
            } else if (requestByKodeSub) {
                const readAll = await subbags.findAll({
                    where: { 
                        KdSubBag: { [Op.like]: '%' + requestByKodeSub + '%' }  
                    },
                    include: [
                        {
                            model: bagians
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
                    message: 'Success retrieve SubBagian data',
                    data: readAll,
                });
            } else {
                const readAll = await subbags.findAll({
                    include: [
                        {
                            model: bagians
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
                    message: 'Success retrieve SubBagian data',
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

    updateSubBagian: async (req, res) => {
        try {
            const body = req.body;
            let kode = req.params.kode.toUpperCase();

            const schema = Joi.object({
                KodeBagian: Joi.string().min(3).max(3),
                Jabatan: Joi.string().max(60),
                Keterangan: Joi.string().max(60)
            });

            const cekInput = schema.validate(
                {
                    KodeBagian: body.KodeBagian,
                    Jabatan: body.Jabatan,
                    Keterangan: body.Keterangan
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

            const getData = await subbags.findOne({
                where : { KdSubBag: kode}
            })

            if(!getData) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Data not Found',
                });
            }

            let temp = []

            if(body.Jabatan) {
                temp.push({ KdSubBag: getData.dataValues.KdSubBag, Jabatan: body.Jabatan })

                const checkData = await subbags.findOne({
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
            
            

            if(body.KodeBagian) {
                const checkBagian = await bagians.findOne({
                    where : { KodeBagian : body.KodeBagian }
                })
    
                if(!checkBagian) {
                    return res.status(404).json({
                        status: 'failed',
                        message: 'Data not Found',
                    });
                }
            }

            await subbags.update({
                KodeBagian: body.KodeBagian,
                Jabatan: body.Jabatan,
                Keterangan: body.Keterangan
            }, { where: { KodeBagian: kode }})

            const readOne = subbags.findOne({
                where: { KdSubBag : kode }
            })

            return res.status(200).json({
                status: 'success',
                message: 'Success update SubBagian data',
                data: readOne,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },

    deleteSubBagian: async (req, res) => {
        try {
            const kode = req.params.kode.toUpperCase();

            const removeData = await subbags.destroy({
                where: {
                    KdSubBag: kode
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
                message: 'Success delete SubBagian data'
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },
};
const Joi = require('joi');
const { tiketantrians } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    createTiketAntrian: async (req, res) => {
        const body = req.body;
        try {
            const schema = Joi.object({
                NoTiket: Joi.string().min(14).max(14).required(),
                TglBuatTiket: Joi.date().format('D/M/YYYY hh:mm:ss').required(),
                StatusTiket: Joi.string().valid('Berlaku', 'Kadaluarsa').default('Berlaku'),
                StatusCetak: Joi.string().valid('False', 'True').default('False')
            });

            const cekInput = schema.validate(
                {
                    NoTiket: body.NoTiket,
                    TglBuatTiket: body.TglBuatTiket,
                    StatusTiket: body.StatusTiket,
                    StatusCetak: body.StatusCetak,
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

            const dataDate = new Date(body.TglBuatTiket);
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

            const checkData = await tiketantrians.findOne({
                where: { NoTiket: body.NoTiket },
            });

            if (checkData) {
                return res.status(400).json({
                    status: 'failed',
                    message: "Cannot duplicate data",
                });
            }

            const createData = await tiketantrians.create(
                {
                    NoTiket: body.NoTiket,
                    TglBuatTiket: body.TglBuatTiket,
                    StatusTiket: body.StatusTiket,
                    StatusCetak: body.StatusCetak,
                }
            );

            return res.status(200).json({
                status: 'Success',
                message: 'Success create TiketAntrian data',
                data: createData,
            });
        } catch (error) {
            if (
                error.name === 'SequelizeDatabaseError' &&
                error.parent.routine === 'enum_in'
            ) {
                return res
                    .status(400)
                    .json({
                        status: 'failed',
                        message:
                            'Berlaku or Kadaluarsa only for StatusTiket and True or False only for StatusCetak',
                    });
            }

            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },
    
    readTiketAntrian: async (req, res) => {
        try {
            const requestByTiket = req.query.tiket;

            if(requestByTiket) {
                const readAll = await users.findAll({
                    where: {
                        NoTiket: { [Op.like]: '%' + requestByTiket + '%' }
                    }
                });
    
                if(!readAll > 0) {
                    return res.status(404).json({
                        status: 'failed',
                        message: 'Data not found',
                    });
                }
    
                return res.status(200).json({
                    status: 'success',
                    message: 'Success retrieve TiketAntrian data',
                    data: readAll,
                });
            } else {
                const readAll = await users.findAll();
    
                if(!readAll > 0) {
                    return res.status(404).json({
                        status: 'failed',
                        message: 'Data not found',
                    });
                }
    
                return res.status(200).json({
                    status: 'success',
                    message: 'Success retrieve TiketAntrian data',
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

    updateTiketAntrian: async (req, res) => {
        try {
            const body = req.body;
            let tiket = req.params.tiket.toUpperCase();

            const schema = Joi.object({
                TglBuatTiket: Joi.date().format('D/M/YYYY hh:mm:ss'),
                StatusTiket: Joi.string(),
                StatusCetak: Joi.string()
            });

            const cekInput = schema.validate(
                {
                    TglBuatTiket: body.TglBuatTiket,
                    StatusTiket: body.StatusTiket,
                    StatusCetak: body.StatusCetak,
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

            if(body.TglBuatTiket) {
                const todayDate = new Date();
                const today = new Date(
                    todayDate.getFullYear(),
                    todayDate.getMonth(),
                    todayDate.getDate()
                );
    
                const dataDate = new Date(body.TglBuatTiket);
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

            const getData = await tiketantrians.findOne({
                where : { NoTiket: tiket }
            })

            if(!getData) {
                return res.status(404).json({
                    status: 'failed',
                    message: "Data not found",
                });
            }

            await tiketantrians.update({
                TglBuatTiket: body.TglBuatTiket,
                StatusTiket: body.StatusTiket,
                StatusCetak: body.StatusCetak,
            }, { where: { NoTiket: tiket }})

            const readOne = tiketantrians.findOne({
                where: { NoTiket : tiket }
            })

            return res.status(200).json({
                status: 'success',
                message: 'Success update TiketAntrian data',
                data: readOne,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },

    deleteTiketAntrian: async (req, res) => {
        try {
            const tiket = req.params.tiket.toUpperCase();

            const removeData = await tiketantrians.destroy({
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
                message: 'Success delete TiketAntrian data'
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },
};
const express = require('express');
const router = express.Router();
const identitastamu = require('./identitasTamuRouter');
const bagian = require('./bagianRouter');
const subbagian = require('./subBagRouter');
const tikettamu = require('./tiketTamuRouter');
const tiketantrian = require('./tiketAntrianRouter');

router.use('/tiketantrian', tiketantrian);
router.use('/tikettamu', tikettamu);
router.use('/identitastamu', identitastamu);
router.use('/subbagian', subbagian);
router.use('/bagian', bagian);

module.exports = router;

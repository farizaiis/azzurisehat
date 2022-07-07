const express = require('express');
const router = express.Router();
const tiketAntrian = require('../controllers/tiketAntrianController');


router.post('/', tiketAntrian.createTiketAntrian);
router.get('/', tiketAntrian.readTiketAntrian);
router.put('/:tiket', tiketAntrian.updateTiketAntrian);
router.delete('/:tiket', tiketAntrian.deleteTiketAntrian);

module.exports = router;

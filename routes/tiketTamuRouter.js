const express = require('express');
const router = express.Router();
const tiketTamu = require('../controllers/tiketTamuController');


router.post('/', tiketTamu.createTiketTamu);
router.get('/', tiketTamu.readTiketTamu);
router.put('/:tiket', tiketTamu.updateTiketTamu);
router.delete('/:tiket', tiketTamu.deleteTiketTamu);

module.exports = router;
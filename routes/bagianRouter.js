const express = require('express');
const router = express.Router();
const bagian = require('../controllers/bagianController');


router.post('/', bagian.createBagian);
router.get('/', bagian.readBagian);
router.put('/:kode', bagian.updateBagian);
router.delete('/:kode', bagian.deleteBagian);

module.exports = router;

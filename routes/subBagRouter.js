const express = require('express');
const router = express.Router();
const subBagian = require('../controllers/subBagController');


router.post('/', subBagian.createSubBagian);
router.get('/', subBagian.readSubBagian);
router.put('/:kode', subBagian.updateSubBagian);
router.delete('/:kode', subBagian.deleteSubBagian);

module.exports = router;

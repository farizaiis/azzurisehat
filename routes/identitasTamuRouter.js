const express = require('express');
const router = express.Router();
const identitasTamu = require('../controllers/identitasTamuController');


router.post('/', identitasTamu.createIdentitasTamu);
router.get('/', identitasTamu.readIdentitasTamu);
router.put('/:identitas', identitasTamu.updateIdentitasTamu);
router.delete('/:identitas', identitasTamu.deleteIdentitasTamu);

module.exports = router;
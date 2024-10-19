const express = require('express');
const Esport = require('../models/esports');
const {getEsports, getEsport, createEsport, updateEsport, deleteEsport} = require('../controllers/esportController')

const router = express.Router();

router.post('/',createEsport)

router.get('/',getEsports);

router.get('/:id',getEsport)

router.put('/:id',updateEsport)

router.delete('/:id',deleteEsport)

module.exports = router;
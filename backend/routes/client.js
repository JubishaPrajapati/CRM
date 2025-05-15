const express = require('express');
const router = express.Router();
const { createClient, getClients, getClientById, getClientCount, updateClient, deleteClient } = require('../controllers/client');
const { get } = require('mongoose');

router.post('/', createClient);
router.get('/', getClients);
router.get('/clientCount', getClientCount);
router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;


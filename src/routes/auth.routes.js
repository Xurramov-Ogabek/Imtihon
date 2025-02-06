const express = require('express');
const { register, login, deleteUser, getUsers } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/delete/:id', deleteUser);
router.get('/users', getUsers);

module.exports = router;
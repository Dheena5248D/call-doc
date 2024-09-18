const express = require('express');
const router = express.Router();

const {registerDoc, loginDoc, registerUser, loginUser}  = require('../controllers/authController');

router.post('/registerdoc', registerDoc);
router.post('/logindoc', loginDoc);
router.post('/registeruser', registerUser);
router.post('/loginuser', loginUser);

module.exports = router;
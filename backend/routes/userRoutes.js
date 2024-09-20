const express = require('express');
const router = express.Router();

const {getDocs, setAppointment, getBooked} = require('../controllers/userController');

router.get('/getdocs', getDocs);
router.post('/setappointment', setAppointment)
router.get('/getbooked', getBooked)


module.exports = router;

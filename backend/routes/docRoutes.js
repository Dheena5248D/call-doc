const express = require('express');
const { setSlots, getBookedUsers } = require('../controllers/docController'); 
const router = express.Router();

router.post('/addslot', setSlots);
router.get('/getbookeduser', getBookedUsers);

module.exports = router;

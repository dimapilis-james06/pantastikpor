const express = require('express');
const router = express.Router();
const attendeesController = require('../controllers/attendeesController');


router.get('/', attendeesController.getAllAttendees);


router.get('/:id', attendeesController.getAttendeeById);

router.post('/', attendeesController.createAttendee);

router.put('/:id', attendeesController.updateAttendee);

module.exports = router;

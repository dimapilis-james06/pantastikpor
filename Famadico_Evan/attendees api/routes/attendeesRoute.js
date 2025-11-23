const express = require('express');
const router = express.Router();
const attendeesController = require('../controllers/attendeesController');

// GET all attendees
router.get('/', attendeesController.getAllAttendees);

// GET attendee by ID
router.get('/:id', attendeesController.getAttendeeById);

// CREATE attendee
router.post('/', attendeesController.createAttendee);

// UPDATE attendee
router.put('/:id', attendeesController.updateAttendee);

// DELETE attendee
router.delete('/:id', attendeesController.deleteAttendee);


module.exports = router;

const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/eventAnnouncementController');

// CRUD routes
router.get('/', announcementController.getAllAnnouncements);

router.get('/:id', announcementController.getAnnouncementById);

router.post('/', announcementController.createAnnouncement);

router.put('/:id', announcementController.updateAnnouncement);

router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;
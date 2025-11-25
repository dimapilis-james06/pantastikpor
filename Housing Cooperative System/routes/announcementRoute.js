const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');


router.get('/', announcementController.getAllAnnouncements);

router.get('/type/:type', announcementController.getAnnouncementsByType);


router.get('/:id', announcementController.getAnnouncementById);

router.post('/', announcementController.createAnnouncement);

router.put('/:id', announcementController.updateAnnouncement);




module.exports = router;
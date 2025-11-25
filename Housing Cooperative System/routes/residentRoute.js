const express = require('express');
const router = express.Router();
const residentController = require('../controllers/residentController');

router.get('/removed', residentController.getRemovedResidents);


router.put('/removed/:id', residentController.removeResident);

router.get('/status/:status', residentController.getResidentByStatus);


router.post('/', residentController.createResident);


router.put('/:id', residentController.updateResident);

router.get('/', residentController.getAllResidents);


router.get('/:id', residentController.getResidentById);

module.exports = router;





const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');


router.get('/', maintenanceController.getAllRequests);

router.get('/filter', maintenanceController.filterRequests);


router.get('/:id', maintenanceController.getRequestById);


router.post('/', maintenanceController.createRequest);


router.put('/:id', maintenanceController.updateRequestStatus);



module.exports = router;

const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');

// GET /api/maintenance - Get all maintenance requests
router.get('/', maintenanceController.getAllRequests);


// GET /api/maintenance/:id - Get a request by ID
router.get('/:id', maintenanceController.getRequestById);

// POST /api/maintenance - Create new maintenance request
router.post('/', maintenanceController.createRequest);

// PUT /api/maintenance/:id - Update a maintenance request (status, progress, etc.)
router.put('/:id', maintenanceController.updateRequestStatus);

module.exports = router;

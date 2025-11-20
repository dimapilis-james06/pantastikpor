const express = require('express');
const router = express.Router();
const residentController = require('../controllers/residentController');

// GET /api/residents - Get all residents
router.get('/', residentController.getAllResidents);

router.get('/status/:status', residentController.getResidentByStatus);

// GET /api/residents/:id - Get residents by ID
router.get('/:id', residentController.getResidentById);

// POST /api/residents - Create new residents
router.post('/', residentController.createResident);

// PUT /api/residents/:id - Update new residents
router.put('/:id', residentController.updateResident);

// DELETE /api/residents/:id - Delete residents
router.delete('/:id', residentController.deleteResident);

module.exports = router;





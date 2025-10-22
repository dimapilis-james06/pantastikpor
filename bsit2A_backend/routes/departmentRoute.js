const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// GET /api/students - Get all students
router.get('/', departmentController.getAllDepartment);

module.exports = router;
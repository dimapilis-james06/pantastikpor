const Maintenance = require('../models/maintenanceModel');

const maintenanceController = {

  // Get all maintenance requests
  getAllRequests: async (req, res) => {
    try {
      const requests = await Maintenance.getAll();

      res.json({
        success: true,
        data: requests
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching maintenance requests',
        error: error.message
      });
    }
  },

  // Get one request by ID
  getRequestById: async (req, res) => {
    try {
      const request = await Maintenance.getById(req.params.id);

      if (!request) {
        return res.status(404).json({
          success: false,
          message: 'Maintenance request not found'
        });
      }

      res.json({
        success: true,
        data: request
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching maintenance request',
        error: error.message
      });
    }
  },

  // Create a new maintenance request
  createRequest: async (req, res) => {
    try {
      const { resident_id, title, description, priority , status } = req.body;

      // Validation
      if (!resident_id || !title || !description || !priority || !status) {
        return res.status(400).json({
          success: false,
          message: 'All fields (resident_id, title, description, priority, status) are required'
        });
      }

      const newRequest = await Maintenance.create({
        resident_id,
        title,
        description,
        priority,
        status
      });

      res.status(201).json({
        success: true,
        message: 'Maintenance request submitted successfully',
        data: newRequest
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error submitting maintenance request',
        error: error.message
      });
    }
  },

  // Update status
  updateRequestStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const requestId = req.params.id;

      // Validate required fields
      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Status field is required'
        });
      }

      // Check if request exists
      const existingRequest = await Maintenance.getById(requestId);
      if (!existingRequest) {
        return res.status(404).json({
          success: false,
          message: 'Maintenance request not found'
        });
      }

      await Maintenance.updateStatus(requestId, status);

      res.json({
        success: true,
        message: 'Status updated successfully'
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating maintenance status',
        error: error.message
      });
    }
  },

  updateResident: async (req, res) => {
    try {
      const id = req.params.id;
      const { firstName, lastName, phone, unitNum, status } = req.body;

      // Validation: required fields
      if (!firstName || !lastName || !phone || !unitNum || !status) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      const updatedResident = await Resident.update(id, req.body);

      res.status(200).json({
        success: true,
        message: "Resident updated successfully",
        data: updatedResident,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};

module.exports = maintenanceController;

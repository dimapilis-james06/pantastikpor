const Maintenance = require('../models/maintenanceModel');

const maintenanceController = {

 
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

  createRequest: async (req, res) => {
    try {
      const { residentID, title, description, priority , status } = req.body;

     
      if (!residentID || !title || !description || !priority || !status) {
        return res.status(400).json({
          success: false,
          message: 'All fields (residentID, title, description, priority, status) are required'
        });
      }

      const allowedStatus = ['Pending' , 'Completed'];
      const allowedPriority = ['High' , 'Medium' , 'Low'];

       if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Allowed: Pending, Completed'
        });
      }
      if (!allowedPriority.includes(priority)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid priority. Allowed: High, Medium, Low'
        });
      }

      const newRequest = await Maintenance.create({
        residentID,
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

  updateRequestStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const requestId = req.params.id;

      const allowedStatus = ['Pending' , 'Completed'];

      
      if (!status || !allowedStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Allowed: Pending, Completed'
        });
      }

      
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

   filterRequests: async (req, res) => {
    try {
      const { status, priority } = req.query;

      const allowedStatus = ['Pending', 'Completed'];
      const allowedPriority = ['High', 'Medium', 'Low'];

    
      if (status && !allowedStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Allowed: Pending, Completed'
        });
      }
      if (priority && !allowedPriority.includes(priority)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid priority. Allowed: High, Medium, Low'
        });
      }

      const requests = await Maintenance.getByStatusAndPriority(status, priority);

      res.json({
        success: true,
        data: requests
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error filtering maintenance requests',
        error: error.message
      });
    }
  }
};

module.exports = maintenanceController;

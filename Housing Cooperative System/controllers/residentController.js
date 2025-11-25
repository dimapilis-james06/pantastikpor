const Resident = require('../models/residentModel');

const residentController = {

    
    getAllResidents: async (req, res) => {
        try {
            const residents = await Resident.getAll();

            res.json({
            success: true,
            data: residents
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching Residents',
                error: error.message
            });
        }
    },

    getResidentById: async (req, res) => {
        try {
            const residents = await Resident.getById(req.params.id);
            if (!residents) {
                return res.status(404).json({
                    success: false,
                    message: 'Resident not found'
                });
            }
            res.json({
                success: true,
                data: residents
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching resident',
                error: error.message
            });
        }
    },

    
    createResident: async (req, res) => {
        try {
            const { firstName, lastName, phoneNumber, unitNumber, status } = req.body;

            // Validation
            if (!firstName || !lastName || !phoneNumber || !unitNumber || !status) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields (firstName, lastName, phoneNumber, unitNumber, status) are required'
                });
            }

            const newResident = await Resident.create({
                firstName,
                lastName,
                phoneNumber,
                unitNumber,
                status
            });

            res.status(201).json({
                success: true,
                message: 'Resident created successfully',
                data: newResident
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating resident',
                error: error.message
            });
        }
    },
   
    updateResident: async (req, res) => {
        try { 
            const { firstName, lastName, phoneNumber, unitNumber, status } = req.body;
            const residentId = req.params.id;

           
            const existingResident = await Resident.getById(residentId)
            if(!existingResident) {
                return res.status(404).json({
                    success: false,
                    message: 'Resident not found'
                });
            }

         
            if (!firstName || !lastName || !phoneNumber || !unitNumber || !status) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields (firstName, lastName, phoneNumber, unitNumber, status) are required' 
                });
            }
            
            await Resident.update(residentId, {
                firstName,
                lastName,
                phoneNumber,
                unitNumber,
                status
            });

            res.json({
                success: true,
                message: 'Resident updated successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating resident',
                error: error.message
            });
        }
    },


    removeResident: async (req, res) => {
        try {
            const residentId = req.params.id;

            const existingResident = await Resident.getById(residentId);
            if (!existingResident) {
                return res.status(404).json({
                    success: false,
                    message: 'Resident not found'
                });
            }

            await Resident.remove(residentId);

            res.json({
                success: true,
                message: 'Resident removed successfully'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error removing resident',
                error: error.message
            });
        }
    },

    
    getResidentByStatus: async (req, res) => {
        try {
            const { status } = req.params;
            const residents = await Resident.getByStatus(status);

            res.json({
                success: true,
                data: residents
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching residents by status',
                error: error.message
            });
        }
    },

    getRemovedResidents: async (req, res) => {
      try {
          const residents = await Resident.getByStatus("Removed");

          res.json({
              success: true,
              data: residents
          });
      } catch (error) {
          res.status(500).json({
              success: false,
              message: 'Error fetching removed residents',
              error: error.message
          });
        }
    }     
};

module.exports = residentController;
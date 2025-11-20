const Resident = require('../models/residentModel');

const residentController = {

    // Get all Residents
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
                message: 'Error fetching residents',
                errors: error.message
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

    // Create new resident
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
    // Update resident
    updateResident: async (req, res) => {
        try { 
            const { firstName, lastName, phoneNumber, unitNumber, status } = req.body;
            const residentId = req.params.id;

            // This checks if the resident exists
            const existingResident = await Resident.getById(residentId)
            if(!existingResident) {
                return res.status(404).json({
                    success: false,
                    message: 'Resident not found'
                });
            }

            // Validation
            if (!firstName || !lastName || !phoneNumber || !unitNumber || !status) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields (firstName, lastName, phoneNumber, unitNumber, status) are required' 
                });
            }
            
            await Admin.update(residentId, {
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


    // REMOVES RESIDENTS
    deleteResident: async (req, res) => {
        try {
            const residentId = req.params.id;

            // This checks if the resident exists
            const existingResident = await Resident.getById(residentId);
            if (!existingResident) {
                return res.status(404).json({
                    success: false,
                    message: 'Resident not found'
                });
            }

            await Resident.delete(residentId);

            res.json({
                success: true,
                message: 'Resident deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting student',
                error: error.message
            });
        }
    },

    // Get the residents by status
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
    }
};

module.exports = residentController;
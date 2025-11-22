const Announcement = require('../models/eventAnnouncementModel');

const announcementController = {
  validTypes: ['Meeting', 'Notice'],

  // GET all
  getAllAnnouncements: async (req, res) => {
    try {
      const data = await Announcement.getAll();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching announcements', error: error.message });
    }
  },

  // GET by ID
  getAnnouncementById: async (req, res) => {
    try {
      const { id } = req.params;
      const announcement = await Announcement.getById(id);
      if (!announcement) return res.status(404).json({ success: false, message: 'Announcement not found' });

      res.json({ success: true, data: announcement });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching announcement', error: error.message });
    }
  },

  // CREATE
  createAnnouncement: async (req, res) => {
    try {
      const { title, description, type, dateTime, createdBy } = req.body;

      // Validation
      if (!title || !description || !type || !dateTime || !createdBy) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
      if (!announcementController.validTypes.includes(type)) {
        return res.status(400).json({ success: false, message: 'Type must be either "Meeting" or "Notice"' });
      }

      const newItem = await Announcement.create({ title, description, type, dateTime, createdBy });
      res.status(201).json({ success: true, message: 'Announcement created successfully', data: newItem });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error creating announcement', error: error.message });
    }
  },

  // UPDATE
  updateAnnouncement: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, type, dateTime, createdBy } = req.body;

      // Check existence
      const existing = await Announcement.getById(id);
      if (!existing) return res.status(404).json({ success: false, message: 'Announcement not found' });

      // Validation
      if (!title || !description || !type || !dateTime || !createdBy) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
      if (!announcementController.validTypes.includes(type)) {
        return res.status(400).json({ success: false, message: 'Type must be either "Meeting" or "Notice"' });
      }

      await Announcement.update(id, { title, description, type, dateTime, createdBy });
      const updated = await Announcement.getById(id);

      res.json({ success: true, message: 'Announcement updated successfully', data: updated });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error updating announcement', error: error.message });
    }
  },

  // DELETE
  deleteAnnouncement: async (req, res) => {
    try {
      const { id } = req.params;
      const existing = await Announcement.getById(id);
      if (!existing) return res.status(404).json({ success: false, message: 'Announcement not found' });

      await Announcement.delete(id);
      res.json({ success: true, message: 'Announcement deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error deleting announcement', error: error.message });
    }
  }
};

module.exports = announcementController;
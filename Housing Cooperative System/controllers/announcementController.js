const Announcement = require('../models/announcementModel');

const announcementController = {
  validTypes: ['Meeting', 'Notice'],

  getAllAnnouncements: async (req, res) => {
    try {
      const data = await Announcement.getAll();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching announcements', error: error.message });
    }
  },


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

 
  createAnnouncement: async (req, res) => {
    try {
      const { title, description, type, dateTime } = req.body;

      
      if (!title || !description || !type || !dateTime) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
      if (!announcementController.validTypes.includes(type)) {
        return res.status(400).json({ success: false, message: 'Type must be either "Meeting" or "Notice"' });
      }

      const newItem = await Announcement.create({ title, description, type, dateTime });
      res.status(201).json({ success: true, message: 'Announcement created successfully', data: newItem });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error creating announcement', error: error.message });
    }
  },

  updateAnnouncement: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, type, dateTime } = req.body;

      
      const existing = await Announcement.getById(id);
      if (!existing) return res.status(404).json({ success: false, message: 'Announcement not found' });

     
      if (!title || !description || !type || !dateTime) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
      if (!announcementController.validTypes.includes(type)) {
        return res.status(400).json({ success: false, message: 'Type must be either "Meeting" or "Notice"' });
      }

      await Announcement.update(id, { title, description, type, dateTime });
      const updated = await Announcement.getById(id);

      res.json({ success: true, message: 'Announcement updated successfully', data: updated });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error updating announcement', error: error.message });
    }
  },

  getAnnouncementsByType: async (req, res) => {
    try {
      const { type } = req.params;

     
      if (!announcementController.validTypes.includes(type)) {
        return res.status(400).json({
          success: false,
          message: 'Type must be either "Meeting" or "Notice"'
        });
      }

      const data = await Announcement.getByType(type);

      res.json({
        success: true,
        data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching announcements by type',
        error: error.message
      });
    }
  }
};

module.exports = announcementController;
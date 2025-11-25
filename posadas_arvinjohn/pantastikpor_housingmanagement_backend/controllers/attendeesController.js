const Attendees = require('../models/attendeesModel');

module.exports = {
  // GET all attendees
  getAllAttendees: async (req, res) => {
    try {
      const data = await Attendees.getAll();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET attendee by ID
  getAttendeeById: async (req, res) => {
    try {
      const attendeeID = req.params.id;
      const attendee = await Attendees.getById(attendeeID);

      if (!attendee) {
        return res.status(404).json({
          success: false,
          message: "Attendee not found"
        });
      }

      res.json({ success: true, data: attendee });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // CREATE attendee
  createAttendee: async (req, res) => {
    try {
      const { announcementID, residentID, status } = req.body;

      if (!announcementID || !residentID || !status) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }

      await Attendees.create({ announcementID, residentID, status });

      res.json({
        success: true,
        message: "Attendee added successfully"
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // UPDATE attendee
  updateAttendee: async (req, res) => {
    try {
      const attendeeID = req.params.id;
      const { announcementID, residentID, status } = req.body;

      const existing = await Attendees.getById(attendeeID);
      if (!existing) {
        return res.status(404).json({
          success: false,
          message: "Attendee not found"
        });
      }

      await Attendees.update(attendeeID, { announcementID, residentID, status });

      res.json({
        success: true,
        message: "Attendee updated successfully"
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE attendee
  deleteAttendee: async (req, res) => {
    try {
      const attendeeID = req.params.id;

      const existing = await Attendees.getById(attendeeID);
      if (!existing) {
        return res.status(404).json({
          success: false,
          message: "Attendee not found"
        });
      }

      await Attendees.delete(attendeeID);

      res.json({
        success: true,
        message: "Attendee deleted successfully"
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

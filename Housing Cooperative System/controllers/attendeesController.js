const Attendees = require('../models/attendeesModel');

  module.exports = {
  
  getAllAttendees: async (req, res) => {
    try {
      const data = await Attendees.getAll();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },


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

  createAttendee: async (req, res) => {

    console.log("BODY RECEIVED:", req.body); 

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
  }
};



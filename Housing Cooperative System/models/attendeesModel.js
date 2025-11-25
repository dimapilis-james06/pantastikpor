const db = require('../database');

const Attendees = {
 
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM tbl_attendees`,
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  },

  
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM tbl_attendees WHERE attendeeID = ?`,
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  },

  
  create: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO tbl_attendees (announcementID, residentID, status)
         VALUES (?, ?, ?)`,
        [data.announcementID, data.residentID, data.status],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  },

  
  update: (id, data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE tbl_attendees 
         SET announcementID = ?, residentID = ?, status = ?
         WHERE attendeeID = ?`,
        [data.announcementID, data.residentID, data.status, id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
};

module.exports = Attendees;

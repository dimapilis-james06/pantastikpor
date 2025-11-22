const db = require('../database');

const Announcement = {
  // Get all announcements
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_announcements', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  // Get by ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM tbl_announcements WHERE announcementID = ?',
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0] || null);
        }
      );
    });
  },

  // Create announcement
  create: (data) => {
    return new Promise((resolve, reject) => {
      const { title, description, type, dateTime, createdBy } = data;

      db.query(
        `INSERT INTO tbl_announcements (title, description, type, dateTime, createdBy)
         VALUES (?, ?, ?, ?, ?)`,
        [title, description, type, dateTime, createdBy],
        (err, results) => {
          if (err) return reject(err);
          resolve({ announcementID: results.insertId, ...data });
        }
      );
    });
  },

  // Update announcement
  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const { title, description, type, dateTime, createdBy } = data;

      db.query(
        `UPDATE tbl_announcements
         SET title = ?, description = ?, type = ?, dateTime = ?, createdBy = ?
         WHERE announcementID = ?`,
        [title, description, type, dateTime, createdBy, id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },

  // Delete announcement
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM tbl_announcements WHERE announcementID = ?',
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }
};

module.exports = Announcement;
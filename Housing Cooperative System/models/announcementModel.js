const db = require('../database');

const Announcement = {

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_announcements', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

 
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

  
  create: (data) => {
    return new Promise((resolve, reject) => {
      const { title, description, type, dateTime } = data;

      db.query(
        `INSERT INTO tbl_announcements (title, description, type, dateTime)
         VALUES (?, ?, ?, ?)`,
        [title, description, type, dateTime],
        (err, results) => {
          if (err) return reject(err);
          resolve({ announcementID: results.insertId, ...data });
        }
      );
    });
  },

 
  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const { title, description, type, dateTime} = data;

      db.query(
        `UPDATE tbl_announcements
         SET title = ?, description = ?, type = ?, dateTime = ?
         WHERE announcementID = ?`,
        [title, description, type, dateTime, id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },

  getByType: (type) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM tbl_announcements WHERE type = ?',
        [type],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }
};

module.exports = Announcement;
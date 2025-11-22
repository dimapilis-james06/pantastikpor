const db = require('../database');

const Maintenance = {

  // Get all requests
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_maintenance_requests', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  // Get one request by ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_maintenance_requests WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  },

  // Create a new maintenance request
  create: (data) => {
    return new Promise((resolve, reject) => {
      const { resident_id, title, description, priority, status } = data;

      db.query(
        `INSERT INTO tbl_maintenance_requests 
         (resident_id, title, description, priority, status, date_submitted)
         VALUES (?, ?, ?, ?, ?, NOW())`,
        [resident_id, title, description, priority, status],
        (err, results) => {
          if (err) reject(err);
          resolve({ id: results.insertId, ...data });
        }
      );
    });
  },

  // Update status only (Admin)
  updateStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE tbl_maintenance_requests 
         SET status = ?, 
             date_completed = IF(? = 'Completed', NOW(), NULL) 
         WHERE id = ?`,
        [status, status, id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
};

module.exports = Maintenance;

const db = require('../database');

const Maintenance = {

  
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_maintenance', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

 
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_maintenance WHERE requestID = ?', [id], (err, results) => {
        if (err) reject(err);
        if (!results || results.length === 0) return resolve(null);
        resolve(results[0] || null);
      });
    });
  },

 
  create: (data) => {
    return new Promise((resolve, reject) => {
      const { residentID, title, description, priority, status } = data;

      db.query(
        `INSERT INTO tbl_maintenance 
         (residentID, title, description, priority, status, dateSubmitted)
         VALUES (?, ?, ?, ?, ?, NOW())`,
        [residentID, title, description, priority, status],
        (err, results) => {
          if (err) reject(err);
          resolve({ requestID: results.insertId, residentID, title, description, priority, status, dateSubmitted: new Date(),
            dateResolved: null });
        }
      );
    });
  },


  updateStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE tbl_maintenance 
         SET status = ?, 
             dateResolved = IF(? = 'Completed', NOW(), NULL) 
         WHERE requestID = ?`,
        [status, status, id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  },

  getByStatusAndPriority: (status, priority) => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM tbl_maintenance WHERE 1=1';
      const params = [];

      if (status) {
        query += ' AND status = ?';
        params.push(status);
      }

      if (priority) {
        query += ' AND priority = ?';
        params.push(priority);
      }

      db.query(query, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = Maintenance;

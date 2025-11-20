const db = require('../database');

const Resident = {

  // Get all resident
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_admin', (err, results) => {
        if(err) reject(err);
        resolve(results);
      });
    });
  },

  // Get resident by ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_admin WHERE id = ?', [id], (err, results) => {
        if(err) reject(err);
        resolve(results[0]);
      });
    });
  },

  // Create new resident
  create: (residentData) => {
    return new Promise((resolve, reject) => {
      const { firstName, lastName, phoneNumber, unitNumber, status } = residentData;
      db.query(
        'INSERT INTO tbl_admin (firstName, lastName, phoneNumber, unitNumber, status) VALUES (?, ?, ?, ?, ?,)',
        [firstName, lastName, phoneNumber, unitNumber, status],
        (err, results) => {
          if (err) reject(err);
          resolve({ id: results.insertId, ...residentData });
        }
      );
    });
  },

  //Update residents
  update: (id, residentData) => {
    return new Promise((resolve, reject) => {
      const {firstName, lastName, phoneNumber, unitNumber, status } = residentData;
      db.query(
        'UPDATE tbl_admin SET firstName = ?, lastName = ?, phoneNumber = ?, unitNumber = ?, status = ? WHERE id = ?',
        [firstName, lastName, phoneNumber, unitNumber, status, id],
        (err, result) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  },
    
  // Delete resident
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM tbl_admin WHERE id = ?', [id], (err, results) => {
        if(err) reject(err);
        resolve(results);
      });
    });
  },

  // Get by Status
  getByStatus: (status) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_admin WHERE status = ?', [status], (err, results) => {
        if(err) reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = Resident;
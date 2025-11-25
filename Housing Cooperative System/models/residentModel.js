const db = require('../database');

const Resident = {

  
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_residents', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

 
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_residents WHERE id = ?', [id], (err, results) => {
        if(err) reject(err);
        resolve(results[0]);
      });
    });
  },

  create: (residentData) => {
    return new Promise((resolve, reject) => {
      const { firstName, lastName, phoneNumber, unitNumber, status } = residentData;
      db.query(
        'INSERT INTO tbl_residents (firstName, lastName, phoneNumber, unitNumber, status) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, phoneNumber, unitNumber, status],
        (err, results) => {
          if (err) reject(err);
          resolve({ id: results.insertId, ...residentData });
        }
      );
    });
  },

  update: (id, residentData) => {
    return new Promise((resolve, reject) => {
      const {firstName, lastName, phoneNumber, unitNumber, status } = residentData;
      db.query(
        'UPDATE tbl_residents SET firstName = ?, lastName = ?, phoneNumber = ?, unitNumber = ?, status = ? WHERE id = ?',
        [firstName, lastName, phoneNumber, unitNumber, status, id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  },
    
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE tbl_residents SET status = "Removed" WHERE id = ?',
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  },

  
  getByStatus: (status) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_residents WHERE status = ?', [status], (err, results) => {
        if(err) reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = Resident;
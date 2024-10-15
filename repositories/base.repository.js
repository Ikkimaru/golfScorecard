// Location: repositories/base.repository.js

class BaseRepository {
    constructor(db, tableName) {
      this.db = db;
      this.tableName = tableName;
    }
  
    createTable(schema) {
      this.db.run(`CREATE TABLE IF NOT EXISTS ${this.tableName} (${schema})`);
    }
  
    add(data, columns, callback) {
      const placeholders = columns.map(() => '?').join(', ');
      const query = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
      this.db.run(query, [...data], function (err) {
        callback(err, this ? this.lastID : null);
      });
    }
  
    getAll(callback) {
      const query = `SELECT * FROM ${this.tableName}`;
      this.db.all(query, [], (err, rows) => {
        callback(err, rows);
      });
    }
  
    getById(id, callback) {
      const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
      this.db.get(query, [id], (err, row) => {
        callback(err, row);
      });
    }
  
    update(id, data, columns, callback) {
      const setters = columns.map(col => `${col} = ?`).join(', ');
      const query = `UPDATE ${this.tableName} SET ${setters} WHERE id = ?`;
      this.db.run(query, [...data, id], function (err) {
        callback(err, this.changes);
      });
    }
  
    delete(id, callback) {
      const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
      this.db.run(query, [id], function (err) {
        callback(err, this.changes);
      });
    }
  }
  
  module.exports = BaseRepository;
  
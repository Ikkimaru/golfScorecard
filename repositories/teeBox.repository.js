// Location: repositories/teeBox.repository.js

const BaseRepository = require('./base.repository');
const { db } = require('../database/databaseManagement');

// Repository for TeeBox operations
class TeeBoxRepository extends BaseRepository {
  constructor() {
    super(db, 'teeBox');
  }

  addTeeBox(teeBox, callback) {
    const columns = ['golfCourseID', 'color', 'yardage', 'meters', 'courseRating', 'coursePar'];
    const data = [
      teeBox.golfCourseID,
      teeBox.color,
      teeBox.yardage,
      teeBox.meters,
      teeBox.courseRating,
      teeBox.coursePar
    ];
    super.add(data, columns, callback);
  }

  getAllTeeBoxes(callback) {
    super.getAll(callback);
  }

  getTeeBoxById(id, callback) {
    super.getById(id, callback);
  }

  updateTeeBox(id, teeBox, callback) {
    const columns = ['golfCourseID', 'color', 'yardage', 'meters', 'courseRating', 'coursePar'];
    const data = [
      teeBox.golfCourseID,
      teeBox.color,
      teeBox.yardage,
      teeBox.meters,
      teeBox.courseRating,
      teeBox.coursePar
    ];
    super.update(id, data, columns, callback);
  }

  deleteTeeBox(id, callback) {
    super.delete(id, callback);
  }
}

module.exports = new TeeBoxRepository();

// Location: repositories/hole.repository.js

const BaseRepository = require('./base.repository');
const { db } = require('../database/databaseManagement');

// Repository for Hole operations
class HoleRepository extends BaseRepository {
  constructor() {
    super(db, 'hole'); // table name 'hole'
  }

  addHole(hole, callback) {
    const columns = ['golfCourseID', 'teeBoxID', 'holeNumber', 'par', 'handicapStroke', 'yardage', 'meters'];
    const data = [hole.golfCourseID, hole.teeBoxID, hole.holeNumber, hole.par, hole.handicapStroke, hole.yardage, hole.meters];
    super.add(data, columns, callback);
  }

  getAllHoles(callback) {
    super.getAll(callback);
  }

  getHoleById(id, callback) {
    super.getById(id, callback);
  }

  updateHole(id, hole, callback) {
    const columns = ['golfCourseID', 'teeBoxID', 'holeNumber', 'par', 'handicapStroke', 'yardage', 'meters'];
    const data = [hole.golfCourseID, hole.teeBoxID, hole.holeNumber, hole.par, hole.handicapStroke, hole.yardage, hole.meters];
    super.update(id, data, columns, callback);
  }

  deleteHole(id, callback) {
    super.delete(id, callback);
  }
}

module.exports = new HoleRepository();

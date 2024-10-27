// Location: services/hole.service.js

const HoleRepository = require('../repositories/hole.repository');
const Hole = require('../models/hole.model');
const HoleEntity = require('../database/entities/holeEntity');

class HoleService {
  static addHole(holeData, callback) {
    try {
      const hole = new Hole(
        null,
        holeData.golfCourseID,
        holeData.teeBoxID,
        holeData.holeNumber,
        holeData.par,
        holeData.handicapStroke,
        holeData.yardage,
        holeData.meters
      );
      const holeEntity = new HoleEntity(
        null,
        hole.golfCourseID,
        hole.teeBoxID,
        hole.holeNumber,
        hole.par,
        hole.handicapStroke,
        hole.yardage,
        hole.meters
      );

      HoleRepository.addHole(holeEntity, (err, id) => {
        if (err) {
          callback(err);
        } else {
          callback(null, id);
        }
      });
    } catch (err) {
      callback(err);
    }
  }

  static getAllHoles(callback) {
    HoleRepository.getAllHoles((err, holes) => {
      if (err) {
        callback(err);
      } else {
        callback(null, holes);
      }
    });
  }

  static getHoleById(id, callback) {
    HoleRepository.getHoleById(id, (err, hole) => {
      if (err) {
        callback(err);
      } else {
        callback(null, hole);
      }
    });
  }

  static getHoleByCourseId(id, callback) {
    HoleRepository.getHoleByCourseId(id, (err, hole) => {
      if (err) {
        callback(err);
      } else {
        callback(null, hole);
      }
    });
  }

  static updateHole(id, holeData, callback) {
    try {
      const hole = new Hole(
        id,
        holeData.golfCourseID,
        holeData.teeBoxID,
        holeData.holeNumber,
        holeData.par,
        holeData.handicapStroke,
        holeData.yardage,
        holeData.meters
      );
      const holeEntity = new HoleEntity(
        id,
        hole.golfCourseID,
        hole.teeBoxID,
        hole.holeNumber,
        hole.par,
        hole.handicapStroke,
        hole.yardage,
        hole.meters
      );

      HoleRepository.updateHole(id, holeEntity, (err, changes) => {
        if (err) {
          callback(err);
        } else {
          callback(null, changes);
        }
      });
    } catch (err) {
      callback(err);
    }
  }

  static deleteHole(id, callback) {
    HoleRepository.deleteHole(id, (err, changes) => {
      if (err) {
        callback(err);
      } else {
        callback(null, changes);
      }
    });
  }
}

module.exports = HoleService;

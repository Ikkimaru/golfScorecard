// Location: services/teeBox.service.js

const TeeBoxRepository = require('../repositories/teeBox.repository');
const TeeBox = require('../models/teeBox.model');
const TeeBoxEntity = require('../database/entities/teeBoxEntity');

class TeeBoxService {
  static addTeeBox(teeBoxData, callback) {
    try {
      const teeBox = new TeeBox(
        null,
        teeBoxData.golfCourseID,
        teeBoxData.color,
        teeBoxData.yardage,
        teeBoxData.meters,
        teeBoxData.courseRating,
        teeBoxData.coursePar
      );
      const teeBoxEntity = new TeeBoxEntity(
        null,
        teeBox.golfCourseID,
        teeBox.color,
        teeBox.yardage,
        teeBox.meters,
        teeBox.courseRating,
        teeBox.coursePar
      );

      TeeBoxRepository.addTeeBox(teeBoxEntity, (err, id) => {
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

  static getAllTeeBoxes(callback) {
    TeeBoxRepository.getAllTeeBoxes((err, teeBoxes) => {
      if (err) {
        callback(err);
      } else {
        callback(null, teeBoxes);
      }
    });
  }

  static getTeeBoxById(id, callback) {
    TeeBoxRepository.getTeeBoxById(id, (err, teeBox) => {
      if (err) {
        callback(err);
      } else {
        callback(null, teeBox);
      }
    });
  }

  static updateTeeBox(id, teeBoxData, callback) {
    try {
      const teeBox = new TeeBox(
        id,
        teeBoxData.golfCourseID,
        teeBoxData.color,
        teeBoxData.yardage,
        teeBoxData.meters,
        teeBoxData.courseRating,
        teeBoxData.coursePar
      );
      const teeBoxEntity = new TeeBoxEntity(
        id,
        teeBox.golfCourseID,
        teeBox.color,
        teeBox.yardage,
        teeBox.meters,
        teeBox.courseRating,
        teeBox.coursePar
      );

      TeeBoxRepository.updateTeeBox(id, teeBoxEntity, (err, changes) => {
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

  static deleteTeeBox(id, callback) {
    TeeBoxRepository.deleteTeeBox(id, (err, changes) => {
      if (err) {
        callback(err);
      } else {
        callback(null, changes);
      }
    });
  }
}

module.exports = TeeBoxService;

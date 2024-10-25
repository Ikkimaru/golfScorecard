// Location: services/scorecard.service.js

const ScorecardRepository = require("../repositories/scorecard.repository");
const PlayerService = require("../services/player.service");
const TeeBoxService = require("../services/teeBox.service");
const GolfCourseService = require("../services/golfcourse.service");
const ScoreService = require("../services/score.service")
const Scorecard = require("../models/scorecard.model");
const ScorecardEntity = require("../database/entities/scorecardEntity");

class ScorecardService {
  static addScorecard(scorecardData, callback) {
    try {
      const scorecard = new Scorecard(
        null,
        scorecardData.playerId,
        scorecardData.golfCourseId,
        scorecardData.teeBoxId,
        scorecardData.weatherId,
        scorecardData.gameDate,
        scorecardData.totalScore,
        scorecardData.handicapIndex,
        scorecardData.courseHandicap,
        scorecardData.playingHandicap
      );

      const scorecardEntity = new ScorecardEntity(
        null,
        scorecard.playerId,
        scorecard.golfCourseId,
        scorecard.teeBoxId,
        scorecard.weatherId,
        scorecard.gameDate,
        scorecard.totalScore,
        scorecard.handicapIndex,
        scorecard.courseHandicap,
        scorecard.playingHandicap
      );

      ScorecardRepository.addScorecard(scorecardEntity, (err, id) => {
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

  static getAllScorecards(callback) {
    ScorecardRepository.getAllScorecards((err, scorecards) => {
      if (err) {
        callback(err);
      } else {
        callback(null, scorecards);
      }
    });
  }

  static getScorecardById(id, callback) {
    ScorecardRepository.getScorecardById(id, (err, scorecard) => {
      if (err) {
        callback(err);
      } else {
        callback(null, scorecard);
      }
    });
  }

  static getPopulatedScorecardById(id, callback) {
    ScorecardRepository.getScorecardById(id, (err, scorecard) => {
      if (err) {
        console.error("Error retrieving scorecard:", err);
        return callback(err);
      }
  
      if (!scorecard) {
        scorecard = {
          playerName: "Unknown Player",
          teeBoxColor: "Unknown Color",
          courseName: "Unknown Course",
          scores: [] // Initialize scores as an empty array
        };
        return callback(null, scorecard);
      }
  
      // Initialize scores as an empty array
      scorecard.scores = [];
  
      // Add player name
      PlayerService.getPlayerById(scorecard.PlayerID, (err, player) => {
        scorecard.playerName = player ? `${player.FirstName} ${player.LastName}`: "Unknown Player";
  
        // TeeBox color retrieval
        if (scorecard.TeeBoxID) {
          TeeBoxService.getTeeBoxById(scorecard.TeeBoxID, (err, teeBox) => {
            scorecard.teeBoxColor = teeBox && teeBox.Color ? teeBox.Color : "Unknown Color";
  
            // Fetch course name after teeBox retrieval
            if (scorecard.GolfCourseID) {
              GolfCourseService.getGolfCourseById(scorecard.GolfCourseID, (err, golfCourse) => {
                scorecard.courseName = golfCourse ? golfCourse.CourseName : "Unknown Course";
  
                // Fetch scores for the scorecard
                ScoreService.getScoresByScorecardId(scorecard.id, (err, scores) => {
                  if (err) {
                    console.error("Error retrieving scores:", err);
                    scorecard.scores = []; // Initialize to an empty array in case of error
                  } else {
                    scorecard.scores = scores; // Assign retrieved scores
                  }
                  callback(null, scorecard); // Callback with the populated scorecard
                });
              });
            } else {
              scorecard.courseName = "Unknown Course";
              console.log("No GolfCourseID, setting default course name:", scorecard.courseName);
              callback(null, scorecard); // Finalize if no GolfCourseID
            }
          });
        } else {
          scorecard.teeBoxColor = "Unknown Color";
  
          // Fetch course name if TeeBoxID is missing
          if (scorecard.GolfCourseID) {
            GolfCourseService.getGolfCourseById(scorecard.GolfCourseID, (err, golfCourse) => {
              scorecard.courseName = golfCourse ? golfCourse.CourseName : "Unknown Course";
              callback(null, scorecard); // Final callback
            });
          } else {
            scorecard.courseName = "Unknown Course";
            callback(null, scorecard);
          }
        }
      });
    });
  }
  
  

  static updateScorecard(id, scorecardData, callback) {
    try {
      const scorecard = new Scorecard(
        id,
        scorecardData.playerId,
        scorecardData.golfCourseId,
        scorecardData.teeBoxId,
        scorecardData.weatherId,
        scorecardData.gameDate,
        scorecardData.totalScore,
        scorecardData.handicapIndex,
        scorecardData.courseHandicap,
        scorecardData.playingHandicap
      );

      const scorecardEntity = new ScorecardEntity(
        id,
        scorecard.playerId,
        scorecard.golfCourseId,
        scorecard.teeBoxId,
        scorecard.weatherId,
        scorecard.gameDate,
        scorecard.totalScore,
        scorecard.handicapIndex,
        scorecard.courseHandicap,
        scorecard.playingHandicap
      );

      ScorecardRepository.updateScorecard(
        id,
        scorecardEntity,
        (err, changes) => {
          if (err) {
            callback(err);
          } else {
            callback(null, changes);
          }
        }
      );
    } catch (err) {
      callback(err);
    }
  }

  static deleteScorecard(id, callback) {
    ScorecardRepository.deleteScorecard(id, (err, changes) => {
      if (err) {
        callback(err);
      } else {
        callback(null, changes);
      }
    });
  }
}

module.exports = ScorecardService;

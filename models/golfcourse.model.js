// Location: models/golfcourse.model.js

class GolfCourse {
    constructor(courseName, courseLocation, coursePar, isEighteen) {
        this.courseName = courseName; // Name of the golf course
        this.courseLocation = courseLocation; // Location of the golf course
        this.coursePar = coursePar; // Par of the course
        this.isEighteen = isEighteen; // Boolean indicating if the course is an 18-hole course
    }
}

module.exports = GolfCourse;

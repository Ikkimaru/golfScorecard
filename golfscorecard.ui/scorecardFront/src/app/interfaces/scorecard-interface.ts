export interface ScorecardInterface {
    id: number;
    playerId: number;
    golfCourseId: number;
    teeBoxId: number;
    weatherId: number;
    gameDate: Date;
    totalScore: number;
    handicapIndex: number;
    courseHandicap: number;
    playingHandicap: number;
}

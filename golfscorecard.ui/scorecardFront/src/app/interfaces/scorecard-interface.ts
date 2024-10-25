export interface ScorecardInterface {
    id: number;
    PlayerID: number;
    GolfCourseID: number;
    TeeBoxID: number;
    WeatherID: number;
    GameDate: Date;
    TotalScore: number;
    HandicapIndex: number;
    CourseHandicap: number;
    PlayingHandicap: number;
    playerName: string;
    courseName: string;
    teeBoxColor: string;
    scores: Array<{
        id: number;
        ScorecardID: number;
        HoleID: number;
        Strokes: number;
    }>;
}

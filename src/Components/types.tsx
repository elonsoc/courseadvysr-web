export type Course = {
  termCode: string;
  sectionStatus: string;
  courseTitle: string;
  courseSection: string;
  courseSubject: string;
  courseNumber: string;
  courseRegistrationNumber: string;
  meetingDates: string[];
  meetingDays: string[];
  meetingTimes: string[];
  meetingBuilding: string;
  meetingRoom: string;
  faculty: string;
  credits: number;
  currStudents: number;
  maxStudents: number;
  timeUpdated: number;
};

const checkUserAuthentication = (val: number) => {
  return 2;
};

export enum authenticationEnum {
  Super_Admin = 1,
  Home_Dashboard = 2,
  Student_Registration = 3,
  Student_Details = 4,
  Payment_Details = 5,
  Academic_Staff = 6,
  Academic_Staff_Details = 7,
  Non_Academic_Staff = 8,
  Application_To_Staff = 9,
  Leaving = 10,
  Character = 11,
  Request_Certificate = 12,
  Extra_Activities = 13,
  View_Timetable = 14,
  SBA_Marks_Manager = 15,
  Term_Test_Marks_Manager = 16,
  Assign_Releief_Period = 17,
  Applicant_And_Parent = 18,
  System_Privileges = 19,
  Privilege_Groups = 20,
  Employee = 21,
  Time_Table = 22,
  Class_Grade_Generate = 23,
}

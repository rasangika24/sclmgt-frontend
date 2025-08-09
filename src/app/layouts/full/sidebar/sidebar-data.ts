import { NavItem } from './nav-item/nav-item';
import { authenticationEnum } from '../../../guards/auth.enum';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
    auth: [authenticationEnum.Home_Dashboard],
    isVisible: false,
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    auth: [authenticationEnum.Home_Dashboard],
    isVisible: false,
    route: '/dashboard',
  },
  {
    navCap: 'Student',
    auth: [
      authenticationEnum.Student_Registration,
      authenticationEnum.Student_Details,
      authenticationEnum.Payment_Details,
    ], // change this
    isVisible: true,
  },

  {
    displayName: 'Student Registration',
    iconName: 'layout-dashboard',
    route: '/dashboard/student',
    auth: [authenticationEnum.Student_Registration],
    isVisible: false,
  },
  {
    displayName: 'Student Details',
    iconName: 'layout-dashboard',
    route: '/dashboard/student-details',
    auth: [authenticationEnum.Student_Details],
    isVisible: false,
  },
  {
    displayName: 'Payment Details',
    iconName: 'layout-dashboard',
    route: '/dashboard/payments',
    auth: [authenticationEnum.Payment_Details],
    isVisible: false,
  },
  {
    navCap: 'Staff',
    auth: [
      authenticationEnum.Academic_Staff,
      authenticationEnum.Non_Academic_Staff,
      authenticationEnum.Application_To_Staff,
    ], // change this
    isVisible: true,
  },
  {
    displayName: 'Academic Staff',
    iconName: 'layout-dashboard',
    route: '/dashboard/academic-staff',
    auth: [authenticationEnum.Academic_Staff],
    isVisible: false,
  },

  // {
  //   displayName: 'Academic Staff-details',
  //   iconName: 'layout-dashboard',
  //   route: '/dashboard/academic-staff-details',
  //   auth: [authenticationEnum.Academic_Staff],
  //   isVisible: true,
  // },

  {
    displayName: 'None Academic Staff',
    iconName: 'layout-dashboard',
    route: '/dashboard/none-academic-staff',
    auth: [authenticationEnum.Non_Academic_Staff],
    isVisible: false,
  },
  {
    displayName: 'Application To Staff',
    iconName: 'layout-dashboard',
    route: '/dashboard/application-to-staff',
    auth: [authenticationEnum.Application_To_Staff],
    isVisible: false,
  },
  {
    navCap: 'Issuing Certificates',
    auth: [
      authenticationEnum.Leaving,
      authenticationEnum.Character,
      authenticationEnum.Request_Certificate,
      authenticationEnum.Extra_Activities,
    ], // change this
    isVisible: true,
  },
  {
    displayName: 'Leaving',
    iconName: 'layout-dashboard',
    route: '/dashboard/leaving',
    auth: [authenticationEnum.Leaving],
    isVisible: false,
  },
  {
    displayName: 'Character',
    iconName: 'layout-dashboard',
    route: '/dashboard/character',
    auth: [authenticationEnum.Character],
    isVisible: false,
  },
  {
    displayName: 'Request Certificate',
    iconName: 'layout-dashboard',
    route: '/dashboard/request-certificate',
    auth: [authenticationEnum.Request_Certificate],
    isVisible: true,
  },
  {
    displayName: 'Extra Activities',
    iconName: 'layout-dashboard',
    route: '/dashboard/extra',
    auth: [authenticationEnum.Extra_Activities],
    isVisible: false,
  },
  {
    navCap: 'Timetable',
    auth: [authenticationEnum.View_Timetable], // change this
    isVisible: true,
  },
  {
    displayName: 'ViewTimetable',
    iconName: 'layout-dashboard',
    route: '/dashboard/timetable',
    auth: [authenticationEnum.View_Timetable],
    isVisible: false,
  },
  {
    navCap: 'Marks Management',
    auth: [
      authenticationEnum.SBA_Marks_Manager,
      authenticationEnum.Term_Test_Marks_Manager,
    ],
    isVisible: true,
  },
  {
    displayName: 'SBA Marks Management',
    iconName: 'layout-dashboard',
    route: '/dashboard/sbamarks',
    auth: [authenticationEnum.SBA_Marks_Manager],
    isVisible: false,
  },
  {
    displayName: 'Term Test Marks Management',
    iconName: 'layout-dashboard',
    route: '/dashboard/termtestmarks',
    auth: [authenticationEnum.Term_Test_Marks_Manager],
    isVisible: false,
  },

  {
    navCap: 'Relief Period Management',
    auth: [authenticationEnum.Assign_Releief_Period], // change this
    isVisible: true,
  },
  {
    displayName: 'Assign Relief Period',
    iconName: 'layout-dashboard',
    route: '/dashboard/relief-period-management',
    auth: [authenticationEnum.Assign_Releief_Period],
    isVisible: false,
  },
  {
    navCap: 'Recruitment Selection and Admission',
    auth: [authenticationEnum.Applicant_And_Parent], // change this
    isVisible: true,
  },
  {
    displayName: 'Applicant and Parent',
    iconName: 'layout-dashboard',
    route: '/dashboard/applicant',
    auth: [authenticationEnum.Applicant_And_Parent],
    isVisible: false,
  },

  // {
  //   navCap: 'Users',
  //   auth: authenticationEnum.Users,
  //   isVisible: false,
  // },
  // {
  //   navCap: 'Role Management',
  //   auth: [authenticationEnum.System_Privileges], // change this
  //   isVisible: true,
  // },

  // {
  //   displayName: 'System Privileges',
  //   iconName: 'layout-dashboard',
  //   route: '/privileges/system-privileges',
  //   auth: authenticationEnum.System_Privileges,
  //   isVisible: false,
  // },
  {
    navCap: 'Role Management',
    auth: [
      authenticationEnum.System_Privileges,
      authenticationEnum.Privilege_Groups,
    ], // change this
    isVisible: true,
  },

  {
    displayName: 'System Privileges',
    iconName: 'layout-dashboard',
    route: '/privileges/system-privileges',
    auth: [authenticationEnum.System_Privileges],
    isVisible: false,
  },
  {
    displayName: 'Privilege Groups',
    iconName: 'layout-dashboard',
    route: '/privileges/privilege-groups',
    auth: [authenticationEnum.Privilege_Groups],
    isVisible: false,
  },
  // {
  //   displayName: 'System Test',
  //   iconName: 'layout-dashboard',
  //   route: '/privileges/system-test',
  //   auth: authenticationEnum.Test,
  //   isVisible: false,
  // },
  // {
  //   navCap: 'Form Demo',
  //   auth: authenticationEnum.Test, // change this
  //   isVisible: true,
  // },
  // {
  //   displayName: 'Form Demo',
  //   iconName: 'layout-dashboard',
  //   route: '/dashboard/form-demo',
  //   auth: authenticationEnum.Test,
  //   isVisible: false,
  // },
  // {
  //   navCap: 'Employee',
  //   auth: authenticationEnum.Test, // change this
  //   isVisible: true,
  // },
  // {
  //   displayName: 'Employee',
  //   iconName: 'layout-dashboard',
  //   route: '/dashboard/employee',
  //   auth: authenticationEnum.Test,
  //   isVisible: false,
  // },
  // {
  //   navCap: 'Recruitment Selection and Admission',
  //   auth: authenticationEnum.Test, // change this
  //   isVisible: true,
  // },
  // {
  //   displayName: 'Applicant and Parent',
  //   iconName: 'layout-dashboard',
  //   route: '/dashboard/applicant',
  //   auth: authenticationEnum.Test,
  //   isVisible: false,
  // },
  // {
  //   navCap: 'Time Table Managment',
  //   auth: authenticationEnum.Test, // change this
  //   isVisible: true,
  // },
  // {
  //   displayName: 'Time Table',
  //   iconName: 'layout-dashboard',
  //   route: '/dashboard/time-table',
  //   auth: authenticationEnum.Test,
  //   isVisible: false,
  // },
  {
    navCap: 'System Setup',
    auth: [authenticationEnum.Class_Grade_Generate], // change this
    isVisible: true,
  },
  {
    displayName: 'Class Grade Generate',
    iconName: 'layout-dashboard',
    route: '/dashboard/class-grade-gen',
    auth: [authenticationEnum.Class_Grade_Generate],
    isVisible: false,
  },
];

import { NavItem } from './nav-item/nav-item';
import { authenticationEnum } from '../../../guards/auth.enum';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
    auth: authenticationEnum.Home,
    isVisible: false,
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    auth: authenticationEnum.Home_Dashboard,
    isVisible: false,
    route: '/dashboard',
  },
  {
    navCap: 'Student',
    auth: authenticationEnum.Test, // change this
    isVisible: true,
  },

  {
    displayName: 'Student Registration',
    iconName: 'layout-dashboard',
    route: '/dashboard/student',
    auth: authenticationEnum.Test,
    isVisible: false,
  },
  {
    displayName: 'Student Details',
    iconName: 'layout-dashboard',
    route: '/dashboard/student-details',
    auth: authenticationEnum.Test,
    isVisible: false,
  },
  {
    navCap: 'Staff',
    auth: authenticationEnum.Test, // change this
    isVisible: true,
  },
  {
    displayName: 'Academic Staff',
    iconName: 'layout-dashboard',
    route: '/dashboard/academic-staff',
    auth: authenticationEnum.Test,
    isVisible: false,
  },

  {
    displayName: 'Academic Staff-details',
    iconName: 'layout-dashboard',
    route: '/dashboard/academic-staff-details',
    auth: authenticationEnum.Test,
    isVisible: true,
  },

  {
    displayName: 'None Academic Staff',
    iconName: 'layout-dashboard',
    route: '/dashboard/none-academic-staff',
    auth: authenticationEnum.Test,
    isVisible: false,
  },
  {
    displayName: 'Application To Staff',
    iconName: 'layout-dashboard',
    route: '/dashboard/application-to-staff',
    auth: authenticationEnum.Test,
    isVisible: false,
  },
  {
    navCap: 'Issuing Certificates',
    auth: authenticationEnum.Test, // change this
    isVisible: true,
  },
  {
    displayName: 'Leaving',
    iconName: 'layout-dashboard',
    route: '/dashboard/leaving',
    auth: authenticationEnum.Test,
    isVisible: false,
  },
  {
    displayName: 'Character',
    iconName: 'layout-dashboard',
    route: '/dashboard/character',
    auth: authenticationEnum.Test,
    isVisible: false,
  },
  {
    navCap: 'Timetable',
    auth: authenticationEnum.Test, // change this
    isVisible: true,
  },
  {
    displayName: 'ViewTimetable',
    iconName: 'layout-dashboard',
    route: '/dashboard/timetable',
    auth: authenticationEnum.Test,
    isVisible: false,
  },
  {
    navCap: 'Marks Management',
    auth: authenticationEnum.Test,
    isVisible: true,
  },
  {
    displayName: 'SBA Marks Management',
    iconName: 'layout-dashboard',
    route: '/dashboard/sbamarks',
    auth: authenticationEnum.Test,
    isVisible: false,
    
  },
  {
    displayName: 'Term Test Marks Management',
    iconName: 'layout-dashboard',
    route: '/dashboard/termtestmarks',
    auth: authenticationEnum.Home_Dashboard,
    isVisible: false,
    
  },

  {
    navCap: 'Relief Period Management',
    auth: authenticationEnum.Test, // change this
    isVisible: true,
  },
  {
    displayName: 'Assign Relief Period',
    iconName: 'layout-dashboard',
    route: '/dashboard/relief-period-management',
    auth: authenticationEnum.Test,
    isVisible: false,
  },
  {
    navCap: 'Recruitment Selection and Admission',
    auth: authenticationEnum.Test, // change this
    isVisible: true,
  },
  {
    displayName: 'Applicant and Parent',
    iconName: 'layout-dashboard',
    route: '/dashboard/applicant',
    auth: authenticationEnum.Test,
    isVisible: false,
  },
  
  {
    navCap: 'Users',
    auth: authenticationEnum.Users,
    isVisible: false,
  },
  {
    navCap: 'Role Management',
    auth: authenticationEnum.Privileges, // change this
    isVisible: true,
  },
  
  {
    displayName: 'System Privileges',
    iconName: 'layout-dashboard',
    route: '/privileges/system-privileges',
    auth: authenticationEnum.System_Privileges,
    isVisible: false,
  },
  {
    navCap: 'Role Management',
    auth: authenticationEnum.Privileges, // change this
    isVisible: true,
  },
  
  {
    displayName: 'System Privileges',
    iconName: 'layout-dashboard',
    route: '/privileges/system-privileges',
    auth: authenticationEnum.System_Privileges,
    isVisible: false,
  },
  {
    displayName: 'Privilege Groups',
    iconName: 'layout-dashboard',
    route: '/privileges/privilege-groups',
    auth: authenticationEnum.Privilege_Groups,
    isVisible: false,
  },
  {
    displayName: 'System Test',
    iconName: 'layout-dashboard',
    route: '/privileges/system-test',
    auth: authenticationEnum.Test,
    isVisible: false,
  },
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
  {
    navCap: 'Employee',
    auth: authenticationEnum.Test, // change this
    isVisible: true,
  },
  {
    displayName: 'Employee',
    iconName: 'layout-dashboard',
    route: '/dashboard/employee',
    auth: authenticationEnum.Test,
    isVisible: false,
  },
  {
    navCap: 'Recruitment Selection and Admission',
    auth: authenticationEnum.Test, // change this
    isVisible: true,
  },
  {
    displayName: 'Applicant and Parent',
    iconName: 'layout-dashboard',
    route: '/dashboard/applicant',
    auth: authenticationEnum.Test,
    isVisible: false,
  },
  {
    navCap: 'Time Table Managment',
    auth: authenticationEnum.Test, // change this
    isVisible: true,
  },
  {
    displayName: 'Time Table',
    iconName: 'layout-dashboard',
    route: '/dashboard/time-table',
    auth: authenticationEnum.Test,
    isVisible: false,
  },
  {
    navCap: 'System Setup',
    auth: authenticationEnum.Test, // change this
    isVisible: true,
  },
  {
    displayName: 'Class Grade Generate',
    iconName: 'layout-dashboard',
    route: '/dashboard/class-grade-gen',
    auth: authenticationEnum.Test,
    isVisible: false,
  },

  

  
  
  
];

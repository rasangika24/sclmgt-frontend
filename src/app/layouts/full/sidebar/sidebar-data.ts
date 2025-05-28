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
    navCap: 'Users',
    auth: authenticationEnum.Users,
    isVisible: false,
  },
  {
    navCap: 'Privileges',
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
    isVisible: false
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
    navCap: 'Student ',
    auth: authenticationEnum.Test, // change this
    isVisible: true,
  },
  {
    displayName: 'Student ',
    iconName: 'layout-dashboard',
    route: '/dashboard/applicant',
    auth: authenticationEnum.Test,
    isVisible: false,
  },
];

import { Component } from '@angular/core';

const ELEMENT_DATA_APPLICANT: any[] = [
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
];

const ELEMENT_DATA_MOTHER: any[] = [
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
];

const ELEMENT_DATA_FATHER: any[] = [
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
];

const ELEMENT_DATA_GUARDIAN: any[] = [
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
  {applicant_no: 1, name: 'Rasangika', grade: 1, gender: 'Female', date_of_birth: '1999/01/21', address: '123,Abc Road, London', status: 'Selected'},
];

@Component({
  selector: 'app-recruitment-selection-admission',
  standalone: false,
  templateUrl: './recruitment-selection-admission.component.html',
  styleUrl: './recruitment-selection-admission.component.scss'
})
export class RecruitmentSelectionAdmissionComponent {

  displayedColumnsApplicant: string[] = ['applicant_no', 'name', 'grade', 'gender', 'date_of_birth', 'address', 'status'];
  dataSource_applicant = ELEMENT_DATA_APPLICANT;

  displayedColumnsMother: string[] = ['applicantName', 'mothersName', 'address', 'mothersPhone', 'occupation', 'income'];
  dataSource_mother = ELEMENT_DATA_MOTHER;

  displayedColumnsFather: string[] = ['applicantName', 'fathersName', 'address', 'fathersPhone', 'occupation', 'income'];
  dataSource_father = ELEMENT_DATA_FATHER;

  displayedColumnsGuardian: string[] = ['applicantName', 'guardiansName', 'address', 'guardiansPhone', 'occupation', 'income'];
  dataSource_guardian = ELEMENT_DATA_GUARDIAN;
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { SbaServiceService } from 'src/app/services/sba/sba-service.service';

const ELEMENT_DATA_OL: any[] = [
  { 
id: 3,
fileNumber : 1,
exam : 'A',
admissionNumber : 2,
year : 2,
subject1 : 'A',
subject2 : 'A',
subject3 : 'A',
subject4 : 'A',
subject5 : 'A',
subject6 : 'A',
subject7 : 'A',
subject8 : 'A',
subject9 : 'A',
subject10 : 'A',
  },
];

/*

const ELEMENT_DATA_AL: any[] = [
  { 

fileNumber : '1',
exam : 'A',
admissionNumber : '2',
subject1 : 'A',
subject2 : 'A',
subject3 : 'A',
subject4 : 'A',
subject5 : 'A',
subject6 : 'A',
subject7 : 'A',
subject8 : 'A',
subject9 : 'A',
subject10 : 'A',
  },
]; */

@Component({
  selector: 'app-sbamarks',
  standalone: false,
  templateUrl: './sbamarks.component.html',
  styleUrl: './sbamarks.component.scss'
})
export class SbamarksComponent implements OnInit {

  sbaForm:FormGroup;

  displayedColumnsOl: string[] = [
'id',
'fileNumber',
'exam',
'admissionNumber',
'year',
'subject1',
'subject2',
'subject3',
'subject4',
'subject5',
'subject6',
'subject7',
'subject8',
'subject9',
'subject10',
'actions',
];

/*
displayedColumnsAl: string[] = [
'fileNumber',
'exam',
'admissionNumber',
'subject1',
'subject2',
'subject3',
'subject4',
'subject5',
'subject6',
'subject7',
'subject8',
'subject9',
'subject10',
];
*/

        dataSource_ol = new MatTableDataSource<any>(ELEMENT_DATA_OL);
     //   dataSource_al = new MatTableDataSource<any>(ELEMENT_DATA_AL);
      
        @ViewChild(MatPaginator) paginator!: MatPaginator;
        @ViewChild(MatSort) sort!: MatSort;

        saveButtonLabel = 'Save';
        mode = 'add';
        selectedData: any;
        isButtonDisabled = false;



      constructor(
        private fb: FormBuilder,
        private sbaService: SbaServiceService,
        private messageService: MessageServiceService
      ){
        this.sbaForm=this.fb.group({
           id: new FormControl(''),
          fileNumber:new FormControl(''),
          exam:new FormControl(''),
          admissionNumber:new FormControl(''),
          year:new FormControl(''),
          subject1:new FormControl(''),
          subject2:new FormControl(''),
          subject3:new FormControl(''),
          subject4:new FormControl(''),
          subject5:new FormControl(''),
          subject6:new FormControl(''),
          subject7:new FormControl(''),
          subject8:new FormControl(''),
          subject9:new FormControl(''),
          subject10:new FormControl(''),


        });
      }

     


    ngOnInit(): void {
    //get Data request
    this.populateData();
  }
          
        ngAfterViewInit() {
          this.dataSource_ol.paginator = this.paginator;
      //    this.dataSource_al.paginator = this.paginator;
        }

  public populateData(): void {
    //implement get data code
    //ts -> service file function
    // service -> backend call

    try {
      this.sbaService.getData().subscribe(
        (response: any) => {
          console.log('get data response', response);

          this.dataSource_ol = new MatTableDataSource(response);
          this.dataSource_ol.paginator = this.paginator;
          this.dataSource_ol.sort = this.sort;

       //   this.dataSource_al = new MatTableDataSource(response);
        //  this.dataSource_al.paginator = this.paginator;
        //  this.dataSource_al.sort = this.sort;
        },
        (error) => {
          this.messageService.showError('Action failed with error : ' + error);
        }
      );
    } catch (error) {
      this.messageService.showError('Action failed with error : ' + error);
    }
  }

  //on submit function
  onSubmit() {

    //Check if form is validate
    if (this.sbaForm.invalid) {
    this.sbaForm.markAllAsTouched(); // To show errors
    return;
  }

    console.log('Mode is : ' + this.mode);
    console.log('form Submitted: ', this.sbaForm.value);
    console.log(this.sbaForm.value);

    try {
      if (this.mode === 'add') {
        this.sbaService.serviceCall(this.sbaForm.value).subscribe((response) => {
           console.log('server response: ', response);

            if (
              this.dataSource_ol && this.selectedData && this.dataSource_ol.data.length > 0) {
              this.dataSource_ol = new MatTableDataSource([response, ...this.dataSource_ol.data]);
            } else {
              this.dataSource_ol = new MatTableDataSource([response]);
              this.messageService.showSuccess('Data Saved Successfully..!');
            }

          });
      } else if (this.mode === 'edit') {
        //edit data
        this.sbaService.editData(this.selectedData?.id, this.sbaForm.value).subscribe((response) => {
            // console.log('server response for update:', response);
            let elementIndex = this.dataSource_ol.data.findIndex(
              (element) => element.id === this.selectedData?.id
            );
            this.dataSource_ol.data[elementIndex] = response;
            this.dataSource_ol = new MatTableDataSource(this.dataSource_ol.data);
            this.messageService.showSuccess('Data Updated Successfully..!');
          });
      }
      this.mode = 'add';
      this.sbaForm.disable();
      this.isButtonDisabled = true;
    } catch (error) {
      //console.log(error);
      this.messageService.showError('Action failed with error : ' + error);
    }
  }

  //Edit Data

  public editData(data: any): void {
    this.sbaForm.patchValue(data);
    this.saveButtonLabel = 'Update';
    this.mode = 'edit';
    this.selectedData = data;
  }

   //Delete Data
    public deleteData(data: any): void {
      // data delete implementation
  
      const id = data.id;
  
      try {
        this.sbaService.deleteData(id).subscribe((response) => {
          // console.log('server response for delete: ', response);
  
          const index = this.dataSource_ol.data.findIndex((element) => element, id === id );
          
          if (index !== -1) {
            this.dataSource_ol.data.splice(index, 1);
          }
  
          this.dataSource_ol = new MatTableDataSource(this.dataSource_ol.data);
          this.messageService.showSuccess('Data Deleted Successfully..!');
        });
      } catch (error) {
        //console.log(error);
        this.messageService.showError('Action failed with error : ' + error);
      }
    }

     //Clear Fields

  public clearFeild(): void {
    this.sbaForm.reset();
    this.sbaForm.setErrors(null);
    this.sbaForm.updateValueAndValidity();
    this.saveButtonLabel = 'Save';
    this.sbaForm.enable();
    this.isButtonDisabled = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_ol.filter = filterValue.trim().toLowerCase();

    if (this.dataSource_ol.paginator) {
      this.dataSource_ol.paginator.firstPage();
    }
  }

  public refreshData(): void {
    this.populateData();
  }


}

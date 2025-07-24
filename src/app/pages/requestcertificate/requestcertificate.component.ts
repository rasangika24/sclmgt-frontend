import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';

@Component({
  selector: 'app-requestcertificate',
  standalone: false,
  templateUrl: './requestcertificate.component.html',
  styleUrl: './requestcertificate.component.scss'
})
export class RequestcertificateComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
requestCertificateForm: FormGroup;

constructor(
        private fb: FormBuilder,
        //private sbaService: SbaServiceService,
        private messageService: MessageServiceService
      ){
        this.requestCertificateForm=this.fb.group({
          indexNo: new FormControl(''),
          pupilsName:new FormControl(''),
          payments:new FormControl(''),
          library:new FormControl(''),
          science:new FormControl(''),
          ict:new FormControl(''),
          sport:new FormControl(''),
                  });
      }


}



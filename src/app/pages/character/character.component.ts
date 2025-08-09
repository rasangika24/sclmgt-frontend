import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LeavingServiceService } from 'src/app/services/leaving/leaving-service.service';
import { CertificationRequestService, CertificationRequestDto } from '../../services/certification-request.service';
import { StudentService, StudentDto } from '../../services/student/student.service';
import { MessageServiceService } from '../../services/message-service/message-service.service';

@Component({
  selector: 'app-character',
  standalone: false,
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {
  characterForm: FormGroup;
  submitted = false;
  
  // New properties for certificate integration
  certificationRequests: CertificationRequestDto[] = [];
  selectedRequest: CertificationRequestDto | null = null;
  studentData: StudentDto | null = null;
  isLoading = false;
  
  // View states
  currentView: 'selectRequest' | 'fillForm' | 'viewRequests' = 'viewRequests';

  constructor(
    private fb: FormBuilder,
    private leavingService: LeavingServiceService,
    private certificationService: CertificationRequestService,
    private studentService: StudentService,
    private messageService: MessageServiceService
  ) {
    this.characterForm = this.createCharacterForm();
  }

  ngOnInit(): void {
    this.loadApprovedCharacterCertificationRequests();
  }

  private createCharacterForm(): FormGroup {
    return this.fb.group({
      // Student basic info (auto-filled from student data)
      pupilsName: ['', [Validators.required, Validators.minLength(3)]],
      dateofBirth: ['', Validators.required],
      religion: ['', Validators.required],
      fullnameofthefatherGardian: ['', [Validators.required, Validators.minLength(3)]],
      addressofthefatherGardian: ['', Validators.required],
      dateofAdmission: ['', Validators.required],
      
      // Academic info
      lastgradePassed: ['', Validators.required],
      progressinacademicField: ['', Validators.required],
      goodBehaviour: ['', Validators.required],
      
      // Character-specific fields
      specialSkills: [''],
      extraCurricular: [''],
      leadershipSkills: [''],
      principalsRecomendation: ['', Validators.required],
      
      // System fields
      dateIssued: [new Date(), Validators.required]
    });
  }

  // Load approved certification requests for character certificates
  loadApprovedCharacterCertificationRequests(): void {
    this.isLoading = true;
    // Load specifically CHARACTER_CERTIFICATE type requests that are approved
    this.certificationService.getApprovedCharacterCertificateRequests().subscribe({
      next: (requests) => {
        this.certificationRequests = requests;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading character certification requests:', error);
        // Fallback to all approved requests if specific type fails
        this.certificationService.getApprovedRequestsAllTypes().subscribe({
          next: (allRequests) => {
            // Filter for character certificate type if available
            this.certificationRequests = allRequests.filter(req => 
              req.type === 'CHARACTER_CERTIFICATE' || (!req.type && req.remarks?.toLowerCase().includes('character'))
            );
            this.isLoading = false;
          },
          error: (fallbackError) => {
            console.error('Error loading any certification requests:', fallbackError);
            this.messageService.showError('Failed to load certification requests');
            this.isLoading = false;
          }
        });
      }
    });
  }

  // Select a certification request and load student data
  selectCertificationRequest(request: CertificationRequestDto): void {
    this.selectedRequest = request;
    this.loadStudentData(request.studentAdmissionNumber);
    this.currentView = 'fillForm';
  }

  // Load student data to auto-fill form
  loadStudentData(admissionNumber: string): void {
    this.isLoading = true;
    this.studentService.getStudentByAdmissionNumber(admissionNumber).subscribe({
      next: (student) => {
        this.studentData = student;
        this.autoFillFormFromStudentData(student);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading student data:', error);
        this.messageService.showError('Failed to load student data');
        this.isLoading = false;
        // Continue with form but without auto-fill
        this.currentView = 'fillForm';
      }
    });
  }

  // Auto-fill form fields from student data
  autoFillFormFromStudentData(student: StudentDto): void {
    this.characterForm.patchValue({
      pupilsName: student.fullName || student.nameWithInitials || '',
      dateofBirth: student.dateOfBirth || '',
      religion: student.religion || '',
      fullnameofthefatherGardian: student.fatherName || student.guardianName || '',
      addressofthefatherGardian: student.address || '',
      dateofAdmission: student.admissionDate || ''
    });
  }

  // Getter for easy access to form fields in the template
  get f() {
    return this.characterForm.controls;
  }

  // Generate and download PDF
  generatePDF(): void {
    if (!this.characterForm.valid) {
      this.messageService.showError('Please fill all required fields before generating PDF');
      this.markFormGroupTouched();
      return;
    }

    try {
      const formData = this.characterForm.value;
      
      // Map form data to match PDF service expectations
      const pdfData = {
        pupilsName: formData.pupilsName,
        dateofBirth: this.formatDate(formData.dateofBirth),
        religion: formData.religion,
        fullnameofthefatherGardian: formData.fullnameofthefatherGardian,
        addressofthefatherGardian: formData.addressofthefatherGardian,
        dateofAdmission: this.formatDate(formData.dateofAdmission),
        lastgradePassed: formData.lastgradePassed,
        progressinacademicField: formData.progressinacademicField,
        goodBehaviour: formData.goodBehaviour,
        specialSkills: formData.specialSkills || 'N/A',
        extraCurricular: formData.extraCurricular || 'N/A',
        leadershipSkills: formData.leadershipSkills || 'N/A',
        principalsRecomendation: formData.principalsRecomendation,
        dateIssued: this.formatDate(formData.dateIssued)
      };

      const doc = this.leavingService.generateCharacterCertificatePDF(pdfData);
      
      // Generate the PDF file name
      const fileName = `character_certificate_${pdfData.pupilsName.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
      
      // Save the PDF
      doc.save(fileName);
      
      this.messageService.showSuccess('Character certificate PDF generated successfully');
      
      // Mark the certification request as completed
      if (this.selectedRequest?.id) {
        this.markRequestAsCompleted(this.selectedRequest.id);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      this.messageService.showError('Error generating PDF. Please try again.');
    }
  }

  // Helper method to format dates for PDF
  private formatDate(date: any): string {
    if (!date) return '';
    
    if (typeof date === 'string') return date;
    
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    
    return date.toString();
  }

  // Mark certification request as completed
  markRequestAsCompleted(requestId: number): void {
    const completedRequest: CertificationRequestDto = {
      ...this.selectedRequest!,
      status: 'COMPLETED'
    };

    this.certificationService.updateCertificationRequest(requestId, completedRequest).subscribe({
      next: (response) => {
        this.messageService.showSuccess('Character certificate generated and request marked as completed');
        this.resetToRequestList();
      },
      error: (error) => {
        console.error('Error marking request as completed:', error);
        this.messageService.showError('Certificate generated but failed to update request status');
      }
    });
  }

  // Submit form and save data
  onSubmit(): void {
    this.submitted = true;

    if (this.characterForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    // Save to backend
    this.leavingService.serviceCall(this.characterForm.value).subscribe({
      next: (response) => {
        console.log('Data saved successfully');
        this.messageService.showSuccess('Character certificate data saved successfully');
        this.generatePDF();
      },
      error: (error) => {
        console.error('Error saving data:', error);
        this.messageService.showError('Error saving character certificate data');
      }
    });
  }

  // Helper method to check if a field has an error
  hasError(field: string, error: string): boolean {
    const control = this.characterForm.get(field);
    return !!(control && control.hasError(error) && (control.dirty || control.touched || this.submitted));
  }

  // Check if form is valid for PDF generation
  isFormValidForPDF(): boolean {
    return this.characterForm.valid;
  }

  // Get form validation status for display
  getFormValidationMessage(): string {
    if (this.characterForm.valid) {
      return 'Form is complete and ready for PDF generation';
    }
    
    const invalidFields = [];
    const controls = this.characterForm.controls;
    
    for (const name in controls) {
      if (controls[name].invalid && controls[name].errors) {
        invalidFields.push(name);
      }
    }
    
    return `Please fill required fields: ${invalidFields.join(', ')}`;
  }

  // Mark all form fields as touched to show validation errors
  private markFormGroupTouched(): void {
    Object.keys(this.characterForm.controls).forEach(key => {
      const control = this.characterForm.get(key);
      control?.markAsTouched();
    });
  }

  // Reset form
  resetForm(): void {
    this.submitted = false;
    this.characterForm.reset();
    this.characterForm = this.createCharacterForm();
  }

  // Reset to request list view
  resetToRequestList(): void {
    this.currentView = 'viewRequests';
    this.selectedRequest = null;
    this.studentData = null;
    this.resetForm();
    this.loadApprovedCharacterCertificationRequests();
  }

  // Set current view
  setView(view: 'selectRequest' | 'fillForm' | 'viewRequests'): void {
    this.currentView = view;
  }

  // Get status badge class
  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'badge-warning';
      case 'APPROVED': return 'badge-success';
      case 'REJECTED': return 'badge-danger';
      case 'COMPLETED': return 'badge-info';
      default: return 'badge-secondary';
    }
  }

  // Check if all clearances are completed
  isAllClearancesCompleted(request: CertificationRequestDto): boolean {
    return !!(request.paymentsCleared && 
              request.libraryBooksReturned && 
              request.scienceLabCleared && 
              request.ictLabCleared && 
              request.sportsItemsReturned);
  }

  // Get clearance status icon
  getClearanceIcon(cleared: boolean | undefined): string {
    return cleared ? 'check_circle' : 'cancel';
  }

  // Get clearance status class
  getClearanceClass(cleared: boolean | undefined): string {
    return cleared ? 'text-success' : 'text-danger';
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LeavingServiceService } from 'src/app/services/leaving/leaving-service.service';
import { CertificationRequestService, CertificationRequestDto } from '../../services/certification-request.service';
import { StudentService, StudentDto } from '../../services/student/student.service';
import { MessageServiceService } from '../../services/message-service/message-service.service';

@Component({
  selector: 'app-leaving',
  standalone: false,
  templateUrl: './leaving.component.html',
  styleUrl: './leaving.component.scss'
})
export class LeavingComponent implements OnInit {
  leavingForm: FormGroup;
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
    this.leavingForm = this.createLeavingForm();
  }

  ngOnInit(): void {
    this.loadApprovedCertificationRequests();
  }

  private createLeavingForm(): FormGroup {
    return this.fb.group({
      // Student basic info (auto-filled from student data)
      namewithInitials: ['', Validators.required], // This will be used for full name
      dateofBirth: ['', Validators.required],
      religion: ['', Validators.required],
      address: ['', Validators.required],
      school: ['Sri Chandananda Buddist College', Validators.required], // Default school name
      
      // Parent/Guardian info (auto-filled)
      fullnameofthefatherGardian: ['', [Validators.required, Validators.minLength(3)]],
      
      // Academic info
      dateofAdmission: ['', Validators.required],
      dateofLeaving: ['', Validators.required],
      lastgradePassed: ['', Validators.required],
      mediumLearned: ['', Validators.required],
      causeLeaving: ['', Validators.required],
      progressinacademicField: ['', Validators.required],
      behaviour: ['', Validators.required],
      
      // Additional info (optional)
      extraCurricular: [''],
      specialAchievements: [''],
      principalsName: ['', Validators.required],
      
      // System fields
      dateIssued: [new Date(), Validators.required]
    });
  }

  // Load approved certification requests for leaving certificates
  loadApprovedCertificationRequests(): void {
    this.isLoading = true;
    // Load specifically LEAVING_CERTIFICATE type requests that are approved
    this.certificationService.getApprovedLeavingCertificateRequests().subscribe({
      next: (requests) => {
        this.certificationRequests = requests;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading certification requests:', error);
        // Fallback to all approved requests if specific type fails
        this.certificationService.getApprovedRequestsAllTypes().subscribe({
          next: (allRequests) => {
            // Filter for leaving certificate type if available
            this.certificationRequests = allRequests.filter(req => 
              !req.type || req.type === 'LEAVING_CERTIFICATE' || req.type === 'GENERAL'
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
    this.leavingForm.patchValue({
      namewithInitials: student.fullName || student.nameWithInitials || '',
      dateofBirth: student.dateOfBirth || '',
      religion: student.religion || '',
      address: student.address || '',
      school: 'Sri Chandananda Buddist College', // Default school name
      dateofAdmission: student.admissionDate || '',
      fullnameofthefatherGardian: student.fatherName || student.guardianName || ''
    });
  }

  // Generate and download PDF
  generatePDF(): void {
    if (!this.leavingForm.valid) {
      this.messageService.showError('Please fill all required fields before generating PDF');
      this.markFormGroupTouched();
      return;
    }

    try {
      const formData = this.leavingForm.value;
      
      // Map form data to match PDF service expectations
      const pdfData = {
        pupilsName: formData.namewithInitials, // Using namewithInitials as the full name
        dateofBirth: this.formatDate(formData.dateofBirth),
        religion: formData.religion,
        fullnameofthefatherGardian: formData.fullnameofthefatherGardian,
        address: formData.address,
        dateofAdmission: this.formatDate(formData.dateofAdmission),
        dateofLeaving: this.formatDate(formData.dateofLeaving),
        causeLeaving: formData.causeLeaving,
        lastgradePassed: formData.lastgradePassed,
        mediumLearned: formData.mediumLearned,
        progressinacademicField: formData.progressinacademicField,
        extraCurricular: formData.extraCurricular || 'N/A',
        behaviour: formData.behaviour,
        specialAchievements: formData.specialAchievements || 'N/A',
        principalsName: formData.principalsName,
        dateIssued: this.formatDate(formData.dateIssued),
        school: formData.school
      };

      const doc = this.leavingService.generateLeavingCertificatePDF(pdfData);
      
      // Generate the PDF file name
      const fileName = `leaving_certificate_${pdfData.pupilsName}_${new Date().getTime()}.pdf`;

      // Save the PDF
      doc.save(fileName);
      
      this.messageService.showSuccess('Leaving certificate PDF generated successfully');
      
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
        this.messageService.showSuccess('Leaving certificate generated and request marked as completed');
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

    if (this.leavingForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    // Save to backend
    this.leavingService.serviceCall(this.leavingForm.value).subscribe({
      next: (response) => {
        console.log('Data saved successfully');
        this.messageService.showSuccess('Leaving certificate data saved successfully');
        this.generatePDF();
      },
      error: (error) => {
        console.error('Error saving data:', error);
        this.messageService.showError('Error saving leaving certificate data');
      }
    });
  }

  // Helper method to check if a field has an error
  hasError(field: string, error: string): boolean {
    const control = this.leavingForm.get(field);
    return !!(control && control.hasError(error) && (control.dirty || control.touched || this.submitted));
  }

  // Check if form is valid for PDF generation
  isFormValidForPDF(): boolean {
    return this.leavingForm.valid;
  }

  // Get form validation status for display
  getFormValidationMessage(): string {
    if (this.leavingForm.valid) {
      return 'Form is complete and ready for PDF generation';
    }
    
    const invalidFields = [];
    const controls = this.leavingForm.controls;
    
    for (const name in controls) {
      if (controls[name].invalid && controls[name].errors) {
        invalidFields.push(name);
      }
    }
    
    return `Please fill required fields: ${invalidFields.join(', ')}`;
  }

  // Mark all form fields as touched to show validation errors
  private markFormGroupTouched(): void {
    Object.keys(this.leavingForm.controls).forEach(key => {
      const control = this.leavingForm.get(key);
      control?.markAsTouched();
    });
  }

  // Reset form
  resetForm(): void {
    this.submitted = false;
    this.leavingForm.reset();
    this.leavingForm = this.createLeavingForm();
  }

  // Reset to request list view
  resetToRequestList(): void {
    this.currentView = 'viewRequests';
    this.selectedRequest = null;
    this.studentData = null;
    this.resetForm();
    this.loadApprovedCertificationRequests();
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

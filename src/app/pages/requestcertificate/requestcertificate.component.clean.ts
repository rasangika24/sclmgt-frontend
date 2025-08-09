import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { CertificationRequestService, CertificationRequestDto } from '../../services/certification-request.service';

@Component({
  selector: 'app-requestcertificate',
  standalone: false,
  templateUrl: './requestcertificate.component.html',
  styleUrl: './requestcertificate.component.scss'
})
export class RequestcertificateComponent implements OnInit {
  requestCertificateForm: FormGroup = this.fb.group({});
  isLoading = false;
  certificationRequests: CertificationRequestDto[] = [];
  filteredRequests: CertificationRequestDto[] = [];
  statistics: any | null = null;
  searchTerm = '';
  selectedStatus = 'ALL';
  showRequestForm = true;
  editingRequest: CertificationRequestDto | null = null;

  statusOptions = [
    { value: 'ALL', label: 'All Requests' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'APPROVED', label: 'Approved' },
    { value: 'REJECTED', label: 'Rejected' },
    { value: 'COMPLETED', label: 'Completed' }
  ];

  certificateTypes = [
    { value: 'LEAVING_CERTIFICATE', label: 'Leaving Certificate' },
    { value: 'CHARACTER_CERTIFICATE', label: 'Character Certificate' },
  ];

  selectedType = 'ALL';

  constructor(
    private fb: FormBuilder,
    private certificationService: CertificationRequestService,
    private messageService: MessageServiceService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadCertificationRequests();
    this.loadStatistics();
  }

  private initializeForm(): void {
    this.requestCertificateForm = this.fb.group({
      studentAdmissionNumber: new FormControl('', [Validators.required]),
      studentName: new FormControl('', [Validators.required]),
      type: new FormControl('LEAVING_CERTIFICATE', [Validators.required]),
      paymentsCleared: new FormControl(false),
      libraryBooksReturned: new FormControl(false),
      scienceLabCleared: new FormControl(false),
      ictLabCleared: new FormControl(false),
      sportsItemsReturned: new FormControl(false),
      remarks: new FormControl('')
    });
  }

  onSubmit(): void {
    if (this.requestCertificateForm.valid) {
      this.isLoading = true;
      const formData = this.requestCertificateForm.value;

      if (this.editingRequest) {
        this.updateRequest(formData);
      } else {
        this.createRequest(formData);
      }
    } else {
      this.markFormGroupTouched();
      this.messageService.showError('Please fill in all required fields');
    }
  }

  private createRequest(formData: CertificationRequestDto): void {
    this.certificationService.addCertificationRequest(formData).subscribe({
      next: (result) => {
        this.messageService.showSuccess('Certification request submitted successfully');
        this.resetForm();
        this.loadCertificationRequests();
        this.loadStatistics();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error creating request:', error);
        let errorMessage = 'Failed to submit certification request';
        
        if (error.status === 409) {
          errorMessage = 'Student already has a pending certification request';
        } else if (error.status === 404) {
          errorMessage = 'Student not found. Please check the admission number';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }
        
        this.messageService.showError(errorMessage);
        this.isLoading = false;
      }
    });
  }

  private updateRequest(formData: CertificationRequestDto): void {
    if (!this.editingRequest?.id) return;

    formData.id = this.editingRequest.id;
    this.certificationService.updateCertificationRequest(this.editingRequest.id, formData).subscribe({
      next: (result) => {
        this.messageService.showSuccess('Certification request updated successfully');
        this.resetForm();
        this.loadCertificationRequests();
        this.loadStatistics();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error updating request:', error);
        this.messageService.showError('Failed to update certification request: ' + (error.error?.message || error.message));
        this.isLoading = false;
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.requestCertificateForm.controls).forEach(key => {
      const control = this.requestCertificateForm.get(key);
      control?.markAsTouched();
    });
  }

  loadCertificationRequests(): void {
    this.certificationService.getAllCertificationRequests().subscribe({
      next: (requests) => {
        this.certificationRequests = requests;
        this.applyFilters();
      },
      error: (error: any) => {
        console.error('Error loading requests:', error);
        this.messageService.showError('Failed to load certification requests');
      }
    });
  }

  loadStatistics(): void {
    this.certificationService.getRequestStatistics().subscribe({
      next: (stats) => {
        this.statistics = stats;
      },
      error: (error: any) => {
        console.error('Error loading statistics:', error);
      }
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  onTypeChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.certificationRequests];

    // Filter by search term
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(request => 
        request.studentName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        request.studentAdmissionNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (this.selectedStatus !== 'ALL') {
      filtered = filtered.filter(request => request.status === this.selectedStatus);
    }

    // Filter by type
    if (this.selectedType !== 'ALL') {
      filtered = filtered.filter(request => request.type === this.selectedType);
    }

    this.filteredRequests = filtered;
  }

  editRequest(request: CertificationRequestDto): void {
    this.editingRequest = request;
    this.showRequestForm = true;
    
    this.requestCertificateForm.patchValue({
      studentAdmissionNumber: request.studentAdmissionNumber,
      studentName: request.studentName,
      type: request.type || 'LEAVING_CERTIFICATE',
      paymentsCleared: request.paymentsCleared,
      libraryBooksReturned: request.libraryBooksReturned,
      scienceLabCleared: request.scienceLabCleared,
      ictLabCleared: request.ictLabCleared,
      sportsItemsReturned: request.sportsItemsReturned,
      remarks: request.remarks
    });
  }

  deleteRequest(request: CertificationRequestDto): void {
    if (!request.id) return;

    if (confirm('Are you sure you want to delete this certification request?')) {
      this.certificationService.deleteCertificationRequest(request.id).subscribe({
        next: () => {
          this.messageService.showSuccess('Certification request deleted successfully');
          this.loadCertificationRequests();
          this.loadStatistics();
        },
        error: (error: any) => {
          console.error('Error deleting request:', error);
          this.messageService.showError('Failed to delete certification request');
        }
      });
    }
  }

  approveRequest(request: CertificationRequestDto): void {
    if (!request.id) return;

    const approvedBy = prompt('Enter your name for approval:');
    if (!approvedBy) return;

    const remarks = prompt('Enter approval remarks (optional):') || '';

    this.certificationService.approveRequest(request.id!, approvedBy, remarks).subscribe({
      next: () => {
        this.messageService.showSuccess('Request approved successfully');
        this.loadCertificationRequests();
        this.loadStatistics();
      },
      error: (error: any) => {
        console.error('Error approving request:', error);
        this.messageService.showError('Failed to approve request');
      }
    });
  }

  rejectRequest(request: CertificationRequestDto): void {
    if (!request.id) return;

    const rejectedBy = prompt('Enter your name for rejection:');
    if (!rejectedBy) return;

    const remarks = prompt('Enter rejection reason:');
    if (!remarks) return;

    this.certificationService.rejectRequest(request.id!, rejectedBy, remarks).subscribe({
      next: () => {
        this.messageService.showSuccess('Request rejected successfully');
        this.loadCertificationRequests();
        this.loadStatistics();
      },
      error: (error: any) => {
        console.error('Error rejecting request:', error);
        this.messageService.showError('Failed to reject request');
      }
    });
  }

  resetForm(): void {
    this.requestCertificateForm.reset();
    this.editingRequest = null;
    this.initializeForm();
  }

  toggleFormView(): void {
    this.showRequestForm = !this.showRequestForm;
    if (this.showRequestForm) {
      this.resetForm();
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'badge-warning';
      case 'APPROVED': return 'badge-success';
      case 'REJECTED': return 'badge-danger';
      case 'COMPLETED': return 'badge-info';
      default: return 'badge-secondary';
    }
  }

  getClearanceIcon(cleared: boolean): string {
    return cleared ? 'check_circle' : 'cancel';
  }

  getClearanceClass(cleared: boolean): string {
    return cleared ? 'text-success' : 'text-danger';
  }

  getErrorMessage(fieldName: string): string {
    const control = this.requestCertificateForm.get(fieldName);
    if (control?.hasError('required')) {
      return `${fieldName} is required`;
    }
    return '';
  }

  // Get certificate type label for display
  getCertificateTypeLabel(type: string | undefined): string {
    if (!type) return 'General';
    const typeOption = this.certificateTypes.find(ct => ct.value === type);
    return typeOption ? typeOption.label : type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  }

  // Get certificate type badge class
  getCertificateTypeClass(type: string | undefined): string {
    switch (type) {
      case 'LEAVING_CERTIFICATE': return 'badge-primary';
      case 'CHARACTER_CERTIFICATE': return 'badge-info';
      default: return 'badge-secondary';
    }
  }
}

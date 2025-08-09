import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface PaymentDto {
  id?: number;
  indexNo: string;
  namewithInitials: string;
  year: string;
  grade: string;
  term: string;
  amount: number;
  paymentdate: string;
  paymentStatus: 'complete' | 'incomplete';
  createdAt?: string;
}

@Component({
  selector: 'app-payments',
  standalone: false,  
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {
  paymentForm: FormGroup;
  isLoading = false;
  editingPayment: PaymentDto | null = null;
  showForm = true;

  // Mock data
  payments: PaymentDto[] = [
    {
      id: 1,
      indexNo: 'STU001',
      namewithInitials: 'J. Doe',
      year: '2024',
      grade: '13',
      term: '1st Term',
      amount: 15000,
      paymentdate: '2024-03-15',
      paymentStatus: 'complete',
      createdAt: '2024-03-15T10:30:00Z'
    },
    {
      id: 2,
      indexNo: 'STU002',
      namewithInitials: 'S. Smith',
      year: '2024',
      grade: '12',
      term: '1st Term',
      amount: 12000,
      paymentdate: '2024-03-10',
      paymentStatus: 'incomplete',
      createdAt: '2024-03-10T14:20:00Z'
    },
    {
      id: 3,
      indexNo: 'STU003',
      namewithInitials: 'M. Johnson',
      year: '2024',
      grade: '11',
      term: '2nd Term',
      amount: 18000,
      paymentdate: '2024-06-20',
      paymentStatus: 'complete',
      createdAt: '2024-06-20T09:15:00Z'
    }
  ];

  filteredPayments: PaymentDto[] = [];
  searchTerm = '';
  selectedStatus = 'all';
  nextId = 4;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      indexNo: ['', Validators.required],
      namewithInitials: ['', Validators.required],
      year: ['', Validators.required],
      grade: ['', Validators.required],
      term: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      paymentdate: ['', Validators.required],
      paymentStatus: ['incomplete', Validators.required]
    });
  }

  ngOnInit(): void {
    this.filteredPayments = [...this.payments];
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.isLoading = true;
      const formData = this.paymentForm.value;

      if (this.editingPayment) {
        this.updatePayment(formData);
      } else {
        this.createPayment(formData);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  createPayment(formData: PaymentDto): void {
    const newPayment: PaymentDto = {
      ...formData,
      id: this.nextId++,
      amount: Number(formData.amount),
      createdAt: new Date().toISOString()
    };

    this.payments.push(newPayment);
    this.filteredPayments = [...this.payments];
    this.resetForm();
    this.isLoading = false;
    this.showSuccessMessage('Payment record created successfully!');
  }

  updatePayment(formData: PaymentDto): void {
    if (this.editingPayment?.id) {
      const index = this.payments.findIndex(p => p.id === this.editingPayment!.id);
      if (index !== -1) {
        this.payments[index] = {
          ...this.editingPayment,
          ...formData,
          amount: Number(formData.amount)
        };
        this.filteredPayments = [...this.payments];
        this.resetForm();
        this.isLoading = false;
        this.showSuccessMessage('Payment record updated successfully!');
      }
    }
  }

  editPayment(payment: PaymentDto): void {
    this.editingPayment = payment;
    this.showForm = true;
    this.paymentForm.patchValue({
      indexNo: payment.indexNo,
      namewithInitials: payment.namewithInitials,
      year: payment.year,
      grade: payment.grade,
      term: payment.term,
      amount: payment.amount,
      paymentdate: payment.paymentdate,
      paymentStatus: payment.paymentStatus
    });
  }

  deletePayment(payment: PaymentDto): void {
    if (confirm('Are you sure you want to delete this payment record?')) {
      this.payments = this.payments.filter(p => p.id !== payment.id);
      this.filteredPayments = [...this.payments];
      this.showSuccessMessage('Payment record deleted successfully!');
    }
  }

  resetForm(): void {
    this.paymentForm.reset({
      paymentStatus: 'incomplete'
    });
    this.editingPayment = null;
    this.isLoading = false;
  }

  toggleFormView(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.resetForm();
    }
  }

  onSearch(): void {
    this.applyFilters();
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.payments];

    // Filter by search term
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(payment => 
        payment.indexNo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        payment.namewithInitials.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(payment => payment.paymentStatus === this.selectedStatus);
    }

    this.filteredPayments = filtered;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.paymentForm.controls).forEach(key => {
      const control = this.paymentForm.get(key);
      control?.markAsTouched();
    });
  }

  private showSuccessMessage(message: string): void {
    // You can replace this with your message service
    alert(message);
  }

  getStatusClass(status: string): string {
    return status === 'complete' ? 'status-complete' : 'status-incomplete';
  }

  getFormattedAmount(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR'
    }).format(amount);
  }

  getTotalAmount(): number {
    return this.filteredPayments.reduce((total, payment) => total + payment.amount, 0);
  }

  getCompletedPayments(): number {
    return this.filteredPayments.filter(p => p.paymentStatus === 'complete').length;
  }

  getIncompletePayments(): number {
    return this.filteredPayments.filter(p => p.paymentStatus === 'incomplete').length;
  }
}

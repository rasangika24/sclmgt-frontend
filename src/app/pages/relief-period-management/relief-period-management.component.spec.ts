import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReliefPeriodManagementComponent } from './relief-period-management.component';

describe('ReliefPeriodManagementComponent', () => {
  let component: ReliefPeriodManagementComponent;
  let fixture: ComponentFixture<ReliefPeriodManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReliefPeriodManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReliefPeriodManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentSelectionAdmissionComponent } from './recruitment-selection-admission.component';

describe('RecruitmentSelectionAdmissionComponent', () => {
  let component: RecruitmentSelectionAdmissionComponent;
  let fixture: ComponentFixture<RecruitmentSelectionAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitmentSelectionAdmissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruitmentSelectionAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassGradeGenerateComponent } from './class-grade-generate.component';

describe('ClassGradeGenerateComponent', () => {
  let component: ClassGradeGenerateComponent;
  let fixture: ComponentFixture<ClassGradeGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassGradeGenerateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassGradeGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

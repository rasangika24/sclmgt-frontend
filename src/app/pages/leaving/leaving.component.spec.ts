import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavingComponent } from './leaving.component';

describe('LeavingComponent', () => {
  let component: LeavingComponent;
  let fixture: ComponentFixture<LeavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeavingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

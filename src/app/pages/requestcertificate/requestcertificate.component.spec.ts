import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestcertificateComponent } from './requestcertificate.component';

describe('RequestcertificateComponent', () => {
  let component: RequestcertificateComponent;
  let fixture: ComponentFixture<RequestcertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestcertificateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestcertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

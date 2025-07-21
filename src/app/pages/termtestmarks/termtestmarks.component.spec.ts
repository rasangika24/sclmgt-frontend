import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermtestmarksComponent } from './termtestmarks.component';

describe('TermtestmarksComponent', () => {
  let component: TermtestmarksComponent;
  let fixture: ComponentFixture<TermtestmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermtestmarksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermtestmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

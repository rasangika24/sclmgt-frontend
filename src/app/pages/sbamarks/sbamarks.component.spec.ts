import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbamarksComponent } from './sbamarks.component';

describe('SbamarksComponent', () => {
  let component: SbamarksComponent;
  let fixture: ComponentFixture<SbamarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbamarksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SbamarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

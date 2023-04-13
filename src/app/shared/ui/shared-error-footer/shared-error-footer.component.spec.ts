import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedErrorFooterComponent } from './shared-error-footer.component';

describe('SharedErrorFooterComponent', () => {
  let component: SharedErrorFooterComponent;
  let fixture: ComponentFixture<SharedErrorFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SharedErrorFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedErrorFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

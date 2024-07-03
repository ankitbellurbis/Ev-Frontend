import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargerDetailComponent } from './charger-detail.component';

describe('ChargerDetailComponent', () => {
  let component: ChargerDetailComponent;
  let fixture: ComponentFixture<ChargerDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChargerDetailComponent]
    });
    fixture = TestBed.createComponent(ChargerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

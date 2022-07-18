import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeAppComponent } from './stake-app.component';

describe('StakeAppComponent', () => {
  let component: StakeAppComponent;
  let fixture: ComponentFixture<StakeAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

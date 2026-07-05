import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietySettingsComponent } from './society-settings.component';

describe('SocietySettingsComponent', () => {
  let component: SocietySettingsComponent;
  let fixture: ComponentFixture<SocietySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocietySettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocietySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

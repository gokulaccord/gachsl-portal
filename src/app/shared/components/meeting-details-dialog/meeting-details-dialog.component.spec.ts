import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingDetailsDialogComponent } from './meeting-details-dialog.component';

describe('MeetingDetailsDialogComponent', () => {
  let component: MeetingDetailsDialogComponent;
  let fixture: ComponentFixture<MeetingDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

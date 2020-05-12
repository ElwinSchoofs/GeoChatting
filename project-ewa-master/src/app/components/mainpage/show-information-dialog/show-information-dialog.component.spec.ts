import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInformationDialogComponent } from './show-information-dialog.component';

describe('ShowInformationDialogComponent', () => {
  let component: ShowInformationDialogComponent;
  let fixture: ComponentFixture<ShowInformationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowInformationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

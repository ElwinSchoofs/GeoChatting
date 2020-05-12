import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainpageComponent} from './mainpage.component';
import {MatDialog} from "@angular/material/dialog";
import {SessionService} from "../../services/session.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PointsService} from "../../services/points.service";
import {User} from "../../model/user";
import {By} from "@angular/platform-browser";
import {HttpClientTestingModule} from "@angular/common/http/testing";

/**
 * Front-end unit tests.
 *
 * @author Kerim Karaer, 500800038
 */
describe('MainpageComponent', () => {
  let component: MainpageComponent;
  let componentHTML: HTMLElement;
  let fixture: ComponentFixture<MainpageComponent>;
  let sessionServiceStub: Partial<SessionService>;
  let pointsServiceStub: Partial<PointsService>;
  let matDialogStub: Partial<MatDialog>;
  let snackBarStub: Partial<MatSnackBar>;
  let routerStub: Partial<Router>;
  let unitTestUser;
  const TEST_USER_ID = 123456789;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainpageComponent],
      providers: [
        {provide: Router, useValue: routerStub},
        {provide: SessionService, useClass: SessionService},
        {provide: PointsService, useValue: pointsServiceStub},
        {provide: MatDialog, useValue: matDialogStub},
        {provide: MatSnackBar, useValue: snackBarStub},
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    unitTestUser = new User("test@unit.nl", "unit_testing", "Unit tester");
    unitTestUser.id = TEST_USER_ID;
    fixture = TestBed.createComponent(MainpageComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.nativeElement;
    fixture.detectChanges();
  });

  // it('Should be setup component correctly', () => {
  //   expect(component).toBeTruthy();
  //   expect(componentHTML).toBeTruthy();
  // });
  //
  // it('should have leaflet maps loaded on the page', () => {
  //   let element = componentHTML.querySelector('div.leaflet-pane.leaflet-map-pane');
  //
  //   if(element != null){
  //     expect(element).toBeTruthy();
  //   }
  // });

  it('should have leaflet maps loaded on the page', () => {
    component.currentUser = null;
    let element = componentHTML.querySelector('div.leaflet-pane.leaflet-map-pane');

    if (element != null) {
      expect(element).toBeTruthy();
    } else {
      fail();
    }
  });

  it('should have info button when not signed in', () => {
    component.currentUser = null;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css("#info-btn"));

    if (element != null) {
      expect(element).toBeTruthy();
    } else {
      fail();
    }
  });

  it('should have sign in button when not signed in', () => {
    component.currentUser = null;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css("#sign-in-btn"));

    if (element != null) {
      expect(element).toBeTruthy();
    } else {
      fail();
    }
  });

  it('should not have info button when signed in', () => {
    component.currentUser = unitTestUser;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css("#info-btn"));

    if (element == null) {
      expect(element).toBeNull();
    } else {
      fail();
    }
  });

  it('should not have info button when signed in', () => {
    component.currentUser = unitTestUser;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css("#sign-in-btn"));

    if (element == null) {
      expect(element).toBeNull();
    } else {
      fail();
    }
  });

  it('should not have profile button when signed off', () => {
    component.currentUser = null;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css("#profile-btn"));

    if (element == null) {
      expect(element).toBeNull();
    } else {
      fail();
    }
  });

  it('should have profile button when signed in', () => {
    component.currentUser = unitTestUser;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css("#profile-btn"));

    if (element != null) {
      expect(element).toBeTruthy();
    } else {
      fail();
    }
  });

  it('should have zoom control buttons while signed off', () => {
    component.currentUser = null;
    fixture.detectChanges();
    let element = fixture.debugElement.nativeElement.querySelector("div.leaflet-control-zoom.leaflet-bar.leaflet-control");

    if (element != null) {
      expect(element).toBeTruthy();
    } else {
      fail();
    }
  });

  it('should have zoom control buttons while signed in', () => {
    component.currentUser = unitTestUser;
    fixture.detectChanges();
    let element = fixture.debugElement.nativeElement.querySelector("div.leaflet-control-zoom.leaflet-bar.leaflet-control");

    if (element != null) {
      expect(element).toBeTruthy();
    } else {
      fail();
    }
  });

  it('should have zoom control buttons on bottom left to not overlap other buttons', () => {
    component.currentUser = null;
    fixture.detectChanges();
    let element = fixture.debugElement.nativeElement.querySelector("div.leaflet-bottom.leaflet-left");

    if (element != null) {
      expect(element).toBeTruthy();
    } else {
      fail();
    }
  });
});

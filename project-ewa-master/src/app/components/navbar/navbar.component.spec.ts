import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {RouterTestingModule} from "@angular/router/testing";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {Router} from "@angular/router";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {SessionService} from "../../services/session.service";
import {PointsService} from "../../services/points.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {ProfileSettingsDialogComponent} from "../profilepage/profile-settings-dialog/profile-settings-dialog.component";
import {BrowserModule, By} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatStepperModule} from "@angular/material/stepper";
import {MatTabsModule} from "@angular/material/tabs";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatChipsModule} from "@angular/material/chips";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AppComponent} from "../../app.component";
import {MainpageComponent} from "../mainpage/mainpage.component";
import {ProfilepageComponent} from "../profilepage/profilepage.component";
import {ChangePasswordDialogComponent} from "../profilepage/change-password-dialog/change-password-dialog.component";
import {DeleteProfileDialogComponent} from "../profilepage/delete-profile-dialog/delete-profile-dialog.component";
import {CreatePostDialogComponent} from "../mainpage/create-post-dialog/create-post-dialog.component";
import {ShowInformationDialogComponent} from "../mainpage/show-information-dialog/show-information-dialog.component";
import {LoginOrRegisterDialogComponent} from "../mainpage/login-or-register-dialog/login-or-register-dialog.component";
import {SettingspageComponent} from "../admin/settingspage/settingspage.component";
import {UsersComponent} from "../admin/users/users.component";
import {MessageComponent} from "../admin/message/message.component";
import {AddUserDialogComponent} from "../admin/users/users-dialog/add-user-dialog/add-user-dialog.component";
import {DeleteUserDialogComponent} from "../admin/users/users-dialog/delete-user-dialog/delete-user-dialog.component";
import {SaveChangesDialogComponent} from "../admin/settingspage/save-changes-dialog/save-changes-dialog.component";
import {User} from "../../model/user";

/**
 * Front-end unit tests.
 *
 * @author Elwin Schoofs
 * 500801469
 */
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let componentHTML: HTMLElement;
  let fixture: ComponentFixture<NavbarComponent>;
  let routerStub: Partial<Router>;
  let sessionServiceStub: Partial<SessionService>;
  let matSnackBarStub: Partial<MatSnackBar>;
  let unitTestUser;
  const TEST_USER_ID = 123456789;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MainpageComponent,
        ProfilepageComponent,
        ChangePasswordDialogComponent,
        DeleteProfileDialogComponent,
        ProfileSettingsDialogComponent,
        CreatePostDialogComponent,
        ShowInformationDialogComponent,
        NavbarComponent,
        LoginOrRegisterDialogComponent,
        SettingspageComponent,
        UsersComponent,
        MessageComponent,
        AddUserDialogComponent,
        DeleteUserDialogComponent,
        SaveChangesDialogComponent
      ],
      imports: [
        HttpClientTestingModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatStepperModule,
        MatTabsModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        RouterTestingModule
      ],
      providers: [
        {provide: SessionService, useClass: SessionService},
        {provide: MatSnackBar, useValue: matSnackBarStub}
        ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    unitTestUser = new User("test@unit.nl", "unit_testing", "Unit tester", true);
    unitTestUser.id = TEST_USER_ID;
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.nativeElement;
    component.currentUser = unitTestUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(componentHTML).toBeTruthy();
  });

  it('should not have navbar button when not signed in', () => {
    component.currentUser = null;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css("#navbar-btn"));

    if (element == null) {
      expect(element).toBeNull();
    } else {
      fail();
    }
  });

  it('should not have navbar button when signed in user is not admin', () => {
    component.currentUser = unitTestUser;
    component.currentUser.unAdmin();
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css("#navbar-btn"));

    if (element == null) {
      expect(element).toBeNull();
    } else {
      fail();
    }
  });

  it('should have navbar button when signed in as admin', () => {
    component.currentUser = unitTestUser;
    component.currentUser.makeAdmin();
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css("#navbar-btn"));

    if (element != null) {
      expect(element).toBeTruthy();
    } else {
      fail();
    }
  });

  it('should show navbar', () => {
    component.currentUser = unitTestUser;
    component.currentUser.makeAdmin();
    component.forceOpenState = true;
    fixture.detectChanges();
    let navbar = fixture.debugElement.query(By.css("#navbar-container"));

    if (navbar != null) {
      expect(navbar.nativeNode.style.visibility).toBe('');
    } else {
      fail();
    }
  });

  it('should hide navbar', () => {
    component.currentUser = unitTestUser;
    component.currentUser.makeAdmin();
    component.forceOpenState = false;
    fixture.detectChanges();
    let navbar = fixture.debugElement.query(By.css("#navbar-container"));

    if (navbar != null) {
      expect(navbar.nativeNode.style.visibility).toBe('hidden');
    } else {
      fail();
    }
  });

  it('should navigate to users page of admin environment', () => {
    component.currentUser = unitTestUser;
    component.currentUser.makeAdmin();
    component.forceOpenState = true;
    fixture.detectChanges();

    let href = fixture.debugElement.query(By.css('a#users-nav-btn')).nativeElement
      .getAttribute('href');
    expect(href).toEqual('/users');
  });

  it('should navigate to settings page of admin environment', () => {
    component.currentUser = unitTestUser;
    component.currentUser.makeAdmin();
    component.forceOpenState = true;
    fixture.detectChanges();

    let href = fixture.debugElement.query(By.css('a#settings-nav-btn')).nativeElement
      .getAttribute('href');
    expect(href).toEqual('/settings');
  });

  it('should indicate which role accesses the navigation', () => {
    component.currentUser = unitTestUser;
    component.currentUser.makeAdmin();
    component.forceOpenState = true;
    fixture.detectChanges();
    let element = fixture.debugElement.nativeElement.querySelector("h4").textContent;

    expect(element).toContain('Admin');
  });

  it('should have settings icon for navigation\'s button', () => {
    component.currentUser = unitTestUser;
    component.currentUser.makeAdmin();
    component.forceOpenState = true;
    fixture.detectChanges();
    let element = fixture.debugElement.nativeElement.querySelector("#navbar-btn mat-icon").textContent;

    expect(element).toContain('settings_application');
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepageComponent } from './profilepage.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {BrowserModule, DomSanitizer} from "@angular/platform-browser";
import {SessionService} from "../../services/session.service";
import {SequenceEqualSubscriber} from "rxjs/internal/operators/sequenceEqual";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "../../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
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
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MainpageComponent} from "../mainpage/mainpage.component";
import {EventEmitter, NgModule} from "@angular/core";
import {AppComponent} from "../../app.component";
import {ChangePasswordDialogComponent} from "./change-password-dialog/change-password-dialog.component";
import {DeleteProfileDialogComponent} from "./delete-profile-dialog/delete-profile-dialog.component";
import {ProfileSettingsDialogComponent} from "./profile-settings-dialog/profile-settings-dialog.component";
import {CreatePostDialogComponent} from "../mainpage/create-post-dialog/create-post-dialog.component";
import {ShowInformationDialogComponent} from "../mainpage/show-information-dialog/show-information-dialog.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {LoginOrRegisterDialogComponent} from "../mainpage/login-or-register-dialog/login-or-register-dialog.component";
import {SettingspageComponent} from "../admin/settingspage/settingspage.component";
import {UsersComponent} from "../admin/users/users.component";
import {MessageComponent} from "../admin/message/message.component";
import {AddUserDialogComponent} from "../admin/users/users-dialog/add-user-dialog/add-user-dialog.component";
import {DeleteUserDialogComponent} from "../admin/users/users-dialog/delete-user-dialog/delete-user-dialog.component";
import {SaveChangesDialogComponent} from "../admin/settingspage/save-changes-dialog/save-changes-dialog.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {User} from "../../model/user";
import {Gps} from "../../model/gps";
import {of} from "rxjs";

describe('ProfilepageComponent', () => {
  let component: ProfilepageComponent;
  let fixture: ComponentFixture<ProfilepageComponent>;
  let matDialogStub: Partial<MatDialog>;
  let matIconRegistryStub: Partial<MatIconRegistry>;
  let domSanatizerStub: Partial<DomSanitizer>;
  let sessionServiceStub: Partial<SessionService>;
  let dialogSpySettings: jasmine.Spy;
  let dialogSpyPassword: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });

  beforeEach(async(() => {
  //public dialog: MatDialog, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private sessionService: SessionService
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
        FormsModule,
        MatCheckboxModule,
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
        MatPaginatorModule],

      providers: [
        {provide: MatDialog, useValue: matDialogStub},
        {provide: SessionService, useClass: MockSessionService},
        {provide: MatIconRegistry, useClass: MatIconRegistry}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (fixture.nativeElement) {
      (fixture.nativeElement as HTMLElement).remove();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /**
   * Test 4
   * @author Niels Bierman 500801926
   */
  it('should show correct username and email in profilepage', () => {
    expect(component.currentUser.getEmail()).toBe("test@demo.nl");
    expect(component.currentUser.getNickname()).toBe("test");
  });
  /**
   * Test 5
   * @author Niels Bierman 500801926
   */
  it('should save username and email on button click', () => {
    component.profileForm.value.email = "demo@test.nl";
    component.profileForm.value.nickname = "demo";
    component.saveProfileChanges();
    expect(component.currentUser.getEmail()).toBe("demo@test.nl");
    expect(component.currentUser.getNickname()).toBe("demo");
  });
  /**
   * Test 6
   * @author Niels Bierman 500801926
   * continues @ session service
   */
  it('should open dialog window on button click', () => {
    dialogSpySettings = spyOn(component, 'openSettingsDialog').and.returnValue(dialogRefSpyObj);
    dialogSpyPassword = spyOn(component, 'openPasswordDialog').and.returnValue(dialogRefSpyObj);
    component.openPasswordDialog();
    component.openSettingsDialog();
    expect(dialogSpySettings).toHaveBeenCalled();
    expect(dialogSpyPassword).toHaveBeenCalled();
  });
});


export class MockSessionService{
  testUser: User = new User("test@demo.nl", "test123", "test");
  currentUser = new EventEmitter<User>();
  currentGps = new EventEmitter<Gps>();
  getCurrentUser(){
    return this.testUser
  }
  updateUser(user: User) {
    this.testUser = user;
  }
  signOff(){

  }
  getInternalGps(){

  }
  getIndex(){

  }
}


import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfileDialogComponent } from './delete-profile-dialog.component';
import {Router} from "@angular/router";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {SessionService} from "../../../services/session.service";
import {ProfileSettingsDialogComponent} from "../profile-settings-dialog/profile-settings-dialog.component";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {FormsModule} from "@angular/forms";
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
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../../app-routing.module";
import {AppComponent} from "../../../app.component";
import {MainpageComponent} from "../../mainpage/mainpage.component";
import {ProfilepageComponent} from "../profilepage.component";
import {ChangePasswordDialogComponent} from "../change-password-dialog/change-password-dialog.component";
import {CreatePostDialogComponent} from "../../mainpage/create-post-dialog/create-post-dialog.component";
import {ShowInformationDialogComponent} from "../../mainpage/show-information-dialog/show-information-dialog.component";
import {NavbarComponent} from "../../navbar/navbar.component";
import {LoginOrRegisterDialogComponent} from "../../mainpage/login-or-register-dialog/login-or-register-dialog.component";
import {SettingspageComponent} from "../../admin/settingspage/settingspage.component";
import {UsersComponent} from "../../admin/users/users.component";
import {MessageComponent} from "../../admin/message/message.component";
import {AddUserDialogComponent} from "../../admin/users/users-dialog/add-user-dialog/add-user-dialog.component";
import {DeleteUserDialogComponent} from "../../admin/users/users-dialog/delete-user-dialog/delete-user-dialog.component";
import {SaveChangesDialogComponent} from "../../admin/settingspage/save-changes-dialog/save-changes-dialog.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {User} from "../../../model/user";

describe('DeleteProfileDialogComponent', () => {
  let component: DeleteProfileDialogComponent;
  let fixture: ComponentFixture<DeleteProfileDialogComponent>;
  let routerStub: Partial<Router>;
  let sessionServiceStub: Partial<SessionService>;
  let matDialogRefStub: Partial<MatDialogRef<DeleteProfileDialogComponent>>;
  let matSnackBarStub: Partial<MatSnackBar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        BrowserAnimationsModule,
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
      providers: [{provide: Router, useClass: class{ navigate = jasmine.createSpy('navigate'); } },
        {provide: SessionService, useClass: MockSessionService},
        {provide: MatDialogRef, useClass: class{ close = jasmine.createSpy("close"); } },
        {provide:MatSnackBar, useClass: MatSnackBar}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProfileDialogComponent);
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

  it('should redirect on account delete', () => {
    component.deleteProfile();
    expect(component.router.navigate).toHaveBeenCalledWith(['']);
  });
  /**
   * Test 2
   * @author Niels Bierman 500801926
   */
  it('should deactivate account on account delete', () => {
    component.deleteProfile();
    expect(component.currentUser.getIsActive()).toBeFalsy();
  });
  /**
   * Test 3
   * @author Niels Bierman 500801926
   * continues @ profilepage
   */
  it('should show pop-up on account delete', () => {
    spyOn(component, "openSnackBar");
    component.deleteProfile();
    expect(component.openSnackBar).toHaveBeenCalled();
  });
});

export class MockSessionService{
  testUser: User = new User("test@demo.nl", "test123", "test");
  getCurrentUser(){
    return this.testUser
  }
  updateUser(user: User) {
    this.testUser = user;
  }
  signOff(){

  }
}

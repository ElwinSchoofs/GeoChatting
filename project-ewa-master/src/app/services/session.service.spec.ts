import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing.module";
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
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AppComponent} from "../app.component";
import {MainpageComponent} from "../components/mainpage/mainpage.component";
import {ProfilepageComponent} from "../components/profilepage/profilepage.component";
import {ChangePasswordDialogComponent} from "../components/profilepage/change-password-dialog/change-password-dialog.component";
import {DeleteProfileDialogComponent} from "../components/profilepage/delete-profile-dialog/delete-profile-dialog.component";
import {ProfileSettingsDialogComponent} from "../components/profilepage/profile-settings-dialog/profile-settings-dialog.component";
import {CreatePostDialogComponent} from "../components/mainpage/create-post-dialog/create-post-dialog.component";
import {ShowInformationDialogComponent} from "../components/mainpage/show-information-dialog/show-information-dialog.component";
import {NavbarComponent} from "../components/navbar/navbar.component";
import {LoginOrRegisterDialogComponent} from "../components/mainpage/login-or-register-dialog/login-or-register-dialog.component";
import {SettingspageComponent} from "../components/admin/settingspage/settingspage.component";
import {UsersComponent} from "../components/admin/users/users.component";
import {MessageComponent} from "../components/admin/message/message.component";
import {AddUserDialogComponent} from "../components/admin/users/users-dialog/add-user-dialog/add-user-dialog.component";
import {DeleteUserDialogComponent} from "../components/admin/users/users-dialog/delete-user-dialog/delete-user-dialog.component";
import {SaveChangesDialogComponent} from "../components/admin/settingspage/save-changes-dialog/save-changes-dialog.component";
import {User} from "../model/user";
import {UserService} from "./repositories/user.service";
import {Observable} from "rxjs";

describe('SessionService', () => {
  let service: SessionService;
  let testUser: User;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      FormsModule,
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
    providers: [{provide: UserService, useClass: MockUserRepository}]

    })

  );
  beforeEach(()=>{
    service = TestBed.get(SessionService);
    testUser = new User("demo2@demo.nl", "test123", "Niels2")
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Test 7
   * @author Niels Bierman 500801926
   */
  it('should not log in on wrong credentials', () => {
    service.signIn(testUser.getEmail(), testUser.getPassword());
    expect(service.internalCurrentUser).toBeUndefined();
  });

  /**
   * Test 8
   * @author Niels Bierman 500801926
   */
  it('should sign off', () => {
    service.setCurrentUser(service.getUserRepository().getUsers()[0]);
    service.signOff();
    expect(service.internalCurrentUser).toBeNull();
  });

  /**
   * Test 9
   * @author Niels Bierman 500801926
   */
  it('should not log in on inactive user', () => {
    service.signIn(service.getUserRepository().getUsers()[0].getEmail(), service.getUserRepository().getUsers()[0].getPassword());
    expect(service.internalCurrentUser).toBeUndefined();
  });

  /**
   * Test 10
   * @author Niels Bierman 500801926
   * end of my front-end tests
   */
  it('should log in', () => {
    service.signIn(service.getUserRepository().getUsers()[2].getEmail(), service.getUserRepository().getUsers()[2].getPassword());
    expect(service.internalCurrentUser).toBe(service.getUserRepository().getUsers()[2]);
  });

});

export class MockUserRepository{
  testUsers: User[];
  constructor() {
    this.testUsers = [];
    this.testUsers.push(new User("test@demo.nl", "test123", "test"));
    this.testUsers[0].deactivateUser();
    this.testUsers.push(new User("demo@test.nl", "test123", "demo"));
    this.testUsers.push(new User("demo@demo.nl", "test123", "Niels"))
  }
  getUsers(){
    return this.testUsers
  }
  save(user: User): Observable<User>{
    return;
  }
}

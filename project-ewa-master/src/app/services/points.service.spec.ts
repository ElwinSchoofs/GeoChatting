import { TestBed } from '@angular/core/testing';

import { PointsService } from './points.service';
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
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {MatTabsModule} from "@angular/material/tabs";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
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
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

describe('PointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
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
      FormsModule,
      MatFormFieldModule,
      MatTabsModule,
      RouterTestingModule,
      HttpClientModule,
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
      MatPaginatorModule
    ],
    providers: [
      {provide: MatDialogRef},
      {provide: MatSnackBar},
      {provide: MatFormFieldControl}
    ]
  })
    .compileComponents()
  );

  // @Author is Luuk Wagenaar, 500799908
   it('should be created', () => {
     const service: PointsService = TestBed.get(PointsService);
     expect(service).toBeTruthy();
   });
});

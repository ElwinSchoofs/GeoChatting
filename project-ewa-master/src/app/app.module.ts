import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainpageComponent} from './components/mainpage/mainpage.component';
import {ProfilepageComponent} from './components/profilepage/profilepage.component';
import { ChangePasswordDialogComponent } from './components/profilepage/change-password-dialog/change-password-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
// Angular Material Components
import {MatCheckboxModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteProfileDialogComponent } from './components/profilepage/delete-profile-dialog/delete-profile-dialog.component';
import { CreatePostDialogComponent } from './components/mainpage/create-post-dialog/create-post-dialog.component';
import { ProfileSettingsDialogComponent } from './components/profilepage/profile-settings-dialog/profile-settings-dialog.component';
import { ShowInformationDialogComponent } from './components/mainpage/show-information-dialog/show-information-dialog.component';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {LoginOrRegisterDialogComponent} from "./components/mainpage/login-or-register-dialog/login-or-register-dialog.component";
import { SettingspageComponent } from './components/admin/settingspage/settingspage.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AddUserDialogComponent } from './components/admin/users/users-dialog/add-user-dialog/add-user-dialog.component';
import { DeleteUserDialogComponent } from './components/admin/users/users-dialog/delete-user-dialog/delete-user-dialog.component';
import {SettingsService} from "./services/repositories/settings.service";


@NgModule({
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
    AddUserDialogComponent,
    DeleteUserDialogComponent,
  ],
  imports: [
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
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SettingsService],
  bootstrap: [AppComponent],
  entryComponents: [
    ChangePasswordDialogComponent,
    DeleteProfileDialogComponent,
    CreatePostDialogComponent,
    ProfileSettingsDialogComponent,
    ShowInformationDialogComponent,
    LoginOrRegisterDialogComponent,
    DeleteUserDialogComponent,
    AddUserDialogComponent,
  ]
})
export class AppModule {
}

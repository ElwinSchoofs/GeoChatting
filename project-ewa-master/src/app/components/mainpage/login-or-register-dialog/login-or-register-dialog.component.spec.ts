import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOrRegisterDialogComponent } from './login-or-register-dialog.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {SettingsService} from "../../../services/repositories/settings.service";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule} from "@angular/forms";
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {RouterTestingModule} from "@angular/router/testing";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {SessionService} from "../../../services/session.service";
import {MatTab, MatTabsModule} from "@angular/material/tabs";
import {MainpageComponent} from "../mainpage.component";
import {Router} from "@angular/router";
import {PointsService} from "../../../services/points.service";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {AppModule} from "../../../app.module";
import {MatTableModule} from "@angular/material/table";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../../app-routing.module";
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
import {MatStepperModule} from "@angular/material/stepper";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatChipsModule} from "@angular/material/chips";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ProfilepageComponent} from "../../profilepage/profilepage.component";
import {SettingspageComponent} from "../../admin/settingspage/settingspage.component";
import {NavbarComponent} from "../../navbar/navbar.component";
import {UsersComponent} from "../../admin/users/users.component";
import {ProfileSettingsDialogComponent} from "../../profilepage/profile-settings-dialog/profile-settings-dialog.component";
import {SaveChangesDialogComponent} from "../../admin/settingspage/save-changes-dialog/save-changes-dialog.component";
import {DeleteUserDialogComponent} from "../../admin/users/users-dialog/delete-user-dialog/delete-user-dialog.component";
import {AddUserDialogComponent} from "../../admin/users/users-dialog/add-user-dialog/add-user-dialog.component";
import {MessageComponent} from "../../admin/message/message.component";
import {ShowInformationDialogComponent} from "../show-information-dialog/show-information-dialog.component";
import {CreatePostDialogComponent} from "../create-post-dialog/create-post-dialog.component";
import {DeleteProfileDialogComponent} from "../../profilepage/delete-profile-dialog/delete-profile-dialog.component";
import {ChangePasswordDialogComponent} from "../../profilepage/change-password-dialog/change-password-dialog.component";
import {AppComponent} from "../../../app.component";

describe('LoginOrRegisterDialogComponent', () => {
  let component: LoginOrRegisterDialogComponent;
  let fixture: ComponentFixture<LoginOrRegisterDialogComponent>;
  let componentHTML: HTMLElement;


  /*beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginOrRegisterDialogComponent],
      imports: [HttpClientTestingModule, MatFormFieldModule, MatTab, HttpClientModule
        ],
      providers: [
        {provide: SessionService, useClass: SessionService}]
    })
    .compileComponents();
  }));*/

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
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOrRegisterDialogComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.nativeElement;
    fixture.detectChanges();
  });

  // @Author is Luuk Wagenaar, 500799908
  it('should setup correctly', () => {
    expect(component).toBeTruthy();
    expect(componentHTML).toBeTruthy();
  });

  // @Author is Luuk Wagenaar, 500799908
  it('Sign in should not be called without being clicked', () => {
    let onSubmitSpy = spyOn(component, 'signIn').and.callThrough();
    expect(onSubmitSpy).not.toHaveBeenCalled();
    expect(onSubmitSpy).toHaveBeenCalledTimes(0);
  });

  // @Author is Luuk Wagenaar, 500799908
  it('Sign up should not be called without being clicked', () => {
    let onSubmitSpy = spyOn(component, 'signUp').and.callThrough();
    expect(onSubmitSpy).not.toHaveBeenCalled();
    expect(onSubmitSpy).toHaveBeenCalledTimes(0);
  });

  // @Author is Luuk Wagenaar, 500799908
  it('button should be visible on the page', () => {
    let button = componentHTML.querySelector('#button1');
    expect(button != null).toBeTruthy();
  });

  // @Author is Luuk Wagenaar, 500799908
  it('button should not be visible on the page', () => {
    let button = componentHTML.querySelector('#button2');
    expect(button != null).toBeFalsy();
  });

  // @Author is Luuk Wagenaar, 500799908
  it('button should not be visible on the page', () => {
    let button = componentHTML.querySelector('#button1');
    expect(button == null).toBeFalsy();
  });

  // @Author is Luuk Wagenaar, 500799908
  it('button should be visible on the page', () => {
    let button = componentHTML.querySelector('#button2');
    expect(button == null).toBeTruthy();
  });
});

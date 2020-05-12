/**
 * @Author Sarah Rehman
 * student number: 500798305
 * front-units tests
 */


import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { SettingspageComponent } from './settingspage.component';
import {HttpClientModule} from "@angular/common/http";
import {SettingsService} from "../../../services/repositories/settings.service";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule, MatToolbarRow} from "@angular/material/toolbar";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { RouterTestingModule } from '@angular/router/testing';
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";


describe('SettingspageComponent', () => {

  let component: SettingspageComponent;
  let fixture: ComponentFixture<SettingspageComponent>;
  let componentHTML: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        SettingsService,
        MatIconModule,
        MatToolbarModule,
        FormsModule,
        MatFormFieldModule,
        RouterTestingModule,
        MatInputModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],
      declarations: [SettingspageComponent],

      providers: [
        {provide: SettingsService, useClass: SettingsService},]
    })
      .compileComponents();
    fixture = TestBed.createComponent(SettingspageComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.nativeElement;
    fixture.detectChanges();
  }));

  afterEach(() => {
    if (fixture.nativeElement) {
      (fixture.nativeElement as HTMLElement).remove();
    }
  });

  it('Settings should be setup component correctly', () => {
    expect(component).toBeTruthy();
    expect(componentHTML).toBeTruthy();
  });


  it('Settings should have a value', () => {
    expect(component.displayTimeSetting).toBeDefined();
    expect(component.messageLengthSetting).toBeDefined();
    expect(component.messagePointsSetting).toBeDefined();
    expect(component.messageRadiusSetting).toBeDefined();
  });

  it('Settings Maximum', () => {
    expect(component. displayTimeSetting.length).toBeLessThan(500);
    expect(component.messagePointsSetting.length).toBeLessThan(100);
    expect(component.displayTimeSetting.length).toBeLessThan(3600);
    expect(component.messageRadiusSetting.length).toBeLessThan(150);
  });


  it('Settings Minimum', () => {
    expect(component.messageLengthSetting.length).toBeGreaterThan(-1);
    expect(component.messagePointsSetting.length).toBeGreaterThan(-1);
    expect(component.displayTimeSetting.length).toBeGreaterThan(-1);
    expect(component.messageRadiusSetting.length).toBeGreaterThan(-1);
  });


  it('The button should not be called without being clicked', () => {
    let onSubmitSpy = spyOn(component, 'saveChanges').and.callThrough();
    expect(onSubmitSpy).not.toHaveBeenCalled();
    expect(onSubmitSpy).toHaveBeenCalledTimes(0);
  });


  it('should call the saveChanges method 2 times', () => {
    fixture.detectChanges();

    let onSubmitSpy = spyOn(component, 'saveChanges').and.callThrough();
    expect(onSubmitSpy).not.toHaveBeenCalled();

    let button = fixture.nativeElement.querySelector('#button');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Save Changes');

    button.click();
    button.click();
    expect(onSubmitSpy).toHaveBeenCalledTimes(2);
  });


  it('should have button on the page', () => {
    let button = componentHTML.querySelector('#button');
      expect(button != null).toBeTruthy();
  });

  it('should not have button on the page', () => {
    let button = componentHTML.querySelector('#button');
      expect(button == null).toBeFalsy();
  });
});

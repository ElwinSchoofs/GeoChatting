import {Component, ElementRef, NgModule, OnInit, ViewChild} from '@angular/core';
import {Setting} from "../../../model/setting";
import {SessionService} from "../../../services/session.service";
import {SettingsService} from "../../../services/repositories/settings.service";
import {FormsModule, NgForm, NgModel, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientTestingModule} from "@angular/common/http/testing";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientTestingModule
  ],
  declarations: [],
  bootstrap: [ SettingspageComponent ]
})
@Component({
  selector: 'app-settingspage',
  templateUrl: './settingspage.component.html',
  styleUrls: ['./settingspage.component.scss'],
  providers: [SettingsService],
})
export class SettingspageComponent implements OnInit {

  settings: Setting[];
  displayTimeSetting: string;
  messageRadiusSetting: string;
  messagePointsSetting: string;
  messageLengthSetting: string;
  settingsSubscription: any;

  /**
   * create form for in the html.file
   */
  @ViewChild('settingsForm', {static: false}) private settingsForm: NgForm;

  /**
   *giving each settings a value through a array
   */
  constructor(private sessionService: SessionService) {
    this.settings = [];
    this.settingsSubscription = this.sessionService.getSettingsRepository().findAll().subscribe(
      (settings: Setting[]) => {
        console.log(settings);
        this.settings = settings.map(setting => Setting.returnObject(setting));
        console.log(this.settings);
        this.displayTimeSetting = this.settings[0].getContent();
        this.messageRadiusSetting = this.settings[1].getContent();
        this.messagePointsSetting = this.settings[2].getContent();
        this.messageLengthSetting = this.settings[3].getContent();
      },
      (error) => {
        console.log("Error: Status " + error.status + " - " + error.error);
      });
    console.log(this.settings);
  }

  ngOnInit() {
  }



  /**
   * saving all the settings by getting
   * the values from the settingsForm
   */
  saveChanges() {
    const value = parseInt(this.settingsForm.value.messagePoints);
    this.settings[0].setContent(String(parseInt(this.settingsForm.value.displayTime)));
    this.settings[1].setContent(String(parseInt(this.settingsForm.value.messageRadius)));
    this.settings[2].setContent(String((value < 5) ? 5 : value));
    this.settings[3].setContent(String(parseInt(this.settingsForm.value.messageLength)));
    //
    // this.settings[0] = this.displayTimeSetting;
    // this.settings[1] = this.messageRadiusSetting;
    // this.settings[2] = this.messagePointsSetting;
    // this.settings[3] = this.messageLengthSetting;
    console.log(this.settings);
    this.sessionService.updateCurrentSettings(this.settings);

  }
}

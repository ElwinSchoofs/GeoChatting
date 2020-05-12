import {Component, Injectable, NgModule} from '@angular/core';
import {Setting} from "../../model/setting";
import {User} from "../../model/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
@NgModule({

})
export class SettingsService {


  private readonly ACCESS_URL: string = "http://localhost:8080/settings";
  private updateUrl: string = "http://localhost:8080/settings/";
  settings: Setting[];
  // constructor() {
  //   this.settings = [];
  //   const testSettings = [
  //     new Setting(0, "displayTime", 3600),
  //     new Setting(1, "messageRadius", 150),
  //     new Setting(2, "messagePoints", 10),
  //     new Setting(3, "messageLength", 500)
  //   ];
  //
  //   for(let i=0;i<testSettings.length;i++){
  //     this.settings.push(testSettings[i]);
  //     console.log(this.settings)
  //   }
  // }


  // /**
  //  * return all Settings
  //  */
  // getAll(){
  //   return this.settings;
  // }
  //
  //
  // /**
  //  * Get setting by calling its Id number
  //  */
  // getSettingById(_id: number){
  //   for(let i=0;i<this.settings.length;i++){
  //     if(this.settings[i].getId() == _id){
  //       return this.settings[i]
  //     }
  //   }
  //   return null;
  // }
  //
  // /**
  //  * Updating the setting by checking
  //  * the Id numbers and content befor doing so
  //  */
  // updateSetting(_id:number, _content:number){
  //   for(let i=0;i<this.settings.length;i++){
  //     if(this.settings[i].getId() == _id){
  //       this.settings[i].setContent(_content);
  //       return true;
  //     }
  //   }
  //   return false;
  // }


  constructor(private httpClient: HttpClient) {
    this.settings = [];
    this.findAll().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        this.settings.push(Setting.returnObject(res[i]));
      }
    });
  }


  public findAll(): Observable<Setting []> {
    return this.httpClient.get<Setting[]>(this.ACCESS_URL);
  }


  public deleteById(id: number): any {
    const url = this.updateUrl + id;
    return this.httpClient.delete<Setting>(url);
  }

  public save(entity: Setting): Observable<Setting> {
    this.settings.push(entity);
    console.log(this.settings);
    return this.httpClient.post<Setting>(this.ACCESS_URL, entity);
  }

  public update(entity: Setting): Observable<Setting> {
    const url = this.updateUrl + entity.getId();
    console.log(entity);
    console.log(url);
    return this.httpClient.put<Setting>(url, entity);
  }

  public getSetting(): Setting[] {
    return this.settings;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

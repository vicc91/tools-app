import { Injectable } from "@angular/core";
import { AngularFireRemoteConfig } from '@angular/fire/remote-config';
import { Plugins } from "@capacitor/core"  ;

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AppLanguageService {
  constructor(private afRemoteConfig: AngularFireRemoteConfig) {}

  private async getAllAppTexts(): Promise<string> {
    return this.afRemoteConfig.strings.texts.toPromise();
  }

  async saveAppTexts(): Promise<void> {
    const texts = await this.getAllAppTexts();    
    await Storage.set({ key: 'texts', value: texts });
  }

  async getPageTexts(page: string): Promise<any> {
    const texts = await Storage.get({ key: 'texts' });
    const textsObj = JSON.parse(texts.value);
    return textsObj[page];
  }

  async getMenuTexts(): Promise<any> {
    const res = await this.afRemoteConfig.strings.menu.toPromise();
    const menuTexts = JSON.parse(res);
    return menuTexts;
  }
}
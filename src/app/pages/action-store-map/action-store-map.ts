import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController, NavController} from '@ionic/angular';
import { StoreService } from 'src/app/shared/services/store.service';
import { AppLanguageService } from 'src/app/shared/services/app-language.service';

@Component({
  selector: 'action-store-map',
  templateUrl: './action-store-map.html',
  styleUrls: ['./action-store-map.scss']
})
export class ActionStoreMapComponent implements OnInit {
  idAlly: string;
  store: any;
  closeBtnText: string;

  constructor(
    private modalCtrl: ModalController,
    private storeService: StoreService,
    private navCtrl: NavController,
    private appLanguageService: AppLanguageService,
    navParams: NavParams
  ) {
    this.idAlly = navParams.get('idAlly');
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  async ngOnInit(): Promise<void> {
    const texts = await this.appLanguageService.getPageTexts('formMessages');
    this.closeBtnText = texts.closeButton;

    this.storeService.getStore(this.idAlly).subscribe(
      store => {
        this.store = store;
      }
    );
  }

  openChat(): void {
    this.navCtrl.navigateForward(`/chat/${this.idAlly}`);
    this.dismiss();
  }

  openStore(): void {
    this.navCtrl.navigateForward(`/ally/${this.idAlly}`);
    this.dismiss();
  }
}
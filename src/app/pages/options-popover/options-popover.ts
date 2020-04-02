import { Component, OnInit } from "@angular/core";
import { PopoverController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Role } from 'src/app/interfaces/enums';
import { User } from 'src/app/interfaces/user';

@Component({
  templateUrl: './options-popover.html'
})
export class OptionsPopover implements OnInit {
  toRole: string;
  user: User;

  constructor(
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.user = await this.dataStorageService.getUser();
    if (this.user.selectedRole === Role.Customer) {
      this.toRole = 'Cambiar a aliado';
    } else {
      this.toRole = 'Cambiar a cliente';
    }
  }

  async changeRole(): Promise<void> {
    if (this.user.selectedRole === Role.Ally) {
      const updatedUser: User = {
        uid: this.user.uid,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
        roles: this.user.roles,
        selectedRole: Role.Customer,
        provider: this.user.provider
      }
      await this.dataStorageService.saveUser(updatedUser);
      this.navCtrl.navigateRoot(`${Role.Customer}`);
    }

    if (this.user.selectedRole === Role.Customer) {
      const updatedUser: User = {
        uid: this.user.uid,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
        roles: this.user.roles,
        selectedRole: Role.Ally,
        provider: this.user.provider
      }
      await this.dataStorageService.saveUser(updatedUser);
      this.navCtrl.navigateRoot(`${Role.Ally}`);
    }
    await this.popoverCtrl.dismiss();
  }

  logOut(): void {
    this.authService.logout();
    this.popoverCtrl.dismiss();
  }
}
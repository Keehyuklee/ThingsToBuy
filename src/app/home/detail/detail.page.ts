import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NavController, ToastController, AlertController } from '@ionic/angular';

import { HomeService } from '../home.service';
import { Item } from '../home.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  item: Item;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private homeService: HomeService,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/home');
        return;
      }
      this.item = this.homeService.getItem(paramMap.get('id'));
    });
  }

  onEdit() {
    this.router.navigate(['/', 'home', 'edit', this.item.id]);
  }

  async onDelete() {
    this.alertCtrl.create({
      header: 'Delete Item',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.homeService.deleteItem(this.item.id);
            this.router.navigate(['/']);
            this.toastCtrl.create({
              message: this.item.title + ' Removed from the list',
              duration: 2000,
              cssClass: 'toast-message'
            })
            .then(toastEl => {
              toastEl.present();
            });
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}

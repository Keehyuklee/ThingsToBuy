import { Component, OnInit } from '@angular/core';

import { ModalController, ToastController } from '@ionic/angular';

import { HomeService } from '../home.service';
import { Item } from '../home.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  today = new Date();

  constructor(
    private modalCtrl: ModalController,
    private homeService: HomeService,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onSave(name, qty, date) {
    this.homeService.addItem(new Item(this.homeService.items.length + 1, name, new Date(), date, qty));
    this.toastCtrl.create({
      message: 'SAVED',
      duration: 2000,
      cssClass: 'toast-message'
    })
    .then(toastEl => {
      toastEl.present();
    });
    this.modalCtrl.dismiss(null, 'saved');
  }

  onReset() {

  }

}

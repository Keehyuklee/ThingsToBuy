import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ModalController, ToastController } from '@ionic/angular';

import { HomeService } from '../home.service';
import { Item } from '../home.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  today = new Date()
  todayString = this.today.getFullYear() + '-' + this.addZero((this.today.getMonth()+1)) + '-' + this.addZero(this.today.getDate());


  constructor(
    private modalCtrl: ModalController,
    private homeService: HomeService,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onSave(form: NgForm) {
    this.homeService
      .addItem(new Item(
        this.homeService.items.length + 1, 
        form.value.itemName, 
        new Date(), 
        form.value.dueDate,
        form.value.qty));
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

  addZero(num) {
    if (num < 10) {
      num = '0' + num;
    }
    return num;
  }

}

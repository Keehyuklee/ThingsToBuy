import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('createForm') creatForm: NgForm;
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

  onSave() {
    this.homeService
      .addItem(new Item(
        this.homeService.items.length + 1, 
        this.creatForm.value['itemName'], 
        new Date().toISOString(), 
        this.creatForm.value['dueDate'] ? this.creatForm.value['dueDate'] : null,
        this.creatForm.value.qty));
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

  addZero(num) {
    if (num < 10) {
      num = '0' + num;
    }
    return num;
  }

}

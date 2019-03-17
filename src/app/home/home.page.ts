import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { CreateComponent } from './create/create.component';
import { HomeService } from './home.service';

import { Item } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loadedItems: Item[];

  constructor(
    private modalCtrl: ModalController,
    private homeService: HomeService
    ) {}

  ngOnInit() {
    this.loadedItems = this.homeService.items;
  }

  onAddNewItem() {
    this.modalCtrl
      .create({
        component: CreateComponent
      })
      .then(modalEl => {
        modalEl.present();
      })
  }

}

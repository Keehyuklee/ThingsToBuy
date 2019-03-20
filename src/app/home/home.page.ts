import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController, IonItemSliding } from '@ionic/angular';

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
    private homeService: HomeService,
    private router: Router
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
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if(resultData.role === 'saved') {
          this.loadedItems = this.homeService.items;
        }
      })
  }

  onEdit(id: number, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'home', 'edit', id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavController } from '@ionic/angular';

import { HomeService } from '../home.service';
import { Item } from '../home.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  item: Item;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private homeService: HomeService
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
}

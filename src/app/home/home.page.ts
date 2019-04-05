import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { ModalController, IonItemSliding } from "@ionic/angular";

import { CreateComponent } from "./create/create.component";
import { HomeService } from "./home.service";

import { Item } from "./home.model";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit, OnDestroy {
  loadedItems: Item[];
  private itemsSub: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private homeService: HomeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.itemsSub = this.homeService.items.subscribe(items => {
      this.loadedItems = items.sort((a, b) => {
        let dateA = a.dueDate, dateB = b.dueDate;
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
      });
    });
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
        if (resultData.role === "saved") {
          this.ngOnInit();
        }
      });
  }

  onEdit(id: number, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(["/", "home", "edit", id]);
  }

  isPassed(dueDate: string) {
    const today = new Date().toISOString();
    if (today > dueDate) {
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    if (this.itemsSub){
      this.itemsSub.unsubscribe();
    }
  }
}

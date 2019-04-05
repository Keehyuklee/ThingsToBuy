import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

import {
  NavController,
  ToastController,
  AlertController
} from "@ionic/angular";

import { HomeService } from "../home.service";
import { Item } from "../home.model";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.page.html",
  styleUrls: ["./detail.page.scss"]
})
export class DetailPage implements OnInit, OnDestroy {
  item: Item;
  private itemSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private homeService: HomeService,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("id")) {
        this.navCtrl.navigateBack("/home");
        return;
      }
      this.itemSub = this.homeService
        .getItem(paramMap.get("id"))
        .subscribe(item => {
          this.item = item;
        });
    });
  }

  ionViewDidEnter() {
    this.ngOnInit();
  }

  onEdit() {
    this.router.navigate(["/", "home", "edit", this.item.id]);
  }

  async onDelete() {
    this.alertCtrl
      .create({
        header: "Delete Item",
        message: "Are you sure?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {}
          },
          {
            text: "Confirm",
            handler: () => {
              this.homeService.deleteItem(this.item.id).subscribe();
              this.router.navigate(["/"]);
              this.toastCtrl
                .create({
                  message: this.item.title + " Removed from the list",
                  duration: 2000,
                  cssClass: "toast-message"
                })
                .then(toastEl => {
                  toastEl.present();
                });
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  ngOnDestroy() {
    if(this.itemSub){
      this.itemSub.unsubscribe();
    }    
  }
}

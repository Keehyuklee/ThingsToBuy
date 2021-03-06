import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { NavController, ToastController } from "@ionic/angular";

import { HomeService } from "../home.service";
import { Item } from "../home.model";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.page.html",
  styleUrls: ["./edit.page.scss"]
})
export class EditPage implements OnInit, OnDestroy {
  item: Item;
  today = new Date();
  editForm: FormGroup;
  private itemSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private homeService: HomeService,
    private toastCtrl: ToastController
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
          this.editForm = new FormGroup({
            itemName: new FormControl(this.item.title, Validators.required),
            qty: new FormControl(this.item.quantity, Validators.required),
            dueDate: new FormControl(
              this.item.dueDate ? this.item.dueDate : null
            )
          });
        });
    });
  }

  onUpdate() {
    var editedItem = new Item(
      this.item.id,
      this.editForm.value.itemName,
      this.item.addedDate,
      this.editForm.value.dueDate ? this.editForm.value.dueDate : null,
      this.editForm.value.qty
    );
    this.homeService.updateItem(this.item.id, editedItem).subscribe(() => {
      this.router.navigate(["/home/detail/" + this.item.id]);
      this.toastCtrl
        .create({
          message: "UPDATED",
          duration: 2000,
          cssClass: "toast-message"
        })
        .then(toastEl => {
          toastEl.present();
        });
    });
  }

  ngOnDestroy() {
    this.itemSub.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from "../global/global.component";

@Component({
  selector: 'app-detailstab',
  templateUrl: './detailstab.component.html',
  styleUrls: ['./detailstab.component.css']
})

export class DetailsTabComponent implements OnInit{
  loading: boolean = false;
  showdetailstab: boolean = false;
  starclicked: boolean = false;

  ngOnInit() {
    this.starclicked = GlobalConstants.starclickedcheck;
  }

  public favorite() {
    if (this.starclicked == false) {
      this.starclicked = true;
      GlobalConstants.starclickedcheck = true;
      GlobalConstants.hasfavoritecheck = true;
      let weather = JSON.parse(localStorage.getItem('result') as any);
      let favorite = JSON.parse(localStorage.getItem('favorite') as any);
      if (favorite == null) {
        favorite = [];
      }
      favorite.push(weather);
      localStorage.setItem('favorite', JSON.stringify(favorite));
    }
    else {
      this.starclicked = false;
      GlobalConstants.starclickedcheck = false;
      let favorite = JSON.parse(localStorage.getItem('favorite') as any);
      favorite.pop();
      localStorage.setItem('favorite', JSON.stringify(favorite));
    }
  }
}

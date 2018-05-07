import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
declare var loading;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadingLocal: boolean = false;

  constructor(public location: Location, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  loadingEvent() {
    if (this.cdr.detectChanges()) {
      this.loadingLocal = loading;
    }
  }
}

import { Component } from '@angular/core';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Wellbore-Store';
  constructor(NgbConfig: NgbConfig){
    NgbConfig.animation = true;
  }
}

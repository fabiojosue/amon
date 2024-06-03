import { AfterViewInit, Component,OnInit } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  constructor() { }
  title = 'amon-app';
  private map: any;


}

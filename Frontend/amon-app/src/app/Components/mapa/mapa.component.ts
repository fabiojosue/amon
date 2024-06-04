import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})
export class MapaComponent {
  private map: any;

  private initMap(): void {

    const bounds = L.latLngBounds([5.5, -87.1], [11.2, -82.6]);

    this.map = L.map('map', {
      center: [9.9634, -84.1003],
      zoom: 8,
      // maxBounds: bounds,
      // maxBoundsViscosity: 1.0

    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 3
    }).addTo(this.map);

  }

  ngOnInit() {
    this.initMap();
  }

}

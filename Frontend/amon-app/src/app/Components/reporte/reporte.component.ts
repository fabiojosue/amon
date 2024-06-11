import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss'
})
export class ReporteComponent {
  private map: any;
  private marker: any;
  sitekey= '6Lfo6_UpAAAAAPoj1JqqFeDfoB_jxxjA737wHe2y';
  private latitude: string = '0';
  private longitude: string = '0';


  private initMap(): void {
    console.log('initMap');
    if (!this.map) {
      const bounds = L.latLngBounds([5.5, -87.1], [11.2, -82.6]);

      this.map = L.map('mapid', {
        center: [9.9634, -84.1003],
        zoom: 8,

      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 3
      }).addTo(this.map);
    }
    this.map.on('click', (e: any) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;


      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker([lat, lng]).addTo(this.map);
      this.latitude = lat.toString();
      this.longitude = lng.toString();


    });

  }

  encontrarUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        this.map.setView([latitud, longitud], 15);
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
        this.marker = L.marker([latitud, longitud]).addTo(this.map);
        this.latitude = latitud.toString();
        this.longitude = longitud.toString();

      });
    }
    else {
      alert('No se pudo obtener la ubicación');
    }
  }
  onModalShown() {
    this.initMap();
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }


    }, 200);
  }

  // ngOnInit() {
  //   this.onModalShown();
  // }

}

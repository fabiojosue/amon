import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { ReporteComponent } from '../reporte/reporte.component';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  private map: any;
  private userMarker: any;

  constructor(private router: Router) { }

  private initMap(): void {
    const bounds = L.latLngBounds([5.5, -87.1], [11.2, -82.6]);

    this.map = L.map('map', {
      center: [9.937794, -84.075628],
      zoom: 9,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 10
    }).addTo(this.map);

    this.addReportButton();
    this.trackUserLocation();
  }

  private addReportButton(): void {
    const btnReport = L.Control.extend({
      options: {
        position: 'topright'
      },
      onAdd: () => {
        const button = L.DomUtil.create('button');
        button.innerHTML = 'Reportar';
        button.className = 'btn-report';
        button.style.backgroundColor = '#fb5607';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '100px';
        button.style.cursor = 'pointer';
        button.style.width = '150px';
        button.style.height = '100px';
        button.style.fontSize = '22px'; 

        button.onclick = () => {
          const modal = document.getElementById('exampleModal');
          const modalInstance = new bootstrap.Modal(modal as HTMLElement);
          modalInstance.show();
        };
        return button;
      }
    });
    this.map.addControl(new btnReport());
  }

  private trackUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const latlng = L.latLng(position.coords.latitude, position.coords.longitude);
        if (this.userMarker) {
          this.userMarker.setLatLng(latlng);
        } else {
          this.userMarker = L.marker(latlng).addTo(this.map);
        }
        this.map.setView(latlng);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  ngOnInit() {
    this.initMap();
  }
}


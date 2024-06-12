import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import * as bootstrap from 'bootstrap';
import { Report } from '../../Modelo/Report/Report.model';
import 'leaflet.heat';

import { ServiceService } from '../../service/service.service';

interface Reporte {
  lat: number;
  lng: number;
  puntaje: number;
}

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {


  private map: any;
  private userMarker: any;

  private reports: any[] = [];
  private locations: any[] = [];
  private types: any[] = [];

  private reportesObj: Reporte[] = [];

  private heatLayer: any;

  constructor(public service:ServiceService) { }


  private initMap(): void {

    this.map = L.map('map', {
      center: [9.937794, -84.075628],
      zoom: 15,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 10
    }).addTo(this.map);

    this.addReportButton();

    // const heat = L.heatLayer(heatData, { radius: 100 }).addTo(this.map);
    this.addHeatLayer();
  }

  private addHeatLayer(): void {
      console.log(this.reportesObj);
      const heatData = this.reportesObj.map((reporte) => [reporte.lat, reporte.lng, reporte.puntaje]);

      if(this.heatLayer) this.map.removeLayer(this.heatLayer);
  
      this.heatLayer = L.heatLayer(heatData as [L.LatLng | L.HeatLatLngTuple],{
        radius:35,
        blur:25,
        maxZoom: 17,
        gradient: { 0.4: 'blue', 0.6: 'lime', 0.8: 'red' }
      }).addTo(this.map);
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



  private async initReports(): Promise<void> {
    // Convertir las suscripciones en promesas
    const typesPromise = this.service.getTypes().toPromise();
    const locationsPromise = this.service.getLocations().toPromise();
    const reportsPromise = this.service.getReports().toPromise();

    // Esperar a que todas las promesas se resuelvan
    const [types, locations, reports] = await Promise.all([typesPromise, locationsPromise, reportsPromise]);
    this.types = types.types;
    this.locations = locations.locations;
  
   
    this.reports = reports.reports;
    for (let report of this.reports) {
      let r: Reporte = { lat: 0, lng: 0, puntaje: report.type };
      for (let location of this.locations) {
        if (report.location == location._id) {
          r.lat = +location.latitude;
          r.lng = +location.longitude;
        }
      }
      for (let type of this.types) {
        if (report.type == type._id) {
          r.puntaje = +type.weight;
        }
      }
      this.reportesObj.push(r);
    }
  }

  ngOnInit() {
    this.initReports().then(() => {
      this.initMap();
    });
 
  }
}


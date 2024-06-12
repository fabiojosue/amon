import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { ServiceService } from '../../service/service.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss'
})
export class ReporteComponent {
  private map: any;
  private marker: any;
  sitekey = '6Lfo6_UpAAAAAPoj1JqqFeDfoB_jxxjA737wHe2y';
  private latitude: string = '0';
  private longitude: string = '0';
  public types: any = this.getTypes();
  selectedTypeId: string = '';
  captchaisvalid: boolean = false;
  private polygon: any;



  public constructor(private service: ServiceService) { }



  private initMap(): void {
    if (!this.map) {

      this.map = L.map('mapid', {
        center: [9.937266, -84.072582],
        zoom: 15,

      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 13
      }).addTo(this.map);
    }

    const polygonCoords: L.LatLngExpression[] = [
      [9.940182, -84.078527], // Ejemplo de coordenadas
      [9.934925, -84.079071], // Sustituye con las coordenadas reales
      [9.934328, -84.067754],
      [9.939231, -84.066123],
      // [9.9368, -84.0870]
    ]

    this.polygon = L.polygon(polygonCoords, {
      color: 'blue',
      fillColor: '#3388ff',
      fillOpacity: 0.35

    }).addTo(this.map);

    this.map.on('click', this.onMapClick, this);

  }

  private onMapClick(e: any): void {
    const { lat, lng } = e.latlng;
    const point = L.latLng(lat, lng);

    if (this.polygon.getBounds().contains(point)) {

      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker([lat, lng]).addTo(this.map);
      this.latitude = lat.toString();
      this.longitude = lng.toString();
    }
    else {
      this.showAlertWarningPolygon();
    }
  }

  encontrarUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;

        if (this.polygon.getBounds().contains(L.latLng(latitud, longitud))) {
          if (this.marker) {
            this.map.removeLayer(this.marker);
          }
          this.marker = L.marker([latitud, longitud]).addTo(this.map);
          this.latitude = latitud.toString();
          this.longitude = longitud.toString();
        }
        else {
          this.showAlertWarningPolygon();
          return;
        }
        this.map.setView([latitud, longitud], 15);


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

  getTypes() {
    this.service.getTypes().subscribe(
      (res: any) => {
        this.types = res.types;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onCaptchaResolved(token: string | null
  ):void {
    if (token) {
      this.captchaisvalid = true;
    }
  }

  createReport() {

    if (this.selectedTypeId == '') {
      this.showAlertWarningReport();
      return;
    }
    if (this.latitude == '0' || this.longitude == '0') {
      this.showAlertWarningLocation();
      return;
    }
    if (!this.captchaisvalid) {
      this.showAlertWarningCaptcha();
      return;
    }

    const location = { 'latitude': this.latitude, 'longitude': this.longitude };
    let locationId = '';

    this.service.createLocation(location).subscribe({
      next: (res: any) => {
        locationId = res.id;
        const report = { 'type': this.selectedTypeId, 'location': locationId, 'registerDate': new Date() };
        this.service.createReport(report).subscribe({
          next: (res: any) => {

            this.showAlertSuccess();
       
          },
          error: (err) => {
            if (err.status == 409) {
              this.showAlertError();
            }
            else {
              alert('Error en el servidor');
            }
          }
        });

      },
      error: (err) => {
        if (err.status == 409) {
          alert('Error al crear la ubicación');
        }
        else {
          alert('Error en el servidor');
        }
      }



    });
  }

  showAlertSuccess() {
    Swal.fire({
      title: 'Reporte creado',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#fb5607',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });

  }

  showAlertError() {
    Swal.fire({
      title: 'Error al crear el reporte',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#fb5607',
    });

  }

  showAlertWarningReport() {
    Swal.fire({
      title: 'Seleccione un tipo de reporte',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#fb5607',
    });
  }

  showAlertWarningLocation() {
    Swal.fire({
      title: 'Seleccione una ubicación',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#fb5607',
    });
  }

  showAlertWarningCaptcha() {
    Swal.fire({
      title: 'Complete el captcha',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#fb5607',
    });
  }

  showAlertWarningPolygon() {
    Swal.fire({
      title: 'Ubicación fuera del polígono',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#fb5607',
    });
  }

  removeInfo(){
    this.latitude = '0';
    this.longitude = '0';
    this.selectedTypeId = '';
    this.captchaisvalid = false;
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
  }



}

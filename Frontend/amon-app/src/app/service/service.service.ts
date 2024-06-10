import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Location Endpoints
  createLocation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/location`, data);
  }

  updateLocation(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/location/${id}`, data);
  }

  getLocation(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/location/${id}`);
  }

  getLocations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/location`);
  }

  removeLocation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/location/${id}`);
  }

  // Type Endpoints
  createType(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/type`, data);
  }

  updateType(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/type/${id}`, data);
  }

  getType(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/type/${id}`);
  }

  getTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/type`);
  }

  removeType(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/type/${id}`);
  }

  // Report Endpoints
  createReport(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/report`, data);
  }

  updateReport(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/report/${id}`, data);
  }

  getReport(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/report/${id}`);
  }

  getReports(): Observable<any> {
    return this.http.get(`${this.apiUrl}/report`);
  }

  removeReport(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/report/${id}`);
  }
}

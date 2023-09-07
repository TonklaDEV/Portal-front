import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FtrOf1Service {

  constructor(private http: HttpClient) {}
  private apiUrl = '/api/ftr-of1/saveData';

  saveData(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, JSON.stringify(data), { headers: headers });
  }
  

  testService(): void {
    console.log('This Service is work!');
  }
}

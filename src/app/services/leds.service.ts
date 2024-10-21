import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LedsService {

  constructor(
    private _http: HttpClient
  ) { }

  public sendTest(value: number): Observable<any> {
    return this._http.post<any>("/api/testing", { "targetPosition": value });
  }

  public setLed(led: number, active: boolean): Observable<{ led: number, active: boolean }> {
    return this._http.post<{ led: number, active: boolean }>("/api/led", { "led": led, "active": active });
  }
}

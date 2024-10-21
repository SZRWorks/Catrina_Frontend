import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(
    private _http: HttpClient
  ) { }

  public abortSystem() {
    let localName = localStorage.getItem("userName");
    if (localName == null) { return; }

    return this._http.post("/api/system/abort", { "name": localName }).subscribe(
      {
        next: (_order: any) => {
        },
        error: (error: any) => {
        }
      }
    );
  }
}

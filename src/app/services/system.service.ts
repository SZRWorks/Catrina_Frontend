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


  public auth(sequence: any) {
    return this._http.post("/api/auth", sequence).subscribe(
      {
        next: (okey: any) => {
          alert(okey['ok'])
          if (okey['ok']) {
            sessionStorage.setItem('@dm1n', 'true');
          }
          window.location.reload();
        },
        error: (error: any) => {
        }
      }
    );
  }

  public removeAdmin() {
    sessionStorage.setItem('@dm1n', 'false');
    window.location.reload();
  }

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

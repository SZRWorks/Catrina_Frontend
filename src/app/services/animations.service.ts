import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animation } from '../interfaces/animation-frame.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor(
    private _http: HttpClient
  ) { }

  public save(animation: Animation): Observable<Animation> {
    return this._http.post<Animation>("/api/animations", animation);
  }

  public get(animation_id: number): Observable<Animation> {
    return this._http.get<Animation>(`/api/animations/${animation_id}`);
  }

  public delete(animation: Animation): Observable<any> {
    return this._http.delete(`/api/animations/${animation.id}`);
  }

  public getAll(): Observable<Animation[]> {
    return this._http.get<Animation[]>(`/api/animations`);
  }
}

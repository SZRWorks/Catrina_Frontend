import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animation, AnimationFrame } from '../interfaces/animation-frame.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor(
    private _http: HttpClient
  ) { }

  public save(animation: Animation): Observable<Animation> {
    console.log(animation)
    return this._http.post<Animation>("/api/animation", animation);
  }

  public get(animation_id: number): Observable<Animation> {
    return this._http.get<Animation>(`/api/animation/${animation_id}`);
  }

  public delete(animation: Animation): Observable<any> {
    return this._http.delete(`/api/animation/${animation.id}`);
  }

  public getAll(): Observable<Animation[]> {
    let isAdmin: boolean = sessionStorage.getItem('@dm1n') == 'true';

    return this._http.get<Animation[]>(`/api/animations/${isAdmin ? 1 : 0}`);
  }
}

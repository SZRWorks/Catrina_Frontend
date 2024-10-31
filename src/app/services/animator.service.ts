import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animation, AnimationFrame } from '../interfaces/animation-frame.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimatorService {

  constructor(
    private _http: HttpClient
  ) { }

  public playAnimation(animation_id: number) {
    this._http.post<any>(`/api/animator/play`, { 'animation_id': animation_id }).subscribe({
      next: (_res: any) => {
        console.log(_res);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  public applyFrame(frame: AnimationFrame): Observable<Animation> {
    return this._http.post<Animation>("/api/animator/frame", frame);
  }
}

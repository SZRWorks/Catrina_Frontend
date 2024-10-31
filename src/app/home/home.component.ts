import { Component, OnInit } from '@angular/core';
import { SuiModal, ComponentModalConfig, ModalSize } from "@angular-ex/semantic-ui"
import { LedsService } from '../services/leds.service';
import { SocketService } from '../services/socket.service';
import { AnimationFrame, Animation } from '../interfaces/animation-frame.interface';
import { PartState, PartType } from '../interfaces/socket-data.interface';
import { state } from '@angular/animations';
import { AnimationsService } from '../services/animations.service';
import { Router } from '@angular/router';
import { AnimatorService } from '../services/animator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  protected availableColors = ['violet', 'blue', 'teal', 'green', 'olive', 'yellow', 'orange', 'red']
  protected animations: Animation[] = []

  protected isAdmin: boolean = true;
  protected selectedAnimation?: Animation;
  protected playing: boolean = false;

  protected working: boolean = false;
  protected work_progress: number = 0;

  protected animationTitle: string = 'Espera un momento mientras detallamos todo para ti...';


  constructor(
    private _socketService: SocketService,
    private _animationsService: AnimationsService,
    private _animatorService: AnimatorService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.isAdmin = sessionStorage.getItem('@dm1n') == 'true';

    this._animationsService.getAll().subscribe({
      next: (_res: Animation[]) => {
        console.log(_res);
        this.animations = _res;
      },
      error: (error: any[]) => {
        console.log(error);
      }
    });

    this._socketService.on('workStatusUpdated', (status: any) => {
      this.working = status.working;
      if (this.working) {

        this.work_progress = status.work_percentage;
        if (!this.playing) {
          this.animationTitle = 'Espera un momento mientras detallamos todo para ti...';
        }
      }
    });

    this._socketService.on('animationStatusUpdated', (status: any) => {
      this.playing = status.playing;
      this.animationTitle = `Reproduciendo ${this.selectedAnimation?.title}!`
    });
  }

  protected goToEdit() {
    if (this.selectedAnimation == undefined) { return; }

    this._router.navigate([`/edit/${this.selectedAnimation?.id}`]);
  }

  protected addAnimation() {
    this._animationsService.save({
      id: -1,
      title: "",
      isPublic: false,
      frames: []
    }).subscribe({
      next: (_res: Animation) => {
        this._router.navigate([`/edit/${_res.id}`]);
      },
      error: (error: any[]) => {
        console.log(error);
      }
    });
  }

  protected deleteAnimation() {
    if (this.selectedAnimation == undefined) { return; }

    this._animationsService.delete(this.selectedAnimation).subscribe({
      next: (_res: Animation) => {
        window.location.reload();
      },
      error: (error: any[]) => {
        console.log(error);
      }
    });
  }

  protected onCardClick(animation: Animation) {
    if (this.selectedAnimation?.id == animation.id) {
      this.selectedAnimation = undefined;
      return;
    }

    this.selectedAnimation = animation
  }

  protected playSelectedAnimation() {
    //this.playing = true;
    this.animationTitle = `Reproduciendo ${this.selectedAnimation?.title}!`


    if (this.playing) { return; }
    if (this.selectedAnimation == undefined) { return; }

    this._animatorService.playAnimation(this.selectedAnimation.id);
  }

  protected goToAuthPage() {
    this._router.navigate([`/auth`]);
  }
}


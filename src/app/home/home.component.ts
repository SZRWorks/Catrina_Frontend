import { Component, OnInit } from '@angular/core';
import { SuiModal, ComponentModalConfig, ModalSize } from "@angular-ex/semantic-ui"
import { LedsService } from '../services/leds.service';
import { SocketService } from '../services/socket.service';
import { AnimationFrame, Animation } from '../interfaces/animation-frame.interface';
import { PartState, PartType } from '../interfaces/socket-data.interface';
import { state } from '@angular/animations';
import { AnimationsService } from '../services/animations.service';
import { Router } from '@angular/router';

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


  constructor(
    private _socketService: SocketService,
    private _animationsService: AnimationsService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._animationsService.getAll().subscribe({
      next: (_res: Animation[]) => {
        console.log(_res);
        this.animations = _res;
      },
      error: (error: any[]) => {
        console.log(error);
      }
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
}


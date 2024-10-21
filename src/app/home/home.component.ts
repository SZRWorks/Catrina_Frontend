import { Component, OnInit } from '@angular/core';
import { SuiModal, ComponentModalConfig, ModalSize } from "@angular-ex/semantic-ui"
import { LedsService } from '../services/leds.service';
import { SocketService } from '../services/socket.service';
import { AnimationFrame, Animation } from '../interfaces/animation-frame.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public value = 0;
  public animationData: Animation = {
    id: -1,
    title: "",
    isPublic: false,
    frames: []
  };
  public frames: AnimationFrame[] = [{
    id: 0,
    minVelocity: 0,
    maxVelocity: 100,
    startDelay: 0,
    endDelay: 0,
    data: []
  }];
  public selectedFrame: AnimationFrame = this.frames[0];

  constructor(
    private _ledsService: LedsService,
    private _socketService: SocketService
  ) { }

  ngOnInit(): void {
    this._socketService.on("steps", (value: number) => { this.value = value * 100; console.log(value); });
  }

  protected onSliderChange(event: any) {
    console.log(this.frames)
    this._ledsService.sendTest(event.target.value).subscribe({
      next: (_res: any) => {
        console.log(_res);
      },
      error: (error: any) => {
      }
    })
  }

  protected deleteFrame() {
    if (this.frames.length <= 0) { return; }
    if (this.selectedFrame.id == 0) { return; }
    this.frames.splice(this.selectedFrame.id-1, 1);
    for (let index = 1; index < this.frames.length; index++) {
      this.frames[index].id = index;
    }
  }

  protected addFrame() {
    if (this.frames.length >= 10) { return; }

    this.frames.push({
      id: this.frames.length,
      minVelocity: 0,
      maxVelocity: 100,
      startDelay: 0,
      endDelay: 0,
      data: []
    });
    this.selectedFrame = this.frames[this.frames.length-1];
  }

  protected getValue($event: any): any {
    return $event.target.value
  }

  protected getNumericValue($event: any): number {
    return parseInt($event.target.value);
  }
}


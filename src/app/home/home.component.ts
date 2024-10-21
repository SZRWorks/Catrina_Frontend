import { Component, OnInit } from '@angular/core';
import {SuiModal, ComponentModalConfig, ModalSize} from "@angular-ex/semantic-ui"
import { LedsService } from '../services/leds.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public value = 0;
  public selectedFrame = "0";
  public frames: Array<string> = [];

  public isPublic = false;

  constructor(
    private _ledsService: LedsService,
    private _socketService: SocketService
  ) { }

  ngOnInit(): void {
    this._socketService.on("steps", (value: number) => { this.value = value * 100; console.log(value); });
  }

  protected onSliderChange(event: any) {
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
    if (this.selectedFrame == "0") { return; }

    this.frames.splice(parseInt(this.selectedFrame)-1, 1)

    for (let index = 0; index < this.frames.length; index++) {
      this.frames[index] = (index + 1).toString();
    }
  }

  protected addFrame() {
    if (this.frames.length >= 6) { return; }

    this.frames.push((this.frames.length + 1).toString())
    this.selectedFrame = (this.frames.length).toString()

  }
}


interface IConfirmModalContext {
  title:string;
  question:string;
}

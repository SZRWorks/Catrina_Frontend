import { Component, OnInit } from '@angular/core';
import { SuiModal, ComponentModalConfig, ModalSize } from "@angular-ex/semantic-ui"
import { LedsService } from '../services/leds.service';
import { SocketService } from '../services/socket.service';
import { AnimationFrame, Animation } from '../interfaces/animation-frame.interface';
import { PartState, PartType } from '../interfaces/socket-data.interface';
import { state } from '@angular/animations';
import { AnimationsService } from '../services/animations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimatorService } from '../services/animator.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {

  protected value = 0;
  protected animation: Animation = {
    id: -1,
    title: "",
    isPublic: false,
    frames: []
  };
  protected frames: AnimationFrame[] = [{
    id: 0,
    minVelocity: 0,
    maxVelocity: 100,
    velocityCurve: "Min velocity",
    startDelay: 0,
    endDelay: 0,
    data: []
  }];
  protected selectedFrame: AnimationFrame = this.frames[0];

  protected panels: string[] = [];
  protected actualStates: PartState[] = [
    { id: 'Head/X', value: 0, realValue: 0 },
    { id: 'Head/Y', value: 0, realValue: 0 },
    { id: 'Head/Z', value: 0, realValue: 0 },

    { id: 'LeftArm/Meñique', value: 0, realValue: 0 },
    { id: 'LeftArm/Anular', value: 0, realValue: 0 },
    { id: 'LeftArm/Medio', value: 0, realValue: 0 },
    { id: 'LeftArm/Indice', value: 0, realValue: 0 },
    { id: 'LeftArm/Pulgar', value: 0, realValue: 0 },
    { id: 'LeftArm/Pulgar2', value: 0, realValue: 0 },
    { id: 'LeftArm/Muñeca', value: 0, realValue: 0 },
    { id: 'LeftArm/Codo', value: 0, realValue: 0 },

    { id: 'RightArm/Meñique', value: 0, realValue: 0 },
    { id: 'RightArm/Anular', value: 0, realValue: 0 },
    { id: 'RightArm/Medio', value: 0, realValue: 0 },
    { id: 'RightArm/Indice', value: 0, realValue: 0 },
    { id: 'RightArm/Pulgar', value: 0, realValue: 0 },
    { id: 'RightArm/Pulgar2', value: 0, realValue: 0 },
    { id: 'RightArm/Muñeca', value: 0, realValue: 0 },
    { id: 'RightArm/Codo', value: 0, realValue: 0 },
  ]
  protected componentsWorking: boolean = false;
  protected loading: boolean = true;
  protected playingAnimation: boolean = false;


  constructor(
    private _router: Router,
    private _socketService: SocketService,
    private _animationsService: AnimationsService,
    private _animatorService: AnimatorService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id: number = parseInt(this._activatedRoute.snapshot.paramMap.get('id') || '-1');
    this._animationsService.get(id).subscribe({
      next: (_res: Animation) => {
        this.animation = _res;
        this.frames = ((this.animation.frames != undefined && this.animation.frames?.length! > 0) ? this.animation.frames : this.frames) || this.frames;
        this.animation.frames = this.frames;
        this.selectedFrame = this.frames[0];

        this.loading = false;

        console.log(_res);
      },
      error: (error: any) => {
        console.log(error);
      },
    });

    this._socketService.on('animationStatusUpdated', (status: any) => {
      this.playingAnimation = status.playing;
    });

    this._socketService.on("stateUpdated", (remoteState: PartState) => { this.onRemoteStateUpdated(remoteState); });
    this.fillPanels();
  }

  protected fillPanels() {
    this.actualStates.forEach((state: PartState) => {
      let identifier: string = state.id.split('/')[0];

      if (!this.panels.includes(identifier)) {
        this.panels.push(identifier);
      }
    });
  }

  protected getPanelStates(panelName: string): PartState[] {
    let states: PartState[] = [];
    this.actualStates.forEach((state: PartState) => {
      let identifier: string = state.id.split('/')[0];

      if (identifier == panelName) { states.push(state); }
    });

    return states;
  }

  protected formatName(name: string): string {
    var formatedIdentifier = name.replace(/([A-Z])/g, ' $1').trim();
    formatedIdentifier = formatedIdentifier.replace(/  +/g, ' ');

    return formatedIdentifier;
  }

  protected onLocalStateUpdated(state: PartState) {
    console.log("state updated")

    // notificar al backend de un cambio
    this._socketService.emit('stateUpdated', state);
  }

  protected onRemoteStateUpdated(remoteState: PartState) {
    let localState: PartState = this.actualStates.find((state) => state.id === remoteState.id)!;
    if (localState == null) { return; }

    localState.value = remoteState.value;
    localState.realValue = remoteState.realValue;
  }


  protected deleteFrame() {
    if (this.frames.length <= 0) { return; }
    if (this.selectedFrame.id == 0) { return; }

    this.frames.splice(this.selectedFrame.id - 1, 1);
    for (let index = 0; index < this.frames.length; index++) {
      this.frames[index].id = index;
    }

    this.selectedFrame = this.frames[0];
  }

  protected addFrame() {
    if (this.frames.length >= 10) { return; }

    this.frames.push({
      id: this.frames.length,
      minVelocity: 0,
      maxVelocity: 100,
      velocityCurve: "Min velocity",
      startDelay: 0,
      endDelay: 0,
      data: []
    });
    this.selectedFrame = this.frames[this.frames.length - 1];
  }

  protected previewFrame() {
    this._animatorService.applyFrame(this.selectedFrame).subscribe({
      next: (_res: any) => {
        console.log(_res);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  protected playAnimation() {
    if (this.playingAnimation) { return; }

    //this.saveAnimation();

    this._animatorService.playAnimation(this.animation.id);
  }

  protected captureFrameData() {
    this.selectedFrame.data = []
    this.actualStates.forEach(val => this.selectedFrame.data!.push(Object.assign({}, val)));
  }

  protected getValue($event: any): any {
    return $event.target.value
  }

  protected getNumericValue($event: any): number {
    return parseInt($event.target.value);
  }

  protected saveAnimation() {
    if (this.componentsWorking) { return; }

    this.loading = true;
    this._animationsService.save(this.animation).subscribe({
      next: (_res: any) => {
        console.log(_res);
        this.loading = false;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
    console.log(this.animation);
  }


  protected goHome() {
    this._router.navigate([`/`]);
  }
}


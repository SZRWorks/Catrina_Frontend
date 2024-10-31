import { Component, OnInit } from '@angular/core';
import { SuiModal, ComponentModalConfig, ModalSize } from "@angular-ex/semantic-ui"
import { LedsService } from '../services/leds.service';
import { SocketService } from '../services/socket.service';
import { AnimationFrame, Animation } from '../interfaces/animation-frame.interface';
import { PartState, PartType } from '../interfaces/socket-data.interface';
import { state } from '@angular/animations';
import { AnimationsService } from '../services/animations.service';
import { Router } from '@angular/router';
import { SystemService } from '../services/system.service';

@Component({
  selector: 'auth-home',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  protected isAdmin : boolean = false;
  protected pssS = {
    'sequence':[' ']
  }


  constructor(
    private _systemService: SystemService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.isAdmin = sessionStorage.getItem('@dm1n') == 'true';
  }

  protected goHome(){
    this._router.navigate([`/`]);
  }

  protected addItem(item: any){
    this.pssS['sequence'].push(item)
  }

  protected unloadAdmin() {
    this._systemService.removeAdmin();
  }

  protected sendSequence(wrong: boolean) {
    this._systemService.auth(wrong ? {'sequence': []} : this.pssS);
  }
}


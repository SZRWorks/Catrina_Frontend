import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket {

  constructor() {
    super({
      url: 'http://192.168.1.12:3000',

    });
  }
}

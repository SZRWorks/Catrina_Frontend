import { Component, OnInit } from '@angular/core';
import { LedsService } from './services/leds.service';
import { SocketService } from './services/socket.service';
import { SystemService } from './services/system.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Catrina 7M';

  constructor() { }

  ngOnInit(): void {
  }
}

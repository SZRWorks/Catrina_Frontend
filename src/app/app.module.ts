import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SuiModule } from '@angular-ex/semantic-ui';
import { HttpClientModule } from '@angular/common/http';
import { LedsService } from './services/leds.service';
import { SocketService } from './services/socket.service';
import { SystemService } from './services/system.service';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SuiModule
  ],
  providers: [LedsService, SocketService, SystemService],
  bootstrap: [AppComponent]
})
export class AppModule { }

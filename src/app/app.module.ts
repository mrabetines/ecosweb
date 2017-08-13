import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login.component";
import {AppRoutingModule} from "./app.routing";
import {FullLayoutComponent} from "./layouts/full-layout.component";
import {AuthService} from "./shared/services/auth.service";
import {CanActivateViaAuthGuard} from "./shared/services/guards/auth-guard.service";
import {StorageService} from "./shared/services/storage.service";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LaddaModule} from "angular2-ladda";
import {ManageSessionModule} from "./manage-session/manage-session.module";
import {ExamenService} from "app/shared/services/examen.service";
import {SessionService} from "app/shared/services/session.service";
import {StationService} from "./shared/services/station.service";
import {SharedService} from "./shared/services/shared.service";
import {BanqueService} from "./shared/services/banque.service";
import {EtudiantService} from "./shared/services/etudiant.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FullLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    LaddaModule,
    ManageSessionModule,
    HttpModule
  ],
  providers: [
    AuthService,
    CanActivateViaAuthGuard,
    StorageService,
    SessionService,
    ExamenService,
    StationService,
    BanqueService ,
    SharedService,
    EtudiantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

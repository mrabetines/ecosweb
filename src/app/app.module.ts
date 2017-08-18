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
import {BeaconService} from "./shared/services/beacon.service";
//added by ines
import {AddBeaconComponent} from "./beacon/add-beacon/add-beacon.component";
import {ListBeaconsComponent} from "./beacon/list-beacons/list-beacons.component";
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FullLayoutComponent,
    AddBeaconComponent,
    ListBeaconsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    LaddaModule,
    ManageSessionModule,
    HttpModule,
    ModalModule.forRoot()
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
    EtudiantService,
    BeaconService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

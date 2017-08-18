/**
 * Created by Abbes on 16/06/2017.
 */
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';
import {ManageSessionRoutingModule} from "./manage-session.routing";
import {ListSessionsComponent} from "app/manage-session/session/list-sessions/list-session.component";
import {ListExamensComponent} from "app/manage-session/examen/list-examens/list-examens.component";
import {CommonModule} from "@angular/common";
import {ListStationsComponent} from "./station/list-stations/list-stations.component";
import {AddSessionComponent} from "./session/add-session/add-session.component";
import {DateTimePickerModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BusyModule} from 'angular2-busy';
import {AddExamenComponent} from "./examen/add-examen/add-examen.component";
//added by ines
import {EtudiantComponent} from "./etudiant/etudiant.component";
import{AllocateBeaconsComponent} from "./examen/manage-beacons/allocate-beacons/allocate-beacons.component";
import{DeallocateBeaconsComponent} from "./examen/manage-beacons/deallocate-beacons/deallocate-beacons.component";
import{ManageBeaconsComponent} from "./examen/manage-beacons/manage-beacons.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DateTimePickerModule,
    ManageSessionRoutingModule,
    BusyModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListSessionsComponent,
    ListExamensComponent,
    ListStationsComponent,
    AddSessionComponent,
    AddExamenComponent,
    EtudiantComponent ,
    AllocateBeaconsComponent,
    DeallocateBeaconsComponent,
    ManageBeaconsComponent,
    
  ],
  providers: []
})
export class ManageSessionModule {
}

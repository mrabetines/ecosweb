/**
 * Created by Abbes on 13/06/2017.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Layouts
import {FullLayoutComponent} from './layouts/full-layout.component';
import {LoginComponent} from "./login/login.component";
import {CanActivateViaAuthGuard} from "./shared/services/guards/auth-guard.service";
//added by ines
import {AddBeaconComponent} from "./beacon/add-beacon/add-beacon.component";
import {ListBeaconsComponent} from "./beacon/list-beacons/list-beacons.component";

export const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: 'session',
        loadChildren: "./manage-session/manage-session.module#ManageSessionModule"
      },
      {
        path: 'beacon',
        children: [
          {
            path: '',
            component: ListBeaconsComponent
          },
          {
            path: 'add',
            component: AddBeaconComponent
          },
          {
            path:':beaconId/edit',
            component:AddBeaconComponent
          }
        ]}
      
    ],
    /*canActivate: [
     CanActivateViaAuthGuard
     ]*/
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

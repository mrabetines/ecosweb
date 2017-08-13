/**
 * Created by Abbes on 13/06/2017.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Layouts
import {FullLayoutComponent} from './layouts/full-layout.component';
import {LoginComponent} from "./login/login.component";
import {CanActivateViaAuthGuard} from "./shared/services/guards/auth-guard.service";

export const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: 'session',
        loadChildren: "./manage-session/manage-session.module#ManageSessionModule"
      }
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

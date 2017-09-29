/**
 * Created by Abbes on 16/06/2017.
 */
/**
 * Created by Abbes on 13/06/2017.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListSessionsComponent} from "./session/list-sessions/list-session.component";
import {ListExamensComponent} from "./examen/list-examens/list-examens.component";
import {ListStationsComponent} from "./station/list-stations/list-stations.component";
import {AddSessionComponent} from "./session/add-session/add-session.component";
import {AddExamenComponent} from "./examen/add-examen/add-examen.component";
//added by ines
import {EtudiantComponent} from "./etudiant/etudiant.component";
import{ManageBeaconsComponent} from "./examen/manage-beacons/manage-beacons.component";


export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListSessionsComponent
      },
      {
        path: ':sessionId/examen',
        children: [
          {
            path: "",
            component: ListExamensComponent
          },
          {
            path: "add",
            component: AddExamenComponent
          }
        ]

      },
      {
        path: 'examen/:examenId/station',
        component: ListStationsComponent
      },
      {
        path: 'examen/:examenId/etudiant',
        component: EtudiantComponent
      },
      {
        path: 'add',
        component: AddSessionComponent
      },
       {
       path: 'examen/:examenId/beacons',
       component: ManageBeaconsComponent,
       }
   
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageSessionRoutingModule {
}

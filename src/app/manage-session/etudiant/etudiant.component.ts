import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EtudiantService} from "../../shared/services/etudiant.service";
import {Etudiant} from "app/shared/models/etudiant";
import { Observable } from "rxjs/Observable";

@Component({
  templateUrl: 'etudiant.component.html',
})
export class EtudiantComponent implements OnInit,OnDestroy
{
  ngOnDestroy(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }
  constructor(private route: ActivatedRoute, private etudiantService: EtudiantService)
  {}
  examenId: number;
  etudiants: Etudiant[] = [];
  subscription:any;

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
    this.examenId=+params['examenId'];
    this.getListEtudiants(this.examenId);})
  }

  getListEtudiants(examenId: number) {
    this.etudiantService.getListEtudiantsByExam(examenId)
      .subscribe(
        (data) => {
                //console.log(JSON.stringify(data));
                data.result.forEach((etudiant) => {
                    //this.etudiants.push(new Etudiant (etudiant.id_Etudiant,etudiant.nom,etudiant.prenom,etudiant.CIN,etudiant.carte_Etudiant,etudiant.pivot.present));
                    this.checkAndAdd(this.etudiants,new Etudiant (etudiant.id_Etudiant,etudiant.nom,etudiant.prenom,etudiant.CIN,etudiant.carte_Etudiant,etudiant.pivot.present));
                });
                this.subscribeToData();
        },
        (error) => {
          alert(JSON.stringify(error.json()));

        }
      );
  }
  checkAndAdd(arr,obj) {
  var id = arr.length + 1;
  var found = arr.some(function (el) {
    if((el.id_Etudiant === obj.id_Etudiant) && (el.present != obj.present))
    {el.present=obj.present;
      return 1;}
    else if((el.id_Etudiant === obj.id_Etudiant) && (el.present == obj.present))
    return 1;
    else return 0;
  });
  if (!found) { arr.push(obj);}
  
  
}
  subscribeToData(): void {
  this.subscription = Observable.timer(10000).first().subscribe(() => 
  { 
    this.getListEtudiants(this.examenId);
  })
}

  changePresence(etudiantId,present)
  { this.etudiantService.changePresence(this.examenId,etudiantId,present)
    .subscribe(
    (data)=>{ console.log(JSON.stringify(data.result));
              this.etudiants.find(x => x.id_Etudiant == etudiantId).present=!present;
    },
    (error)=>{alert("error");}
  )

  }

}
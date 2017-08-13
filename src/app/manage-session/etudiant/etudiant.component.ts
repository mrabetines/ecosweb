import {Component, OnInit, AfterContentInit, OnDestroy} from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
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
    this.etudiantService.getListEtudiants(examenId)
      .subscribe(
        (data) => {
                console.log(JSON.stringify(data));
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
  private checkAndAdd(arr,obj) {
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
  /*private addOrReplace( argh, obj ) {
  var index = -1;
  argh.filter((el, pos) => {
    console.log("filter method "+obj.id_Etudiant);
    if(( el.id_Etudiant === obj.id_Etudiant ) && (el.present != obj.present))
      {argh[index = pos].present=obj.present;
      console.log("if => obj: "+obj.id_Etudiant+ " el"+el.id_Etudiant);}
    else  if ( el.id_Etudiant != obj.id_Etudiant )
      {argh.push(obj);
      index=pos;
     console.log("else => obj: "+obj.id_Etudiant+ " el"+el.id_Etudiant); }
     else {
       index=pos;
       return true;
     }
  });
  if(index == -1)
    {argh.push(obj);
    console.log("index ==-1"+obj.id_Etudiant);}
}*/
  private subscribeToData(): void {
  this.subscription = Observable.timer(10000).first().subscribe(() => 
  { 
    this.getListEtudiants(this.examenId);
  })
}

  private changePresence(etudiantId,present)
  { this.etudiantService.changePresence(this.examenId,etudiantId,present)
    .subscribe(
    (data)=>{ console.log(JSON.stringify(data.result));
              this.etudiants.find(x => x.id_Etudiant == etudiantId).present=!present;
    },
    (error)=>{alert("error");}
  )

  }

}
import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import {BeaconService} from "../../../shared/services/beacon.service";
import { Router, ActivatedRoute } from "@angular/router";
import {Beacon} from "app/shared/models/beacon";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

declare var jQuery: any;
@Component({
  templateUrl: 'manage-beacons.component.html',
  styleUrls: [],

})
export class ManageBeaconsComponent implements OnInit {

  public examenId:number;
  public freeBeacons:Beacon[];
  public beacons:Beacon[];
  public beaconsIds:Number[];

  //@ViewChild('mytemplate') template:TemplateRef<any>;

  ngOnInit() {
    this.initializeListBeaconSelect2();
      setTimeout(() => {
      if (this.bsModalRef.content && this.bsModalRef.content.examenId) {
        this.examenId = this.bsModalRef.content.examenId;
        this.getListBeaconsByExam(this.examenId);
        this.getAllFreeBeacons(this.examenId);
        setTimeout(() => {
          this.setValueBeacons();
      }, 1000)
      }
    }, 0);	
       
       
        }

  constructor(private beaconService: BeaconService, private router: Router,private route:ActivatedRoute,public bsModalRef: BsModalRef)
  { 
    //this.modalService.show(this.template);
   // this.examenId=this.bsModalRef.content.examenId;
   
  }

  initializeListBeaconSelect2() {
    const baseContext = this;
    const selectEnseignant = jQuery(".select-enseignant");
    selectEnseignant.select2();
    selectEnseignant.on("select2:select", function (e) {
        alert("here"+e.params.data.id);
        baseContext.beaconsIds.push(parseInt(e.params.data.id));
    });
    selectEnseignant.on("select2:unselect", function (e) {
        console.log("select2:unselect", e.params.data.id);
        const index = baseContext.beaconsIds.indexOf(parseInt(e.params.data.id), 0);
        if (index > -1) {
            baseContext.beaconsIds.splice(index, 1);
        }
    });

  }

  setValueBeacons() {
    const selectEnseignant = jQuery(".select-enseignant");
    selectEnseignant.val([1]).trigger("change");
    //selectEnseignant.change(this.beacons);
  }

  getAllFreeBeacons(examenId)
  {
    this.beaconService.getAllFreeBeacons(examenId)
    .subscribe(
      (data) => {
        this.freeBeacons = data;
      },
      (error) => { }
    )
  }

  getListBeaconsByExam(examenId)
  {
    this.beaconService.getListBeaconsByExam(examenId)
    .subscribe(
      (data) => {
     /*   data.result.forEach(beacon => {
          this.beaconsIds.push(beacon.id_Beacon)
        });*/
        this.beacons = data.result;
      },
      (error) => { }
    ) 
  }

  affectBeacons()
  {
    this.beaconService.addBeaconsToExam(this.beaconsIds,this.examenId)
    .subscribe(
      () => {},
      (error) => { }
    )
  }

}
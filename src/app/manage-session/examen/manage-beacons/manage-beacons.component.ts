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
  public beaconsIds:Number[]=[];
  submitted=false;

  //@ViewChild('mytemplate') template:TemplateRef<any>;

  ngOnInit() {
    
      setTimeout(() => {
      if (this.bsModalRef.content && this.bsModalRef.content.examenId) {
        this.examenId = this.bsModalRef.content.examenId;
        this.getListBeaconsByExam(this.examenId);
        this.getAllFreeBeacons(this.examenId);
        this.initializeListBeaconSelect2();
        
      }
    }, 0);	
       
       
        }

  constructor(private beaconService: BeaconService, private router: Router,private route:ActivatedRoute,public bsModalRef: BsModalRef)
  { 
    //this.modalService.show(this.template);
   // this.examenId=this.bsModalRef.content.examenId;
   
  }

  initializeListBeaconSelect2() {
    const selectBeacon = jQuery(".select-beacon");
    selectBeacon.select2();
    selectBeacon.on("select2:select", (e) => {
        console.log("select2:select", e.params.data.id);
        this.beaconsIds.push(parseInt(e.params.data.id));
    });
    selectBeacon.on("select2:unselect", (e) => {
        console.log("select2:unselect", e.params.data.id);
        const index = this.beaconsIds.indexOf(parseInt(e.params.data.id), 0);
        if (index > -1) {
            this.beaconsIds.splice(index, 1);
        }
    });

  }

  setValueBeacons() {
    const selectBeacon = jQuery(".select-beacon");
    selectBeacon.val(this.beaconsIds).trigger("change");
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
       data.result.forEach(beacon => {
          this.beaconsIds.push(beacon.id_Beacon)
        });
        setTimeout(() =>{this.setValueBeacons()},0);
      },
      (error) => { }
    ) 
  }

  validate()
  { this.submitted=true;
    if(this.beaconsIds.length===0)
      {
        return false;
      }

    else
    {
      return true;
    }  

  }

  affectBeacons()
  { this.submitted=false;
    this.beaconService.addBeaconsToExam(this.beaconsIds,this.examenId)
    .subscribe(
      () => { this.bsModalRef.hide();},
      (error) => { }
    )
  }

}
import {Component, OnInit, AfterContentInit, OnDestroy,TemplateRef} from '@angular/core';
import {BeaconService} from "../../../../shared/services/beacon.service";
import { Router, ActivatedRoute } from "@angular/router";
import {Beacon} from "app/shared/models/beacon";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  templateUrl: 'allocate-beacons.component.html',
  styleUrls: [],
  selector:'allocate-beacons'

})
export class AllocateBeaconsComponent implements OnInit{

freeBeacons:Beacon[];
examenId:number;
checkboxes:number[] =[];
public modalRef: BsModalRef;

 public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
    constructor(private beaconService: BeaconService, private router: Router,private route:ActivatedRoute,private modalService: BsModalService) {}
    ngOnInit() {
    this.getFreeListBeacons();
    this.route.params.subscribe(params =>{
    this.examenId=+params['examenId'];
    });
   this.beaconService.beaconDeletedEvent.subscribe(beacon => {
     this.freeBeacons.push(beacon);
   });
     }


    getFreeListBeacons() {
    this.beaconService.getAllFreeBeacons()
      .subscribe(
        (data) => {
          this.freeBeacons = data.result;
        },
        (error) => { }
      )
  }

  affectBeacons()
  {   
     let beaconsIdToAdd =this.checkboxes.filter(element => element != 0);
     
     this.beaconService.addBeaconsToExam(beaconsIdToAdd,this.examenId).subscribe(
        ()=> { this.modalRef.hide();
                
        },
         (error) => {
           alert("error");
         }

       
     )
  }


}



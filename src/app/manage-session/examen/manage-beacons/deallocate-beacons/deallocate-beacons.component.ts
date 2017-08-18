import {Component, OnInit } from '@angular/core';
import {BeaconService} from "../../../../shared/services/beacon.service";
import { Router, ActivatedRoute } from "@angular/router";
import {Beacon} from "app/shared/models/beacon";

@Component({
  templateUrl: 'deallocate-beacons.component.html',
  styleUrls: [],
  selector:'deallocate-beacons'

})
export class DeallocateBeaconsComponent implements OnInit {
  
  myBeacons:Beacon[];
  examenId:number;
   constructor(private beaconService: BeaconService, private router: Router,private route:ActivatedRoute) {}

   ngOnInit(): void {
     this.route.params.subscribe(params =>{
     this.examenId=+params['examenId'];
    });
    this.getMyListBeacons();
    this.beaconService.beaconsAddedEvent.subscribe(beacons => {
      beacons.forEach(beacon => {
       this.myBeacons.push(beacon); 
      })
    });
    }
    
     getMyListBeacons() {
    this.beaconService.getListBeaconsByExam(this.examenId)
      .subscribe(
        (data) => {
          this.myBeacons = data.result;
        },
        (error) => { alert("error"); }
      )
  }
    deallocateBeacon(beaconId)
    { this.beaconService.retrieveBeaconFromExam(beaconId)
      .subscribe(
        (data) => {
          let index =this.myBeacons.findIndex(beacon => beacon.id_Beacon == beaconId);
          this.myBeacons.splice(index,1);
        },
        (error) => { alert("error"); }
      )

    }


 }



import { Component, OnInit } from '@angular/core';
import {BeaconService} from "../../shared/services/beacon.service";
import { Router, ActivatedRoute } from "@angular/router";
import {Beacon} from "app/shared/models/beacon";

@Component({
  templateUrl: 'add-beacon.component.html',
  styleUrls: []

})
export class AddBeaconComponent implements OnInit{

beacon: Beacon =new Beacon();
beacons:Beacon[];
beaconId:number;
valid:boolean=false;

    constructor(private beaconService: BeaconService, private router: Router,private route:ActivatedRoute) {}
    ngOnInit() {
    this.getListBeacons();
     }

  getListBeacons() {
    this.beaconService.getAllBeacons()
      .subscribe(
        (data) => {
          this.beacons = data.result;
           this.route.params.subscribe(params => {
           if (params.beaconId) {
            this.beaconId=+params['beaconId'];
           let index=this.beacons.findIndex(beacon => beacon.id_Beacon == this.beaconId);
           this.beacon=this.beacons[index];
          }  
        });
        },
        (error) => { }
      )
  }

    addBeacon() {
      if(!this.valid)
    {alert("le beacon existe déja");}
    else
    {
    this.beaconService.addBeacon(this.beacon)
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(["/beacon"]);
        },
        (error) => {

        });}
      }
 
      exists(){
      this.valid=!this.beacons.some(beacon => {
      //let test;
      //console.log(beacon.uuid==beaconToAdd.uuid && beacon.major==beaconToAdd.major && beacon.minor==beaconToAdd.minor && beacon.id_Beacon!=beaconToAdd.id_Beacon);
      return (beacon.uuid==this.beacon.uuid && beacon.major==this.beacon.major && beacon.minor==this.beacon.minor && beacon.id_Beacon!=this.beacon.id_Beacon);
});
  
  }


}



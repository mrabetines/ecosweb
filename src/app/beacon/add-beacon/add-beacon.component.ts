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
           this.beacon.uuid=this.beacons[index].uuid;
           this.beacon.major=this.beacons[index].major;
           this.beacon.minor=this.beacons[index].minor;
           this.beacon.code=this.beacons[index].code;
           this.beacon.id_Beacon=this.beacons[index].id_Beacon;
          }  
        });
        },
        (error) => { }
      )
  }
    //cette méthode peut etre optimisée (complexité)
    addorupdateBeacon() {
      this.valid=!this.beacons.some(beacon => {
      console.log(beacon.code);
      return (beacon.uuid==this.beacon.uuid && beacon.major==this.beacon.major && beacon.minor==this.beacon.minor && beacon.id_Beacon!=this.beacon.id_Beacon);
     });
      if(!this.valid)
      {
        alert("le beacon existe déja");
      }
      else if(this.beacons.findIndex(beacon => (beacon.code === this.beacon.code)&& (beacon.id_Beacon != this.beacon.id_Beacon)) != -1 )
      { console.log(this.beacons.findIndex(beacon => beacon.code === this.beacon.code));
        alert("le code existe déja");
      }
      else
      {
        this.beaconService.addorupdateBeacon(this.beacon)
        .subscribe(
          (data) => {
            console.log(data);
            this.router.navigate(["/beacon"]);
          },
          (error) => {

          });}
      }
}



import {Component, OnInit} from '@angular/core';
import {BeaconService} from "../../shared/services/beacon.service";
import {Beacon} from "app/shared/models/beacon";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  templateUrl: 'list-beacons.component.html',
  styleUrls: [],

})
export class ListBeaconsComponent implements OnInit {

    beacons: Beacon[] = [];

    ngOnInit() {
    this.getListBeacons();
    }
    
    constructor(private beaconService: BeaconService, private router: Router) {}

   getListBeacons() {
    this.beaconService.getAllBeacons()
      .subscribe(
        (data) => {
          this.beacons = data.result;
        },
        (error) => { }
      )
  }

  goAddBeacon() {
    this.router.navigate(["/beacon/add"]);
  }

  deleteBeacon(beaconId)
  { if(confirm("Voulez vous vraiment le supprimer"))
    {
    this.beaconService.deleteBeacon(beaconId).subscribe(
      ()=>{let index =this.beacons.findIndex(beacon => beacon.id_Beacon == beaconId);
          this.beacons.splice(index,1);
    },
      ()=>alert("erreur")
    )

  }}
}



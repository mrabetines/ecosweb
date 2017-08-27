import { Injectable, Output, EventEmitter } from "@angular/core";
import {Http} from '@angular/http';
import {Config} from '../config';
import { GenericService } from "app/shared/services/generic.service";
import { Beacon } from "app/shared/models/beacon";

@Injectable()
export class BeaconService extends GenericService{
@Output() beaconDeletedEvent: EventEmitter<Beacon> = new EventEmitter(true);
@Output() beaconsAddedEvent: EventEmitter<Beacon[]> = new EventEmitter(true);
    
    constructor(private http:Http)
    {
        super();
    }
    
    //récuperer la liste des beacons d'un examen donné
    getListBeaconsByExam(examenId:number)
    {  return this.http.get(Config.baseUrl2+"exam/"+examenId+"/beacons")
       .map( res => res.json())
       .catch(this.handleErrors);
    }

    //ajouter une liste des beacons à un examen donné
    addBeaconsToExam(beacons:any[],exmamenId:number)
    {  return this.http.post(Config.baseUrl2+"setbeaconsbyexam",{"id_Examen":exmamenId,"id_Beacons":beacons})
       .map( res => res.json())
       .do(data =>{
           this.beaconsAddedEvent.emit(data.result);
       })
       .catch(this.handleErrors);

    }

    //récuperer toute la liste des beacons
    getAllBeacons()
        {
            return this.http.get(Config.baseUrl2+"beacons")
            .map(res => res.json())
            .catch(this.handleErrors);
        }
    
    // ajouter un beacon ou modfier
    addorupdateBeacon(beacon)
    {
        return this.http.post(Config.baseUrl2+"addorupdatebeacon",{"id_Beacon":beacon.id_Beacon,"uuid":beacon.uuid,"major":beacon.major,"minor":beacon.minor})
        .map(res => res.json())
        .catch(this.handleErrors);
    }

    //récuperer la liste des beacons non afféctés à des examens
    getAllFreeBeacons()
    {
            return this.http.get(Config.baseUrl2+"freebeacons")
            .map(res => res.json())
            .catch(this.handleErrors);
    }

    //désaffecter un beacon donné
    retrieveBeaconFromExam(beaconId)
    {
        return this.http.post(Config.baseUrl2+"retrievebeaconfromexam",{"id_Beacon":beaconId})
            .map(res => res.json())
            .do(data => {
                this.beaconDeletedEvent.emit(data.result);
            })
            .catch(this.handleErrors);
    }
    
    //supprimer un beacon
    deleteBeacon(beaconId)
    {
        return this.http.delete(Config.baseUrl2+"beacon/"+beaconId)
        .map(res =>res.json())
        .catch(this.handleErrors);
    }

    //récuperer un beacon avec son id
    getBeacon(beaconId)
    {
        return this.http.get(Config.baseUrl2+"beacon/"+beaconId)
        .map(res => res.json())
        ._catch(this.handleErrors);
    }
    
    

}
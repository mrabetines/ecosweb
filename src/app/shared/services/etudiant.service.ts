import {Http} from '@angular/http';
import {GenericService} from './generic.service';
import {Config} from '../config';
import {Injectable} from '@angular/core';
//import {Credentials} from "../models/credentials";
//import {StorageService} from "./storage.service";


@Injectable()
export class EtudiantService extends GenericService {
  
  apiUrl="http://192.168.1.7/api/v1/";
  constructor(private http: Http/*, private stoarageService: StorageService*/) {
    super();
  }


  getListEtudiants(examenId: number) {
    //this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    //const url = Config.baseUrl + "/examen/" + examenId + "/station";
    return this.http.post(this.apiUrl+"studentsbyexam",{"id_Examen":examenId})
      .map(res => res.json())
      .catch(this.handleErrors);
  }
  changePresence(examenId:number,etudiantId:number,present:boolean)
  {
    return this.http.post(this.apiUrl+"presencebymonitor",{"id_Examen":examenId,"id_Etudiant":etudiantId,"present":present})
    .map(res=>res.json())
    .catch(this.handleErrors);
  }

   
}

import {Http} from '@angular/http';
import {GenericService} from './generic.service';
import {Config} from '../config';
import {Injectable} from '@angular/core';

@Injectable()
export class EtudiantService extends GenericService {
  
  constructor(private http: Http) {
    super();
  }

  getListEtudiants(examenId: number) {
    return this.http.post(Config.baseUrl2+"studentsbyexam",{"id_Examen":examenId})
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  changePresence(examenId:number,etudiantId:number,present:boolean)
  {
    return this.http.post(Config.baseUrl2+"presencebymonitor",{"id_Examen":examenId,"id_Etudiant":etudiantId,"present":present})
    .map(res=>res.json())
    .catch(this.handleErrors);
  }

   
}

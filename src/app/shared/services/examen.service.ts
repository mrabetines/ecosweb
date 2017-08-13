/**
 * Created by Abbes on 16/06/2017.
 */
/**
 * Created by Abbes on 16/06/2017.
 */
import {Http} from '@angular/http';
import {GenericService} from './generic.service';
import {Config} from '../config';
import {Injectable} from '@angular/core';
import {Credentials} from "../models/credentials";
import {StorageService} from "./storage.service";
import {ExamenDTO} from "../models/examen";


@Injectable()
export class ExamenService extends GenericService {

  constructor(private http: Http, private stoarageService: StorageService) {
    super();
  }


  getListExamens(sessionId: number) {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    const url = Config.baseUrl + "/session/" + sessionId + "/examen";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  addExamen(examen: ExamenDTO, sessionId: number) {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    const url = Config.baseUrl + "/session/" + sessionId + "/examen";

    return this.http.post(url, JSON.stringify(examen),
      {
        headers: this.headers
      }
    )
      .map(res => res.json())
      .catch(this.handleErrors);
  }

}

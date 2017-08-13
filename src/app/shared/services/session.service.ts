/**
 * Created by Abbes on 16/06/2017.
 */
import {Http} from '@angular/http';
import {GenericService} from './generic.service';
import {Config} from '../config';
import {Injectable} from '@angular/core';
import {Credentials} from "../models/credentials";
import {StorageService} from "./storage.service";
import {Session, SessionDTO} from "../models/session";


@Injectable()
export class SessionService extends GenericService {

  constructor(private http: Http, private stoarageService: StorageService) {
    super();
  }


  getListSessions() {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    const url = Config.baseUrl + "/session";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }


  addSession(session: SessionDTO) {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    const url = Config.baseUrl + "/session";

    return this.http.post(url, JSON.stringify(session), {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getStagesBySession(sessionId: number) {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    const url = Config.baseUrl + "/session/" + sessionId + "/stage";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

}

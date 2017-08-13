/**
 * Created by Abbes on 21/06/2017.
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
import {Station} from "../models/station";


@Injectable()
export class StationService extends GenericService {

  constructor(private http: Http, private stoarageService: StorageService) {
    super();
  }


  getListStations(examenId: number) {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    const url = Config.baseUrl + "/examen/" + examenId + "/station";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getEvaluations(examenId: number) {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    const url = Config.baseUrl + "/examen/" + examenId + "/evaluation";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  updatePonderations(examenId: number, stations: Station[]) {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    const url = Config.baseUrl + "/examen/" + examenId + "/ponderation";

    let request: any = [];
    stations.forEach(
      station => {
        request.push({
          id_Station: station.id_Station,
          ponderation: station.ponderation
        })
      }
    );
    console.log(JSON.stringify(request));
    return this.http.put(url, JSON.stringify(request), {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);

  }
}

import {StorageService} from "app/shared/services/storage.service";
import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Http} from '@angular/http';
import {Config} from '../config';
/**
 * Created by Abbes on 30/06/2017.
 */
@Injectable()
export class SharedService extends GenericService {

  constructor(private http: Http, private stoarageService: StorageService) {
    super();
  }

  getNiveaux() {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    const url = Config.baseUrl + "/niveau";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllEnseignant() {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    const url = Config.baseUrl + "/enseignant";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllTypes() {
    this.headers.set("Authorization", "Bearer " + this.stoarageService.read("token"));
    const url = Config.baseUrl + "/stage";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}

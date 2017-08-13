import {Privilege} from "./privilege";
/**
 * Created by Abbes on 16/06/2017.
 */
export class Enseignant {
  public id_Enseignant: number;
  public CIN: number;
  public nom: string;
  public prenom: string;
  public id_Service: number;
  public id_Grade: number;
  public id_Specialite: number;
  public login: string;
  public privileges: Privilege[];
}

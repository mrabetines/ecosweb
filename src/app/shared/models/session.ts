import {Niveau} from "./niveau";
import {Patient} from "./patient";
/**
 * Created by Abbes on 16/06/2017.
 */
export class Session {
  public id_Session: number;
  public nom: string;
  public id_Niveau: number;
  public date_debut: string;
  public date_fin: string;
  public date_publication: string;
  public time_publication: string;
  public date_fin_inscription: string;
  public time_fin_inscription: string;

  public niveau: Niveau;
}
export class SessionDTO {
  public nom: string;
  public id_Niveau;
  public date_debut: string;
  public date_fin: string;
  public date_publication: string;
  public time_publication: string;
  public date_fin_inscription: string;
  public time_fin_inscription: string;
  public enseignants: number[] = [];
  public patients: Patient[] = [];
}

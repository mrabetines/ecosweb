import {Station} from "./station";
import {Stage} from "./stage";
/**
 * Created by Abbes on 16/06/2017.
 */
export class Examen {
  public id_Examen: number;
  public date: string;
  public max_Places: number;
  public id_Session: number;
  public id_Stage: number;
  public id_Enseignant: number;
  public stations: Station[];
  public stage: Stage;
}

export class ExamenDTO {
  public date: string;
  public max_places: number;
  public id_Session: number;
  public id_Stage: number;
  public id_Enseignant: number;
}

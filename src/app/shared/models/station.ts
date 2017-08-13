import {Banque} from "./Banque/banque";
/**
 * Created by Abbes on 16/06/2017.
 */
export class Station {
  public id_Station: number;
  public ponderation: number;
  public id_Banque: number;
  public id_Examen: number;
  public clicked: boolean = false;
  public banque: Banque;

}

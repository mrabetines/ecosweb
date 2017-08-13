import {Competence} from "./competence";
/**
 * Created by Abbes on 16/06/2017.
 */
export class Item {
  public id_Item: string;
  public valeur: number;
  public label: string;
  public id_Competence: number;
  public id_TitreGItem: number;
  public id_Banque: number;
  public competence: Competence;
}

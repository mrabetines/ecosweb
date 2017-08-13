import {Systeme} from "./systeme";
import {Critere} from "./critere";
import {Domaine} from "./domaine";
import {Contexte} from "app/shared/models/Banque/contexte";
import {Plainte} from "./plainte";
import {Item} from "./item";
import {BanqueType} from "./banqueType";
/**
 * Created by Abbes on 16/06/2017.
 */
export class Banque {
  public id_Banque: number;
  public label: string;
  public situation_Clinique: string;
  public instruction_Etudiant: string;
  public instruction_MedObservateur: string;
  public scenarios_Patient: string;
  public id_Domaine: number;
  public id_Critere: number;
  public id_Systeme: number;
  public id_Contexte: number;
  public status: number;
  public modify: number;
  public consigne: number;
  public diagnostic: string;
  public id_Plainte: number;
  public id_Niveau: number;
  public id_BanqueType: number;


  public domaine: Domaine;
  public critere: Critere;
  public systeme: Systeme;
  public contexte: Contexte;
  public plainte: Plainte;
  public items: Item[];
  public banque_type: BanqueType;


  public competances: string;
}

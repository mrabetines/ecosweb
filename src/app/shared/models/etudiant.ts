export class Etudiant {
  public id_Etudiant: number;
  public nom: string;
  public prenom: string;
  public CIN: number;
  public carte_Etudiant:number;
  public present:boolean;

  constructor(id_Etudiant: number,nom: string,prenom: string,CIN: number,carte_Etudiant:number,present)
{ this.id_Etudiant=id_Etudiant;
  this.nom=nom;
  this.prenom=prenom;
  this.CIN=CIN;
  this.carte_Etudiant=carte_Etudiant;
  this.present=present;

}
}
export class Beacon {
  public id_Beacon:number;
  public uuid: string ;
  public major: number;
  public minor:number;
  public id_Examen:number;

  constructor(id_Beacon?,uuid?,major?,minor?)
  { 
    this.id_Beacon=id_Beacon;
    this.uuid=uuid;
    this.major=major;
    this.minor=minor;
  }
}

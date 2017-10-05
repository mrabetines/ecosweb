export class Beacon {
  public id_Beacon:number;
  public code:string;
  public uuid: string ;
  public major: number;
  public minor:number;

  constructor(id_Beacon?,uuid?,major?,minor?,code?)
  { 
    this.id_Beacon=id_Beacon;
    this.uuid=uuid;
    this.major=major;
    this.minor=minor;
    this.code=code;
  }
}

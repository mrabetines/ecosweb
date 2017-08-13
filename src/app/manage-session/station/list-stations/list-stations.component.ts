/**
 * Created by Abbes on 21/06/2017.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StationService} from "../../../shared/services/station.service";
import {Station} from "app/shared/models/station";
import {Competence} from "../../../shared/models/Banque/competence";
import {Domaine} from "../../../shared/models/Banque/domaine";
import {Critere} from "../../../shared/models/Banque/critere";
import {Contexte} from "../../../shared/models/Banque/contexte";
import {Systeme} from "../../../shared/models/Banque/systeme";
import {BanqueType} from "../../../shared/models/Banque/banqueType";
import {Stage} from "app/shared/models/stage";
import {SharedService} from "../../../shared/services/shared.service";
import {BanqueService} from "../../../shared/services/banque.service";
import {Banque} from "../../../shared/models/Banque/banque";
import {Utils} from "../../../shared/utils";

declare var jQuery: any;
@Component({
  templateUrl: 'list-stations.component.html',
  styleUrls: [],

})
export class ListStationsComponent implements OnInit {


  examenId: number;
  evaluations: Evaluation[] = [];
  changePond: boolean;

  domaines: Domaine[] = [];
  criteres: Critere[] = [];
  competences: Competence[] = [];
  systemes: Systeme [] = [];
  banqueTypes: BanqueType[] = [];
  contextes: Contexte[] = [];

  stations: Station[] = [];
  banques: Banque[] = [];
  fixedBanques: Banque[] = [];

  ngOnInit() {

    const baseContext = this;


    this.initializeCompetenceGetter();
    this.initializeListStationDataTables();
    this.initializeDomaineSelect2();
    this.initializeCritereSelect2();
    this.initializeContexteSelect2();
    this.initializeSystemeSelect2();
    this.initializeTypeSelect2();
    this.initializeCompetenceSelect2();
    this.getAllStations();

    this.route.params.subscribe(
      params => {
        baseContext.examenId = +params["examenId"];
        this.getListStations(baseContext.examenId);
        this.getEvaluation(baseContext.examenId);
      }
    )

  }


  getAllStations() {
    this.banqueService.getAllBanques()
      .subscribe(
        (data) => {
          this.banques = data;
          this.banques.forEach(
            banque => {
              const items = banque.items;
              banque.competances = Utils.getCompetenceToString(items);
            }
          );
          this.fixedBanques = this.banques;
        },
        (error) => {

        }
      )
  }

  initializeListStationDataTables() {
    // Basic datatable
    const tableListStation = jQuery('.datatable-basic');
    tableListStation.DataTable();
  }

  initializeDomaineSelect2() {
    const domaineSelect = jQuery(".select-domaine");
    domaineSelect.select2();
    const baseContext = this;
    this.banqueService.getAllDomaine()
      .subscribe(
        (data) => {
          this.domaines = data;
        },
        (error) => {

        }
      )

    domaineSelect.on("change", function () {
      console.log(domaineSelect.val());
      baseContext.banques = baseContext.fixedBanques;
      baseContext.banques = baseContext.banques.filter(
        banque => banque.id_Domaine === +domaineSelect.val()
      );


    });


  }

  initializeCritereSelect2() {
    const critereSelect = jQuery(".select-critere");
    critereSelect.select2();

    this.banqueService.getAllCritere()
      .subscribe(
        (data) => {
          this.criteres = data;
        },
        (error) => {

        }
      )
  }

  initializeContexteSelect2() {
    const contexteSelect = jQuery(".select-contexte");
    contexteSelect.select2();

    this.banqueService.getAllContexte()
      .subscribe(
        (data) => {
          this.contextes = data;
        },
        (error) => {

        }
      )
  }

  initializeSystemeSelect2() {
    const systemeSelect = jQuery(".select-systeme");
    systemeSelect.select2();

    this.banqueService.getAllSysteme()
      .subscribe(
        (data) => {
          this.systemes = data;
        },
        (error) => {

        }
      )
  }

  initializeTypeSelect2() {
    const typeSelect = jQuery(".select-type");
    typeSelect.select2();

    this.banqueService.getAllBanqueType()
      .subscribe(
        (data) => {
          this.banqueTypes = data;
        },
        (error) => {

        }
      )
  }

  initializeCompetenceSelect2() {
    const competenceSelect = jQuery(".select-competence");
    competenceSelect.select2();

    this.banqueService.getAllCompetence()
      .subscribe(
        (data) => {
          this.competences = data;
        },
        (error) => {

        }
      )
  }

  initializeCompetenceGetter() {
    const competenceGetter = jQuery('.competence-getter');
    competenceGetter.tagsinput();


  }


  constructor(private stationService: StationService, private router: Router,
              private route: ActivatedRoute, private banqueService: BanqueService) {
  }

  getListStations(examenId: number) {
    this.stationService.getListStations(examenId)
      .subscribe(
        (stations) => {
          this.stations = stations.data;
          this.fixingCompetances();
        },
        (error) => {

        }
      );
  }


  private fixingCompetances() {

    this.stations.forEach(
      station => {
        const items = station.banque.items;
        station.banque.competances = Utils.getCompetenceToString(items);
      }
    )
  }


  private getEvaluation(examenId: number) {
    this.stationService.getEvaluations(examenId)
      .subscribe(
        (evaluations) => {
          this.evaluations = evaluations.data;
        },
        (error) => {

        }
      );
  }

  changePonderation() {

    if (this.changePond) {
      let sum = 0;
      this.stations.forEach(
        stations => {
          sum += +stations.ponderation;
        }
      );
      if (sum !== 100) {
        console.log("Il faut 100 fixe");
        return;
      }
      this.stationService.updatePonderations(this.examenId, this.stations)
        .subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {

          }
        );
    }


    this.changePond = !this.changePond;


  }

  getTotalPonderation() {
    let sum = 0;
    this.stations.forEach(
      stations => {
        sum += +stations.ponderation;
      }
    );
    return sum;
  }
}
export class Evaluation {
  public prefix: string;
  public nom: string;
  public count: number;
  public ponderation: number;
}



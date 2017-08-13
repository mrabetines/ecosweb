/**
 * Created by Abbes on 30/06/2017.
 */
/**
 * Created by Abbes on 21/06/2017.
 */
/**
 * Created by Abbes on 16/06/2017.
 */
import {Component, OnInit, AfterContentInit, OnDestroy} from '@angular/core';
import {SessionService} from "../../../shared/services/session.service";
import {ExamenService} from "../../../shared/services/examen.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ExamenDTO} from "../../../shared/models/examen";
import {Stage} from "app/shared/models/stage";
import {Enseignant} from "app/shared/models/enseignant";
import {SharedService} from "../../../shared/services/shared.service";
import {Utils} from "../../../shared/utils";
declare var jQuery: any;
@Component({
  templateUrl: 'add-examen.component.html',
  styleUrls: [],

})
export class AddExamenComponent implements OnInit, AfterContentInit, OnDestroy {


  examen: ExamenDTO = new ExamenDTO();
  sessionId: number;
  enseignants: Enseignant[] = [];
  types: Stage[] = [];


  ngOnInit() {
    const baseContext = this;


    this.initializeTypeSelect2();
    this.initializeJurySelect2();
    this.initializeDateExamen();

    this.getListEnseignants();
    this.route.params.subscribe(
      params => {
        baseContext.sessionId = +params["sessionId"];
        baseContext.getStagesBySession();
      }
    )

  }


  getListEnseignants() {
    this.sharedService.getAllEnseignant()
      .subscribe(
        (data) => {
          this.enseignants = data;
        },
        (error) => {

        }
      )
  }

  initializeTypeSelect2() {
    const typeSelect = jQuery(".select-type");
    const baseContext = this;
    typeSelect.select2();

    typeSelect.on("change", function () {
      baseContext.examen.id_Stage = +typeSelect.val();
    })
  }

  initializeJurySelect2() {
    const jurySelect = jQuery(".select-enseignant");
    const baseContext = this;
    jurySelect.select2();


    jurySelect.on("change", function () {
      baseContext.examen.id_Enseignant = +jurySelect.val();
    })
  }

  initializeDateExamen() {
    const dateExamen = jQuery('.date-examen')
    const baseContext = this;

    baseContext.examen.date = Utils.zero(new Date().getDate()) + "/" + Utils.zero(new Date().getMonth() + 1) + "/" + new Date().getFullYear();
    dateExamen.daterangepicker({
      "singleDatePicker": true,
      "locale": {
        "format": "DD/MM/YYYY"
      }
    });

    dateExamen.on("change", function () {
      baseContext.examen.date = dateExamen.val();
    })
  }


  ngAfterContentInit() {
  }

  constructor(private sessionService: SessionService, private sharedService: SharedService,
              private examenService: ExamenService, private route: ActivatedRoute,
              private router: Router) {

  }


  ngOnDestroy() {
  }

  getStagesBySession() {
    this.sessionService.getStagesBySession(this.sessionId)
      .subscribe(
        (data) => {
          this.types = data;
          console.log(data);
        },
        (error) => {

        }
      )
  }

  addExamen() {
    console.log(this.examen);

    this.examenService.addExamen(this.examen, this.sessionId)
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(["/session/" + this.sessionId + "/examen"]);
        },
        (error) => {

        }
      )
  }

}



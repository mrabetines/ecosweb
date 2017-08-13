/**
 * Created by Abbes on 21/06/2017.
 */
/**
 * Created by Abbes on 16/06/2017.
 */
import {Component, OnInit, AfterContentInit, OnDestroy} from '@angular/core';
import {SessionService} from "../../../shared/services/session.service";
import {SharedService} from "../../../shared/services/shared.service";
import {Niveau} from "../../../shared/models/niveau";
import {SessionDTO} from "../../../shared/models/session";
import {Enseignant} from "../../../shared/models/enseignant";
import {Patient} from "../../../shared/models/patient";
import {Subscription} from "rxjs/Rx";
declare var jQuery: any;
@Component({
  templateUrl: 'add-session.component.html',
  styleUrls: [],

})
export class AddSessionComponent implements OnInit, AfterContentInit, OnDestroy {

  niveaux: Niveau[] = [];
  session: SessionDTO = new SessionDTO();
  enseignants: Enseignant [] = [];
  selectedEnseignants: Enseignant[] = [];

  busy: Subscription;

  ngOnInit() {
    const baseContext = this;
    const selectNiveau = jQuery(".select-niveau");
    const selectEnseignant = jQuery(".select-enseignant");

    this.getAllNiveaux();
    this.getAllEnseignants();

    selectNiveau.select2();
    selectEnseignant.select2();


    this.session.patients.push(new Patient());
    selectEnseignant.on('change', function () {

      const pos = parseInt(selectEnseignant.val());
      baseContext.selectedEnseignants.push(baseContext.enseignants[pos]);
    });
    selectNiveau.on("change", function () {
      baseContext.session.id_Niveau = parseInt(selectNiveau.val());
    });

    jQuery(".date-debut").on("change", function () {
      baseContext.session.date_debut = jQuery(".date-debut").val();
    });
    jQuery(".date-fin").on("change", function () {
      baseContext.session.date_fin = jQuery(".date-fin").val();
    });
    jQuery(".date-debutI").on("change", function () {
      baseContext.session.date_publication = jQuery(".date-debutI").val().substring(0, 10);
      baseContext.session.time_publication = jQuery(".date-debutI").val().substring(11);
    });
    jQuery(".date-finI").on("change", function () {
      baseContext.session.date_fin_inscription = jQuery(".date-finI").val().substring(0, 10);
      baseContext.session.time_fin_inscription = jQuery(".date-finI").val().substring(11);
    })

  }

  getAllNiveaux() {
    this.sharedService.getNiveaux()
      .subscribe((data) => {
          this.niveaux = data;
          console.log(this.niveaux);
        },
        (error) => {

        });
  }

  getAllEnseignants() {
    this.sharedService.getAllEnseignant()
      .subscribe(
        (data) => {
          this.enseignants = data;
        }
      )
  }

  removeSelectedEnseignant(pos) {
    this.selectedEnseignants.splice(pos, 1);
  }

  ngAfterContentInit() {
    // Date and time
    // Single picker
    jQuery('.date-df').daterangepicker({
      "singleDatePicker": true,
      "timePicker": false,
      "timePicker24Hour": true,
      "timePickerIncrement": 15,
      "locale": {
        "format": "DD/MM/YYYY"
      }
    });
    jQuery('.date-dfI').daterangepicker({
      "singleDatePicker": true,
      "timePicker": true,
      "timePicker24Hour": true,
      "timePickerIncrement": 15,
      "locale": {
        "format": "DD/MM/YYYY HH:mm"
      }
    });


    // Select with search


  }

  constructor(private sessionService: SessionService,
              private sharedService: SharedService) {

  }


  ngOnDestroy() {
  }

  setEnseignant() {
    this.selectedEnseignants.forEach(item => {
      this.session.enseignants.push(item.id_Enseignant);
    });
  }

  addSession() {
    this.setEnseignant();

    console.log(JSON.stringify(this.session));

    this.busy = this.sessionService.addSession(this.session)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {

        }
      )
  }

  addPatient() {
    let i = 0;
    for (i = 0; i < this.session.patients.length; i++) {
      if (!this.session.patients[i].CIN || !this.session.patients[i].nom || !this.session.patients[i].prenom) {
        break;
      }
    }
    if (i === this.session.patients.length) {
      this.session.patients.push(new Patient());
    }
  }
}



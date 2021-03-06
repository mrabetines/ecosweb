/**
 * Created by Abbes on 16/06/2017.
 */
/**
 * Created by Abbes on 16/06/2017.
 */
import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../../shared/services/session.service";
import {Session} from "../../../shared/models/session";
import {ActivatedRoute, Router} from "@angular/router";
import {Examen} from "../../../shared/models/examen";
import {ExamenService} from "../../../shared/services/examen.service";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import{ManageBeaconsComponent} from "../../examen/manage-beacons/manage-beacons.component";

@Component({
  templateUrl: 'list-examens.component.html',
  styleUrls: [],

})
export class ListExamensComponent implements OnInit {

  examens: Examen[] = [];
  sessionId: number;
  bsModalRef: BsModalRef;

  ngOnInit() {

    const baseContext = this;
    this.route.params.subscribe(
      params => {
        baseContext.sessionId = +params["sessionId"];
        this.getListExamens(baseContext.sessionId);
      }
    )

  }

  constructor(private examenService: ExamenService, private router: Router,
              private route: ActivatedRoute,private modalService: BsModalService) {
  }

  getListExamens(sessionId: number) {

    this.examenService.getListExamens(sessionId)
      .subscribe(
        (examens) => {
          this.examens = examens.data;
        },
        (error) => {

        }
      )
  }

  goAddExamen() {
    this.router.navigate(["/session/" + this.sessionId + "/examen/add"]);
  }

  open(examenId)
  { this.bsModalRef=this.modalService.show(ManageBeaconsComponent);
    this.bsModalRef.content.examenId = examenId;
  }
}



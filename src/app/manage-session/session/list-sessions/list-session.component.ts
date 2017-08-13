/**
 * Created by Abbes on 16/06/2017.
 */
import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../../shared/services/session.service";
import {Session} from "../../../shared/models/session";
@Component({
  templateUrl: 'list-session.component.html',
  styleUrls: [],

})
export class ListSessionsComponent implements OnInit {

  sessions: Session[] = [];

  ngOnInit() {

    this.getListSessions();
  }

  constructor(private sessionService: SessionService) {
  }

  getListSessions() {
    this.sessionService.getListSessions()
      .subscribe(
        (sessions) => {
          this.sessions = sessions.data;
        },
        (error) => {

        }
      )
  }


}



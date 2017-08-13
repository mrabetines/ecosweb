import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {StorageService} from "../shared/services/storage.service";
declare var jQuery: any;
@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {


  constructor(private stoarageService: StorageService,
              private router: Router,
              private route: ActivatedRoute) {


  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        console.log(params.reload);
        if (params.reload) {
          window.location.href = "/";
        }

      }
    )


  }

  logout() {
    this.stoarageService.removeAll();
    this.router.navigateByUrl("/login");
  }
}

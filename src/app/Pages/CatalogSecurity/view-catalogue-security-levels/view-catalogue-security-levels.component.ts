import { Component, OnInit } from '@angular/core';
import { CatalogSecurity } from 'src/app/models/catalog-security.model';
import { Subscription } from 'rxjs';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';


@Component({
  selector: 'app-view-catalogue-security-levels',
  templateUrl: './view-catalogue-security-levels.component.html',
  styleUrls: ['./view-catalogue-security-levels.component.css']
})
export class ViewCatalogueSecurityLevelsComponent implements OnInit {

  title = 'app';
  catalogSecurityFlagListSubs?: Subscription;
  catalogSecurityFlagList: CatalogSecurity[] = [];

  constructor(private authservice: ApiPipeService) {
  }

  ngOnInit() {
    this.catalogSecurityFlagListSubs = this.authservice
      .getAllCatalogSecurityFlags()
      .subscribe(results => {
          this.catalogSecurityFlagList = results;
        },
        console.error
      );
  }

  ngOnDestroy() {
    // this.catalogSecurityFlagListSubs.unsubscribe();
  }


}


import { Component , OnInit, OnDestroy } from '@angular/core';
import { StratLithoUnit } from 'src/app/models/strat-litho-unit.model';
import { Subscription } from 'rxjs';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';

@Component({
  selector: 'app-view-strat-litho-unit',
  templateUrl: './view-strat-litho-unit.component.html',
  styleUrls: ['./view-strat-litho-unit.component.css']
})
export class ViewStratLithoUnitComponent implements OnInit, OnDestroy {

  title = 'app';
  stratLithoUnitListSubs?: Subscription;
  stratLithoUnitList: StratLithoUnit[] = [];

  constructor(
    private authservice: ApiPipeService
  ) { }

  ngOnInit() {
    this.stratLithoUnitListSubs = this.authservice
      .getAllCompanies()
      .subscribe(results => {
          this.stratLithoUnitList = results;
        },
        console.error
      );
    // this.message = '';
    // this.getCompany(this.route.snapshot.paramMap.get('company_id'));
  }

  ngOnDestroy() {
    // this.companyListSubs.unsubscribe();
  }

}

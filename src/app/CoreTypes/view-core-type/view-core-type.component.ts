
import { Component , OnInit, OnDestroy} from '@angular/core';
import { CoreType } from 'src/app/models/core-type.model';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Subscription } from 'rxjs';

class DataTablesResponse {
  data: any[] = [];
  draw?: number;
  recordsFiltered?: number;
  recordsTotal?: number;
}

@Component({
  selector: 'app-view-core-type',
  templateUrl: './view-core-type.component.html',
  styleUrls: ['./view-core-type.component.css']
})

export class ViewCoreTypeComponent implements OnInit {

  title = 'datatables';
  coreTypesListSubs?: Subscription;
  coreTypesList: CoreType[] = [];
  dtOptions: DataTables.Settings = {};

  constructor(
    private authservice: ApiPipeService,
    private http: HttpClient){ }

  ngOnInit(): void {
  const that = this;

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 2,
    serverSide: true,
    processing: true,
    ajax: (dataTablesParameters: any, callback) => {
      this.coreTypesListSubs = this.authservice
        .getAllCoreTypes()
        .subscribe(results => {
            this.coreTypesList = results;

            callback({
                  recordsTotal: results.recordsTotal,
                  recordsFiltered: results.recordsFiltered,
                  data: []
                });
          },
          console.error
        );

    },
    columns: [
              { data: 'Telephone' },
              { data: 'CoreType_id' },
              { data: 'CoreTypeName' },
              { data: 'SortOrder' },
              { data: 'Comments' },
              { data: 'ModifiedOn' },
              { data: 'ModifiedBy' },]
  };
  }


}

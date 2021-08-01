import { Component , OnInit, OnDestroy} from '@angular/core';
import { Company } from 'src/app/models/company.model';
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
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.css']
})

export class ViewCompaniesComponent implements OnInit{

    title = 'datatables';
    companyListSubs?: Subscription;
    companyList: Company[] = [];
    dtOptions: DataTables.Settings = {};

    constructor(
      private authservice: ApiPipeService,
      // private router: Router,
      // private renderer: Renderer2,
      private http: HttpClient){ }

    ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.companyListSubs = this.authservice
          .getAllCompanies()
          .subscribe(results => {
              this.companyList = results;

              callback({
                    recordsTotal: results.recordsTotal,
                    recordsFiltered: results.recordsFiltered,
                    data: []
                  });
            },
            console.error
          );
        // that.http
        //   .get<any>(
        //     'http://127.0.0.1:8899/apiv1/get_companies',
        //
        //   ).subscribe(resp => {
        //     that.companyList = resp.data;
        //
        //     callback({
        //       recordsTotal: resp.recordsTotal,
        //       recordsFiltered: resp.recordsFiltered,
        //       data: []
        //     });
        //   });
      },
      columns: [{ data: 'Company ID' }, { data: 'PAUID' }, { data: 'Long Name' },
                { data: 'NSD Number' }, { data: 'Registration No' }, { data: 'TIN' },
                { data: 'Telephone' }]
    };
    }




}

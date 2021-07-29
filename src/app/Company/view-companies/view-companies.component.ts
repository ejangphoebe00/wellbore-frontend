import { Component , OnInit, OnDestroy } from '@angular/core';
import { Company } from 'src/app/Services/company.model';
import { Subscription } from 'rxjs';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
// import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.css']
})

export class ViewCompaniesComponent implements OnInit, OnDestroy {

    title = 'app';
    companyListSubs?: Subscription;
    companyList: Company[] = [];
    // currentCompany = null;
    // message = ''

    constructor(
      private authservice: ApiPipeService)
      // private route: ActivatedRoute,
      // private router: Router)
      { }

    ngOnInit() {
      this.companyListSubs = this.authservice
        .getAllCompanies()
        .subscribe(results => {
            this.companyList = results;
          },
          console.error
        );
      // this.message = '';
      // this.getCompany(this.route.snapshot.paramMap.get('company_id'));
    }

    ngOnDestroy() {
      // this.companyListSubs.unsubscribe();
    }

  //   getCompany(company_id): void {
  //   this.authservice.read(company_id)
  //     .subscribe(
  //       result => {
  //         this.currentCompany = result;
  //         console.log(result);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  //   }
  //
  //     this.productService.update(this.currentCompany.company_id, data)
  //       .subscribe(
  //         response => {
  //           // this.currentProduct.available = status;
  //           console.log(response);
  //         },
  //         error => {
  //           console.log(error);
  //         });
  //   }
  //
  //   updateCompany(): void {
  //   this.authservice.editcompany(this.company.company_id, this.company)
  //     .subscribe(
  //       rresult => {
  //         console.log(result);
  //         this.message = 'Company details have been updated!';
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
  //
  // delete_Company(): void {
  //   this.authservice.deleteCompany(this.company.company_id)
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.router.navigate(['/company.company_id']);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }


}

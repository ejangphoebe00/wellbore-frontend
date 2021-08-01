import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { Subscription } from 'rxjs';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  currentcompany: null;

  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    // private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    // this.message: '';
  }

  // updateCompany(): void {
  // this.authservice.editcompany(this.currentcompany.company_id, this.currentcompany)
  //   .subscribe(
  //     result => {
  //       console.log(result);
  //       this.message = 'Company details have been updated!';
  //     },
  //     error => {
  //       console.log(error);
  //     });
  // }
  //
  // delete_Company(): void {
  //   this.authservice.deleteCompany(this.currentcompany.company_id)
  //     .subscribe(
  //       result => {
  //         console.log(result);
  //         this.router.navigate(['/company/']);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

}

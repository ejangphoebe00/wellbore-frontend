import { Component, OnInit } from '@angular/core';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';


@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.css']
})
export class ViewCompaniesComponent implements OnInit {


  constructor(
    private authservice: ApiPipeService,
  ) { }

  ngOnInit(): void {
    // this.getCompanies();
  }

  // getCompanies(): void {
  //    this.authservice.getAllCompanies()
  //    .subscribe(
  //      companies => {
  //        this.companies = companies;
  //        console.log(companies);
  //      },
  //      error => {
  //        console.log(error);
  //     });
  //
  // }



}

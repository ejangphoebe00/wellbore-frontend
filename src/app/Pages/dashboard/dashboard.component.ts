import { Component, OnInit } from '@angular/core';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
staffstatus:any;  
role:any;
userEmail:any;
loggedin:any;
users:any;
companies:any;
wellborecore:any;
lithoz:any;
coreCatalogz:any;
wells:any;

  constructor(
    private authservice: ApiPipeService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    // this.authservice.reload();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }

    if(this.authservice.getRole()=="Staff"){
      this.staffstatus=true;
    }else{
    this.staffstatus= false;
    }
    this.userList();
    this.CompanyList();
    this.WellboreCores();
    this.WellsList();
    this.lithos();
    this.coreCatalogs();
  
  }

  logout(){
  this.authservice.logoutuser();
  }

  userList(): void {
    this.authservice
        .getAllUsers()
        .subscribe((response: any) => {
          console.log("users List")
          console.log(response.length)
          this.users = response.length
        });
      }

  CompanyList(): void {
      this.authservice
          .getAllCompanies()
          .subscribe((response: any) => {
            console.log("Company List")
            console.log(response.length)
            this.companies = response.length
          });
        }
  
  WellsList(): void {
    this.authservice
        .getWellbores()
        .subscribe((response: any) => {
          console.log("Wellbores List")
          console.log(response.length)
          this.wells = response.length
        });
      }       
 
  WellboreCores(): void {
    this.authservice
        .getWellbores()
        .subscribe((response: any) => {
          console.log("WellboreCores List")
          console.log(response.length)
          this.wellborecore = response.length
        });
      } 
      
  lithos(): void {
    this.authservice
        .getAllStratLithoUnits()
        .subscribe((response: any) => {
          console.log("Strat List")
          console.log(response.length)
          this.lithoz = response.length
        });
      }
      
  coreCatalogs(): void {
    this.authservice
        .getCatalogList()
        .subscribe((response: any) => {
          console.log("CoreCatalogs List")
          this.coreCatalogz= response.length
          console.log(response.length)
        });
      } 

}


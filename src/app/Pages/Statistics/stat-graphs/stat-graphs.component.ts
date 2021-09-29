import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions,ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';

  

@Component({
  selector: 'app-stat-graphs',
  templateUrl: './stat-graphs.component.html',
  styleUrls: ['./stat-graphs.component.css']
})
export class StatGraphsComponent implements OnInit {
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

  public pieChartOptions: ChartOptions = {
    responsive: true,
    
  };
  
  public pieChartLabels: Label[] = ['Application Admins', 'Data Admin', 'Staff'];
  public pieChartData: SingleDataSet = [1, 3, 2];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
    
  public barChartLabels: Label[] = ['KDA', 'FDA'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
    
    public barChartData: ChartDataSets[] = [
      { data: [65, 67, 70], label: 'Injector Wells' },
      { data: [50, 48, 47], label: 'Drilled Wells' },
      { data: [40, 30, 28 ], label: 'Driven' },
    ];


    OilbarChartLabels: Label[] = ['Oil', 'Gas', 'Water'];
    OilbarChartData: ChartDataSets[] = [
      { data: [45, 37, 60], label: 'Fluid Samples' }
    ];

     
  constructor(  
    private authservice: ApiPipeService,
    private router: Router
    ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

  }



  ngOnInit(): void { 
    // this.authservice.reload();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Application Admin"){
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
  
  
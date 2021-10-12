import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, MultiDataSet } from 'ng2-charts';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-stat-graphs',
  templateUrl: './stat-graphs.component.html',
  styleUrls: ['./stat-graphs.component.css']
})
export class StatGraphsComponent implements OnInit {

  // Variable to store file
  staffstatus: any;
  role: any;
  userEmail: any;
  loggedin: any;
  users: any;
  companies: any;
  wellborecore: any;
  lithoz: any;
  coreCatalogz: any;
  wells: any;

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

  public barChartLabels: Label[] = ['KFDA', 'TDA'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public chartColors: any[] = [
    {
      backgroundColor: ["#000000", "#0000FF", "#E9AB17", "#C04000"]
    }];

  public barchartColors: any[] = [
    {
      backgroundColor: ["#000000", "#0000FF", "#E9AB17", "#C04000"]
    }];

  public piechartColors: any[] = [
    {
      backgroundColor: ["#32CD32", "#0000FF", "#F6BE00", "#C04000"]
    }];

  public devechartColors: any[] = [
    {
      backgroundColor: ["#32CD32", "#0000FF", "#F6BE00", "#32CD32", "#0000FF", "#F6BE00"]
    }];

  public barChartData: ChartDataSets[] = [
    { data: [65, 67, 70], label: 'Injector Wells' },
    { data: [50, 48, 47], label: 'Drilled Wells' },
    { data: [40, 30, 28], label: 'Driven' },
  ];


  OilbarChartLabels: Label[] = ['Oil', 'Gas', 'Water'];
  OilbarChartData: ChartDataSets[] = [
    { data: [45, 37, 60], label: 'Fluid Samples' }
  ];


  doughnutChartLabels: Label[] = ['Washed_Dried', 'Washed_Wet', 'Wet_Unwashed', 'Dry_Unwashed']
  doughnutChartData: MultiDataSet = [
    [2, 5, 1, 10]
  ];
  doughnutChartType: ChartType = 'doughnut';


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
    if (this.authservice.getRole() == "Application Admin") {
      this.role = true;
    } else {
      this.role = false;
    }

    if (this.authservice.getRole() == "Staff") {
      this.staffstatus = true;
    } else {
      this.staffstatus = false;
    }
    this.userList();
    this.CompanyList();
    this.WellboreCores();
    this.WellsList();
    this.lithos();
    this.coreCatalogs();

  }

  logout() {
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
        this.coreCatalogz = response.length
        console.log(response.length)
      });
  }





}

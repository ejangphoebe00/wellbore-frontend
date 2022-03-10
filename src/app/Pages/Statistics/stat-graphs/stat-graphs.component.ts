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
  test: any;
  kfda: any;
  tda: any;
  alwelz: any;
  DA: any;
  AA: any;
  SF: any;
  OO: any;
  WA:any;
  GA:any;
  WD:any;
  WW:any;
  WU:any;
  DU:any;




  public pieChartOptions: ChartOptions = {
    responsive: true,

  };

  public fluidPie: Label[] =['Oil', 'Gas', 'Water'];

  public wellsPieChartLabels: Label[] = ['Kfda', 'Tda'];
  public cuttingsChart: Label[]  = ['Washed_Dried', 'Washed_Wet', 'Wet_Unwashed', 'Dry_Unwashed']  
  public cuttingsPieChartData : SingleDataSet = [];

  public pieChartLabels: Label[] = ['Application Admins', 'Data Admin', 'Staff'];
  public pieChartData: SingleDataSet = [];
  public wellsPieChartData : SingleDataSet = [];
  public fluidPieChartData : SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public barChartOptions: ChartOptions = {
    responsive: true,

    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          precision: 0
        }
      }]
    }

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
      backgroundColor: ["#C04000"]
    }];

  public piechartColors: any[] = [
    {
      backgroundColor: ["#32CD32", "#0000FF", "#F6BE00", "#C04000"]
    }];

  public devechartColors: any[] = [
    {
      backgroundColor: ["#32CD32", "#0000FF", "#F6BE00"]
    }];

  public barChartData: ChartDataSets[] = [
    { data: [45, 37], label: 'Wells' }

  ];


  OilbarChartLabels: Label[] = ['Oil', 'Gas', 'Water'];
  OilbarChartData: ChartDataSets[] = [    
  ];

  percentagewellbarChartLabels: Label[] = ['Kfda', 'Tda']; 
  percentagewellbarChartData: ChartDataSets[] = [
  ];
  wellbarChartLabels: Label[] = ['Kfda', 'Tda'];
  wellbarChartData: ChartDataSets[] = [
  ];
  wellChartType: ChartType = 'bar';

  doughnutChartLabels: Label[] = ['Washed_Dried', 'Washed_Wet', 'Wet_Unwashed', 'Dry_Unwashed']
  doughnutChartData: MultiDataSet = [
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

  

    this.Allwells();
    this.TDA();
    this.KFDA();
    this.dataAdmins();
    this.AppAdmins();
    this.Staff();
    this.AllGA();
    this.AllOil();
    this.AllWater();
    this.washedDried();
    this.washedWet();
    this.wetUnwashed();
    this.DryUnwashed();

    setTimeout(() => {
      
    
      console.log('here2'); // run this after delay



    this.alwelz = this.authservice.getAllWells()
    this.test = this.authservice.getAdmins();
    this.tda = this.authservice.gettda();
    this.kfda = this.authservice.getkfda();
    this.DA = this.authservice.getDa();
    this.AA = this.authservice.getAa();
    this.SF = this.authservice.getSF();
    this.OO = this.authservice.getOO();
    this.GA = this.authservice.getGA();
    this.WA = this.authservice.getAW();

    this.WD = this.authservice.getWD();
    this.WW = this.authservice.getWW();
    this.WU = this.authservice.getWU();
    this.DU = this.authservice.getDU();
 



    console.log(this.test)
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
    this.pieChartData = [
      (((parseInt(this.AA)))/((parseInt(this.AA))+(parseInt(this.DA))+(parseInt(this.SF))))*100,
      (((parseInt(this.DA)))/((parseInt(this.AA))+(parseInt(this.DA))+(parseInt(this.SF))))*100,
      (((parseInt(this.SF)))/((parseInt(this.AA))+(parseInt(this.DA))+(parseInt(this.SF))))*100,
     ];
    [
      (((parseInt(this.AA)))/((parseInt(this.AA))+(parseInt(this.DA))+(parseInt(this.SF))))*100,
      (((parseInt(this.DA)))/((parseInt(this.AA))+(parseInt(this.DA))+(parseInt(this.SF))))*100,
      (((parseInt(this.SF)))/((parseInt(this.AA))+(parseInt(this.DA))+(parseInt(this.SF))))*100,
     ]
    this.wellbarChartData = [{ data: [((parseInt(this.kfda))/(parseInt(this.alwelz)))*100, ((parseInt(this.tda))/(parseInt(this.alwelz)))*100], label: 'Registered Wells' }];
    this.OilbarChartData = [{ data: [
      (((parseInt(this.OO)))/((parseInt(this.OO))+(parseInt(this.GA))+(parseInt(this.WA))))*100,
      (((parseInt(this.GA)))/((parseInt(this.OO))+(parseInt(this.GA))+(parseInt(this.WA))))*100,
      (((parseInt(this.WA)))/((parseInt(this.OO))+(parseInt(this.GA))+(parseInt(this.WA))))*100,
     ], label: 'Fluid Samples' }];
    this.doughnutChartData = [this.WD, parseInt(this.WW), parseInt(this.WU), parseInt(this.DU)];
    this.wellsPieChartData =  [((parseInt(this.kfda))/(parseInt(this.alwelz)))*100, ((parseInt(this.tda))/(parseInt(this.alwelz)))*100];
   this.fluidPieChartData = [
     (((parseInt(this.OO)))/((parseInt(this.OO))+(parseInt(this.GA))+(parseInt(this.WA))))*100,
     (((parseInt(this.GA)))/((parseInt(this.OO))+(parseInt(this.GA))+(parseInt(this.WA))))*100,
     (((parseInt(this.WA)))/((parseInt(this.OO))+(parseInt(this.GA))+(parseInt(this.WA))))*100,
    ];

    this.cuttingsPieChartData = [
      (((parseInt(this.WD)))/((parseInt(this.WD))+(parseInt(this.WW))+(parseInt(this.WU))+(parseInt(this.DU))))*100,
      (((parseInt(this.WW)))/((parseInt(this.WD))+(parseInt(this.WW))+(parseInt(this.WU))+(parseInt(this.DU))))*100,
      (((parseInt(this.WU)))/((parseInt(this.WD))+(parseInt(this.WW))+(parseInt(this.WU))+(parseInt(this.DU))))*100,
      (((parseInt(this.DU)))/((parseInt(this.WD))+(parseInt(this.WW))+(parseInt(this.WU))+(parseInt(this.DU))))*100,
     ];


    }, 1500);

    




  }

  TDA(): void {
    this.authservice
      .getTdaWellbores()
      .subscribe((response: any) => {
        console.log(response)
        localStorage.setItem("tda", response.length);
      });
  }

  KFDA(): void {
    this.authservice
      .getKdaWellbores()
      .subscribe((response: any) => {
        console.log(response)
        localStorage.setItem("kfda", response.length);
      });
  }

  Allwells(): void {
    this.authservice
      .getWellbores()
      .subscribe((response: any) => {
        console.log(response)
        localStorage.setItem("alwelz", response.length);

      });
  }


  AllWater(): void {
    this.authservice
      .getWater()
      .subscribe((response: any) => {
        console.log(response)
        localStorage.setItem("WA", response.length);
      });
  }





  AllOil(): void {
    this.authservice
      .getOil()
      .subscribe((response: any) => {
        console.log(response)
        localStorage.setItem("OO", response.length);
      });
  }


  AllGA(): void {
    this.authservice
      .getGas()
      .subscribe((response: any) => {
        console.log('GAS:'+response.length)
        localStorage.setItem("GA", response.length);

      });
  }


  dataAdmins(): void {
    this.authservice
      .getDataAdmins()
      .subscribe((response: any) => {
        console.log(response)
        localStorage.setItem("DA", response.length);

      });
  }

  AppAdmins(): void {
    this.authservice
      .getAppAdmins()
      .subscribe((response: any) => {
        console.log(response)
        localStorage.setItem("AA", response.length);

      });
  }


  Staff(): void {
    this.authservice
      .getStaff()
      .subscribe((response: any) => {
        console.log(response)
        localStorage.setItem("SF", response.length);

      });
  }


  washedDried(): void {
    this.authservice
      .getWashedDried()
      .subscribe((response: any) => {
        console.log(response)
        localStorage.setItem("WD", response.length);

      });
  }


  washedWet(): void {
    this.authservice
      .getWashedWet()
      .subscribe((response: any) => {
        console.log(response)
        localStorage.setItem("WW", response.length);

      });
  }


  wetUnwashed(): void {
    this.authservice
      .getWetUnwashed()
      .subscribe((response: any) => {
        console.log(response)
        localStorage.setItem("WU", response.length);

      });
  }

  DryUnwashed(): void {
    this.authservice
      .getDryUnwashed()
      .subscribe((response: any) => {
        console.log(response)
        localStorage.setItem("DU", response.length);

      });
  }

  addDelay(): void{
    setTimeout(() => {
      console.log("delay Check")
    }, 1000);
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


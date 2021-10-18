import { Component, OnInit } from '@angular/core';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
role:any;
checkstaff:any;
userEmail:any;
loggedin:any;


  constructor(
    private authservice: ApiPipeService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.authservice.reload();
    // this.loadScripts();
    this.authservice.viewingStatus();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Application Admin"){
      this.role=true;
    }else{
    this.role=false;
    }


    if(this.authservice.getRole()=="Data Admin"){
      this.checkstaff=true;
    }else{
    this.checkstaff=false;
    }

    this.KFDA();
    this.TDA();
    this.Allwells();

   

   }


   TDA(): void {
    this.authservice
      .getTdaWellbores()
      .subscribe((response: any) => {
        console.log(response)
        localStorage.setItem("tda",response.length);
      });
  }  

  KFDA(): void {
    this.authservice
      .getKdaWellbores()
      .subscribe((response: any) => {
        console.log(response)
        localStorage.setItem("kfda",response.length);
      });
  } 

  Allwells(): void {
    this.authservice
      .getWellbores()
      .subscribe((response: any) => {
        console.log(response)
        localStorage.setItem("alwelz",response.length);

      });
  }

  logout(){
  this.authservice.logoutuser();
  }

  switchAccount(){
    this.authservice.switchAccounts();
    }

  updatePassword(){
    this.router.navigate(['/update-password']);
  }

  loadScripts() {
    
    const dynamicScripts = [
      '../assets/assets/global/plugins/bootstrap/js/bootstrap.min.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }


    


}
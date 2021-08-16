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
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role=false;
    }
   }

  logout(){
  this.authservice.logoutuser();
  }

  updatePassword(){
    this.router.navigate(['/update-password']);
  }

  loadScripts() {
    
    const dynamicScripts = [
      './src/assets/assets/global/plugins/jquery.min.js'
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
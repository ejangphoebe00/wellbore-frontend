import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-web-security-levels',
  templateUrl: './web-security-levels.component.html',
  styleUrls: ['./web-security-levels.component.css']
})
export class WebSecurityLevelsComponent implements OnInit {

  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.authservice.reload();
  }

  logout(){
    this.authservice.logoutuser()

  }

}

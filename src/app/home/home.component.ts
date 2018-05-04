import { Component, OnInit } from '@angular/core';
import {LoginService} from '../admin-login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: LoginService, private route: Router) { }

  ngOnInit() {
    if (!this.auth.hasLogin()) {
      this.route.navigate(['login']);
    }
  }



}

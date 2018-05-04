import { Component, OnInit } from '@angular/core';
import {LoginService} from "../admin-login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: LoginService, private route: Router) { }

  ngOnInit() {
  }

  logout() {
    this.auth.signOut();
    this.route.navigate(['login']);
  }

}

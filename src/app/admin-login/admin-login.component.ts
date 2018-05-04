import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private loginservice: LoginService, private router: Router) {
  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const passowrd = form.value.password;
    this.loginservice.login(email, passowrd).then(() => this.router.navigate(['home']));

  }


}

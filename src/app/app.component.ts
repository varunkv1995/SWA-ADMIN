import {Component, OnInit} from '@angular/core';
import {LoginService} from './admin-login/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public auth: LoginService, private router: Router) {


    this.auth.user.subscribe(user => {
        if (!user) {
          this.router.navigate(['login']);
        } else {
          this.auth.userDetials = user;
            this.router.navigate(['home']);
          }
      });
  }

  ngOnInit(): void {

  }

}

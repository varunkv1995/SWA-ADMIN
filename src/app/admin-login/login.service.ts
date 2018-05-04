import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {
  user: Observable<firebase.User>;
  userDetials: firebase.User = null;
  constructor(private fire: AngularFireAuth) {
    this.user = this.fire.authState;
  }
  login(email: string, password: string) {
    return this.fire.auth.signInWithEmailAndPassword(email , password);
  }

  hasLogin() {
    return this.userDetials!= null;
  }

  signOut() {
    this.fire.auth.signOut();
  }
}

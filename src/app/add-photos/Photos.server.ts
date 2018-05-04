import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/RX';


@Injectable()
export class PhotosServer {
  constructor(private http: Http) {
  }

  storeService(name: string ) {
    const headers = new Headers({'Content-type': 'application/json'});
    return this.http.post('https://swa-interior.firebaseio.com/data.json', name,
       {headers: headers});
  }

  getServers() {
    return this.http.get('https://server-1da50.firebaseio.com/data.json');
  }
}


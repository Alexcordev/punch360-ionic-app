import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { AlertController, LoadingController, NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  baseUrl: string = "http://localhost:3000/auth";
  url: string = "http://localhost:3000/api";
  @Input() username: EventEmitter<User> = new EventEmitter();


  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor(private http: HttpClient, private alertCtrl: AlertController, public navCtrl: NavController) {

  }

  headers= new HttpHeaders()
  .set('content-type', 'application/json');



  login(user: User) {
    console.log(user);
    this._userIsAuthenticated = true;
    return this.http.post<User>(`${this.baseUrl}/login`, user, {'headers': this.headers});


}
getusername() {
  return this.http.get(`${this.baseUrl}/username`);
}



  uploadImage(image: any) {
    return this.http.get<any>(`${this.url}/images/${image}`);
  }



  logout() {
    this._userIsAuthenticated = false;
    return this.http.get(`${this.baseUrl}/logout`);
  }

  showAlert(text: string, message: string) {
    this.alertCtrl
      .create({
        header: text,
        message: message,
        buttons: ['Ok']
      })
      .then(alertEl => alertEl.present());
  }


}

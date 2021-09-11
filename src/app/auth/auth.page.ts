import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


import { AuthService } from './auth.service';
import { User } from '../interfaces/user';
import { AlertController, LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
user: User = { image: '', email: '', password: '' };
message: string;
text: string;
value: any;

  ngOnInit() {}

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,

  ) {}

    login() {
     this.authService
     .login(this.user)
     .subscribe(data => this.handleSuccess(data), error => this.handleError(error));

    }

    handleSuccess(data) {
      console.log('logged in', data);

      this.router.navigate(['/projects', JSON.stringify(data)]);
      this.text = "Bienvenue " + data.user.name;

      this.message = "Vous êtes connecté";
      this.showAlert(this.text, this.message);
    }

    handleError(error) {
      console.log('NOT logged in', error);
      this.message = "L'\authentification a échoué";
      this.text = "Une erreur est survenue";
      this.showAlert(this.text, this.message);

    }


  private showAlert(text: string, message: string) {
    this.alertCtrl
      .create({
        header: text,
        message: message,
        buttons: ['Ok']
      })
      .then(alertEl => alertEl.present());
  }
}

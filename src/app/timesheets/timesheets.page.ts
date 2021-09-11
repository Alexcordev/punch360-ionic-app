import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController, Platform, NavController } from '@ionic/angular';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Timesheet } from '../interfaces/timesheet';
import { ProjectsService } from '../services/projects.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-timesheets',
  templateUrl: 'timesheets.page.html',
  styleUrls: ['timesheets.page.scss']
})

export class TimesheetsPage implements OnInit {

  username: any;
  message: string;
  text: string;
  timesheets: any;
  my_timesheets: any[] = [];
  uploadedImage = '';
  restAPI: string = "http://localhost:3000/api/timesheets";
  imagePath = environment.imagePath;
  name: string;
  nameToSend: any;

  constructor(private navCtrl: NavController, private projectsService: ProjectsService, private http: HttpClient, private nativeHttp: HTTP, private platform: Platform, private loadingCtrl: LoadingController, private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.username = JSON.parse(this.activatedRoute.snapshot.params["username"]);
    //this.authService.getusername().subscribe(user => {
      console.log('in tab2 ' + this.username.user.name);
      this.name = this.username.user.name.toString();
      this.getDataEverywhere();
  }

  async getDataStandard() {
    let loading = await this.loadingCtrl.create();
    await loading.present();

    this.http.get(this.restAPI).pipe(
      finalize(() => loading.dismiss())
    )

    .subscribe(data => {
      console.log(data);
      this.timesheets = data;
      this.timesheets.map(timesheet => {

          if(timesheet.name === this.name) {
          console.log(timesheet.name);
          this.my_timesheets.push(timesheet);
          console.log('mes feuilles de temps : ' + this.my_timesheets);

        }
      });
      });


  }

  getTimesheet() {
    this.projectsService
      .getAllTimesheets()
      .subscribe(data => this.handleSuccess(data));
  }
    handleSuccess(data: any) {
      console.log('OK handleSuccess - ', data);
      console.log(this.username);



      data.map(timesheet => {
        timesheet.workers.forEach(el => {
          if(el.name === this.username) {
          console.log('timesheet project ' + timesheet.project);
          this.my_timesheets.push(timesheet);
          console.log('my timesheets ' + this.my_timesheets);

        }
      });
      });
    }

  async getTimesheets() {
    let loading = await this.loadingCtrl.create();
    await loading.present();

    let nativeCall = this.nativeHttp.get(this.restAPI, {}, {
      'Content-Type': 'application/json'
    });

    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    )

    .subscribe(data => {
      console.log('native data:', data);
      let parsed = JSON.parse(data.data);
      this.timesheets = parsed;
      this.timesheets.map(timesheet => {

          if(timesheet.name === this.name) {
          console.log('timesheet project name: ' + timesheet.project);
          this.my_timesheets.push(timesheet);
          console.log('mes feuilles de temps : ' + this.my_timesheets);

    }
    });
    });
  };

  getDataEverywhere() {
    this.platform.is('cordova') ? this.getTimesheets() : this.getDataStandard();
  }

  logout() {
    this.message = 'Vous êtes maintenant déconnecté';
    this.authService.logout().subscribe((data) => {
      this.text = 'Au revoir ' + this.username;
      console.log(data);
      this.authService.showAlert(this.text, this.message);
      this.router.navigate(['/']);
    });
  }

  goBack() {
    this.router.navigate(['/profile', JSON.stringify(this.username)], {replaceUrl: true });
  }

  getMyProjects() {
    this.router.navigate(['/projects', JSON.stringify(this.username)]);
    console.log('type of username ' + typeof(this.username));
  }

  getMyProfile() {
    this.router.navigate(['/profile', JSON.stringify(this.username)]);
    console.log('type of username ' + typeof(this.username));
  }

  getTimesheetId(id) {
    this.router.navigate(['/timesheet-item', id], {replaceUrl: true });
    //this.navCtrl.navigateForward('/timesheet-item');
    console.log(id);
  }
}


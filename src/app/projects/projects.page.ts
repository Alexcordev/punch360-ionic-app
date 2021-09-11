import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Project } from '../interfaces/project';
import { Timesheet } from '../interfaces/timesheet';
import { User } from '../interfaces/user';
import { ProjectsService } from '../services/projects.service';
import { StorageService } from '../services/storage.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReplaceSource } from 'webpack-sources';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  nameToSend: string;
  message: string;
  text: string;
  username: any;
  data = [];
  loggedUser: User;
  lat: any = '';
  lng: any = '';
  name: any = '';
  coordinates: any = { lat: this.lat, long: this.lng };
  clock: Date = new Date();
  date: Date = new Date();
  options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  start: any;
  stop: any;
  timesheet: Timesheet;
  user: User;
  imagePath = environment.imagePath;
  projet: any;
  my_projects: any[] = [];
  selected_option: string;


  constructor(

    private alertCtrl: AlertController,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private projectsService: ProjectsService,
    private router: Router
  ) {}

  baseUrl = 'http://localhost:3000/api';

  ngOnInit() {
    this.getProjects();
    this.startTime();
    console.log(this.clock);
    this.username = JSON.parse(this.activatedRoute.snapshot.params["username"]);



  }

  startTime() {
    var intervalVar = setInterval(function () {
      this.clock = new Date().toLocaleTimeString().substr(0,8);
      this.date = new Date().toLocaleDateString("fr-FR", this.options );
    }.bind(this),500)}


    async getCurrentPosition() {
      //this.getMap();
      this.getStartTime();
      Plugins.Geolocation.getCurrentPosition().then(

        geolocationPosition => {
          this.coordinates = {lat: geolocationPosition.coords.latitude, lng: geolocationPosition.coords.longitude};
          //this.addHomeMarker(geolocationPosition.coords.latitude, geolocationPosition.coords.longitude);

        },err => {
          console.log('erreur', err);
        });
        return this.coordinates;
    }

  getStartTime() {
    this.start = new Date();
    this.start.getHours(); // => 9
    this.start.getMinutes(); // =>  30
    this.start.getSeconds(); // => 51
    console.log(this.start.toLocaleTimeString().substr(0,8));
    if(this.start !== null) {
      this.showAlert('Punch In bien enregistré', 'Merci ' + this.username.user.name);
      return this.start;
    }
    this.showAlert('Erreur', 'Veuillez puncher à nouveau');
  }

  getStopTime() {
    this.stop = new Date();
    this.stop.getHours(); // => 9
    this.stop.getMinutes(); // =>  30
    this.stop.getSeconds(); // => 51
    this.createTimeSheet();
    console.log(this.stop.toLocaleTimeString().substr(0,8));
    return this.stop;
  }
  createTimeSheet() {
    this.projet = this.selected_option;
      this.timesheet = {image: environment.imagePath + this.username.user.image, name: this.username.user.name, project: this.projet, lat: this.coordinates.lat, lng: this.coordinates.lng, start: this.start.toLocaleTimeString().substr(0,8), end: this.stop.toLocaleTimeString().substr(0,8)}
      console.log(this.timesheet);
      this.projectsService
        .createTimeSheet(this.timesheet)
        .subscribe(data => this.success(data), error => this.error(error));
    }
    success(data) {
      this.text = "Punch Out bien enregistré";
      this.message = "Merci " + this.username.user.name;
      this.showAlert(this.text, this.message);
      console.log('OK handleSuccess - timesheet created', data);
      this.projectsService.dispatchTimesheetCreated(data._id);
      this.projectsService.handleTimesheetCreated();
      //this.ngOnDestroy();

    }

    error(error) {
      console.log('KO handleError - timesheet NOT created', error);
    }

  logout() {
    this.message = 'Vous êtes maintenant déconnecté';
    this.authService.logout().subscribe((data) => {
      this.text = 'Au revoir ' + this.username.user.name;
      console.log(data);
      this.authService.showAlert(this.text, this.message);
      this.router.navigate(['']);
    });
  }

  goBack() {
    this.router.navigate(['projects', JSON.stringify(this.username)], { replaceUrl: true });
  }


  private showAlert(text: string, message: string) {
    this.alertCtrl
      .create({
        header: text,
        message: message,
        buttons: ['Ok'],
      })
      .then((alertEl) => alertEl.present());
  }
  getProjects() {
    this.projectsService
      .getAllProjects()
      .subscribe(data => this.handleSuccess(data), error => this.handleError(error));
  }
    handleSuccess(data: any) {
      console.log('OK handleSuccess - ', data);
      console.log(this.username.user.name);



      data.map(project => {
        project.workers.forEach(el => {
          if(el.name === this.username.user.name) {
          console.log(project.name);
          this.my_projects.push(project);
          console.log(this.my_projects);

        }
      });
      });
    }

    getTimesheets() {
      this.router.navigate(['timesheets', JSON.stringify(this.username)], { replaceUrl: true });
      console.log('type of username ' + typeof(this.nameToSend));
    }




    handleError(error) {
      console.log('ok handleError', error);
    }

    getMyProfile() {
      this.router.navigate(['/profile', JSON.stringify(this.username)], { replaceUrl: true });
      console.log('type of username ' + typeof(this.username));
    }


    }












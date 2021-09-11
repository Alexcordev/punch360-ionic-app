import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, of, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Project } from '../interfaces/project';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { Timesheet } from '../interfaces/timesheet';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  baseUrl: string = "http://localhost:3000/api";
  private projectCreated = new Subject<string>();
  private timesheetCreated = new Subject<string>();
  projects: Project[] = [];
  uploadedImage = '';
  restAPI: string = "http://localhost:3000/api/projects";
    constructor( private http: HttpClient, private nativeHttp: HTTP, private platform: Platform, private loadingCtrl: LoadingController) { }

  async getDataStandard() {
    let loading = await this.loadingCtrl.create();
    await loading.present();

    this.http.get(this.restAPI).pipe(
      finalize(() => loading.dismiss())
    )

    .subscribe(data => {
      console.log(data);
      this.projects = data['results'];
    }, err => {
      console.log('erreur', err);
    });
  }

  async getProjects() {
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


    }, err => {
      console.log('erreur', err);
    });
    }

  getDataEverywhere() {
    this.platform.is('cordova') ? this.getProjects() : this.getDataStandard();
  }

  getAllProjects(): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/projects`);
  }

  getAllTimesheets(): Observable<Timesheet> {
    return this.http.get<Timesheet>(`${this.baseUrl}/timesheets`);
  }

  getTimesheetById(id): Observable<Timesheet> {
    return this.http.get<Timesheet>(`${this.baseUrl}/timesheet/${id}`);
  }

  getProjectById(id): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/projects/${id}`);
  }

  getUserById(id): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }


  createProject(project: Project) {
    return this.http.post<Project>(`${this.baseUrl}/add-project`, project);
  }

  createTimeSheet(timesheet: Timesheet) {
    return this.http.post<Timesheet>(`${this.baseUrl}/create-timesheet`, timesheet);
  }

  uploadImage(formData: FormData) {
    return this.http.post<any>(`${this.baseUrl}/projects/images`, formData);
  }

  dispatchProjectCreated(id: string) {
    this.projectCreated.next(id);
  }

  handleProjectCreated() {
    return this.projectCreated.asObservable();
  }

  dispatchTimesheetCreated(id: string) {
    this.timesheetCreated.next(id);
  }
  handleTimesheetCreated() {
    return this.timesheetCreated.asObservable();
  }
}

import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from './interfaces/project';
import { ProjectsService } from './services/projects.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @Input() username: any;


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  }
  getNotification(evt) {
    console.log(evt);
}
}

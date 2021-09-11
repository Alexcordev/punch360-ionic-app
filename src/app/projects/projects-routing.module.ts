import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsPage } from './projects.page';


const routes: Routes = [
  {
    path: '',
    component: ProjectsPage,
    children: [
      {
        path: 'timesheets',
        loadChildren: () => import('../timesheets/timesheets.module').then(m => m.TimesheetsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsPageRoutingModule {}

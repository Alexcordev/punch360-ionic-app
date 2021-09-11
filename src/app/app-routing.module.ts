import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [


  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('../app/auth/auth.module').then( m => m.AuthPageModule)},
  { path: 'projects/:username', loadChildren: () => import('../app/projects/projects.module').then( m => m.ProjectsPageModule)},
  { path: 'timesheets/:username', loadChildren: () => import('../app/timesheets/timesheets.module').then( m => m.TimesheetsPageModule)},
  //{ path: 'timesheet-item/:id', loadChildren: './timesheet-item/timesheet-item.module#TimesheetItemPageModule' },


  //{ path: 'project/:id', loadChildren: './project/project.module' },


  //{ path: 'timesheet-item/:id', loadChildren: () => import('./timesheet-item/timesheet-item.module').then(m => m.TimesheetItemPageModule) },


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

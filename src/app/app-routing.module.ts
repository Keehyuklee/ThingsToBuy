import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomePageModule'
      },
      {
        path: 'edit/:id',
        loadChildren: './home/edit/edit.module#EditPageModule'
      },
      {
        path: 'detail/:id',
        loadChildren: './home/detail/detail.module#DetailPageModule'
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

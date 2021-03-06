import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'add-edit-data/:type/:id',
    loadChildren: () => import('./add-edit-data/add-edit-data.module').then( m => m.AddEditDataPageModule)
  },
  {
    path: 'add-edit-data/:type',
    loadChildren: () => import('./add-edit-data/add-edit-data.module').then( m => m.AddEditDataPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAboutComponent } from './home-about/home-about.component';
import { HomeIntroComponent } from './home-intro/home-intro.component';
import { HomeLinksComponent } from './home-links/home-links.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';

const routes: Routes = [
  { path: 'home', pathMatch: 'full', redirectTo: '/intro' },
  { path: 'about', pathMatch: 'full', component: HomeAboutComponent },
  { path: 'intro', pathMatch: 'full', component: HomeIntroComponent },
  { path: 'links', pathMatch: 'full', component: HomeLinksComponent },
  { path: 'menu', pathMatch: 'full', component: HomeMenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

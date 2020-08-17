import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeIntroComponent } from './home-intro/home-intro.component';
import { HomeAboutComponent } from './home-about/home-about.component';
import { HomeLinksComponent } from './home-links/home-links.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';

@NgModule({
  declarations: [
    HomeIntroComponent,
    HomeAboutComponent,
    HomeLinksComponent,
    HomeMenuComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }

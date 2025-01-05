import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoroscopeComponent } from './components/horoscope/horoscope.component';
import { ZodiacComponent } from './components/zodiac/zodiac.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { OpenPageComponent } from './components/open-page/open-page.component';

const routes: Routes = [
  { path: '', component: OpenPageComponent },
  { path: 'maincontent', component: MainContentComponent },
  { path: 'horoscope/0', component: MainContentComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'horoscope/:num', component: HoroscopeComponent },
  { path: 'zodiac/:num/0', component: HoroscopeComponent },
  { path: 'zodiac/:num/:id',component: ZodiacComponent },
  { path: '', redirectTo: '/MainContentComponent', pathMatch: 'full' }
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


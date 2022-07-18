import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { StakeAppComponent } from './components/stake-app/stake-app.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'landing-page', component: LandingPageComponent},
  {
    path: 'stake-app', component: StakeAppComponent,
    canActivate: [AuthGuard],
  },
  {path: '', redirectTo: '/landing-page', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

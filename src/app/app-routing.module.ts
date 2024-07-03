import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChargingListComponent } from './components/charging-list/charging-list.component';
import { ChargerDetailComponent } from './components/charger-detail/charger-detail.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'profile',
    component: ProfileComponent
  },
  {
    path:'chargerList',
    component: ChargingListComponent
  },
  {
    path:'chargerDetail',
    component: ChargerDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

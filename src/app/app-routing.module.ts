import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { ResgisterComponent } from './resgister/resgister.component';

const routes: Routes = [
  //login path
  { path: '', component: LoginComponent },
  //dashboard path
  { path: 'dashboard', component: DashBoardComponent },
  //register path
  {path:'register', component:ResgisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

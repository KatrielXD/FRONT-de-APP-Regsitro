import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [{
  path: "auth",
  loadChildren: () => import("../app/auth/auth.module").then(m => m.AuthModule) 
},
{
  path: "task",
  loadChildren: () => import("../app/task/task.module").then(m => m.TaskModule),
  canActivate: [AuthGuard],
  canLoad: [AuthGuard] 
},
{
  path: "**",
  redirectTo: "auth"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

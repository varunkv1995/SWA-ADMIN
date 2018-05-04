import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AddPhotosComponent} from "./add-photos/add-photos.component";
import {AddProjectsComponent} from "./add-projects/add-projects.component";
import {AppComponent} from "./app.component";
import {AdminLoginComponent} from "./admin-login/admin-login.component";
import {HomeComponent} from "./home/home.component";


const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'login', component: AdminLoginComponent},
  {
    path: 'home', component: HomeComponent, children: [
    {path: '', component: AddPhotosComponent},
    {path: 'addPhotos', component: AddPhotosComponent},
    {path: 'addProjects', component: AddProjectsComponent},
  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRouter {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameListComponent} from './components/game-list/game-list.component'
import  { GameFormComponent } from './components/game-form/game-form.component'

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'/games' },
  {path:'games' , component:GameListComponent},
  {path:'game/add' , component:GameFormComponent},
  {path:'game/edit/:id' , component:GameFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

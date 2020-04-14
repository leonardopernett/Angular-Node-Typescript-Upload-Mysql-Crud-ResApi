import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Game} from '../model/game'
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class GamesService {
  API_URI:string ='http://localhost:4000/api/games'
  constructor(private http: HttpClient) {
    
   }

   getGames(){
      return this.http.get(this.API_URI);
   }

   saveGame(title, description, images){
      const formdata:FormData = new FormData();
      formdata.append('title', title)
      formdata.append('description', description)
      formdata.append('images', images);

     return this.http.post(this.API_URI, formdata);
   }

   deleteGame(id:number){
     return this.http.delete(this.API_URI+'/'+id)
   }

   actualizar(title:string, description:string,images:File,id:number){
    const formdata:FormData = new FormData();
    formdata.append('title', title)
    formdata.append('description', description)
    formdata.append('images', images);

   return this.http.put(this.API_URI+'/'+id ,formdata);
   }

   getOneGame(id:string){
    return this.http.get(this.API_URI+'/'+id)
   }

}

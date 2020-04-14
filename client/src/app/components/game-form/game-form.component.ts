import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/model/game';
import {GamesService} from '../../services/games.service';
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  game:Game={
    id:null,
    title:'',
    description:'',
    created_at: new Date()
  }
  imgURL:any;
  edit:boolean = false;
  images:File= null

  constructor(private gameservice:GamesService, private route:Router, private activerouter: ActivatedRoute) { }

  ngOnInit(): void {
   const params =  this.activerouter.snapshot.params;
    if(params.id){
      this.edit= true
      this.gameservice.getOneGame(params.id).subscribe(
        res=>{
          this.game=res[0]
        },
        err=>console.log(err)
      )
    }
  }

  createGame(){
    this.gameservice.saveGame(this.game.title, this.game.description, this.images).subscribe(
      res=>{
        console.log(res)
        this.route.navigate(['/games'])
      },
      err=>console.log(err)
    );
   }

   updateGame(){
    this.gameservice.actualizar(this.game.title, this.game.description, this.images, this.game.id).subscribe(
      res=>{
        console.log(res)
        this.route.navigate(['/games'])
      },
      err=>console.log(err)
    )
   }

   
    onFileChange(event){
      if(event.target.files && event.target.files.length>0){
         const file = event.target.files[0];
         //presuavilizacion de la imagen
         const reader = new FileReader();
         reader.readAsDataURL(file)
         reader.onload = (event)=>{
           this.imgURL = reader.result
         }
         this.images= file;
      
        }
    
    }


}

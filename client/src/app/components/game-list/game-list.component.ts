import { Component, OnInit } from '@angular/core';
import {GamesService} from '../../services/games.service'
import { Game } from 'src/app/model/game';
import {Router} from '@angular/router'
@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
   games:Game;

  constructor(private gameService: GamesService, private router :Router) { }

  ngOnInit(): void {
     this.getGames();
  }

  getGames(){
    this.gameService.getGames().subscribe(
      res=> {
        this.games = res
      },
      err=>console.log(err)
    )
  }

  removeGame(id:number){
    this.gameService.deleteGame(id).subscribe(
      res=> {
        console.log(res);
        this.getGames();
      },
      err=>console.log(err)
    )
  }

  // editGame(id:number){
  //    this.router.navigate(['/game/edit/'+id])
  // }

}

import { Router } from "express";
import {gameController} from '../controller/GameController';

class GameRouter {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.route('/')
               .get(gameController.getGames)
               .post(gameController.saveGame);

    this.router.route('/:id')
               .get(gameController.getOneGames)
               .delete(gameController.deleteGames)
               .put(gameController.updateGame)
  }
}

const gameRouter = new GameRouter();
export default gameRouter;
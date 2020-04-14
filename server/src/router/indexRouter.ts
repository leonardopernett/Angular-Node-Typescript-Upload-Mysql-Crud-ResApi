import { Router } from "express";

class IndexRouter {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {

  }
}

const indexRouter = new IndexRouter();
export default indexRouter;
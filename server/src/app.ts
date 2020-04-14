import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

import gameRouter from './router/gameRouter';
import indexRouter from './router/indexRouter';

const app:Application = express();
app.set('port', process.env.PORT || 4000);
  
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/upload'),
    filename: function(req, file ,cd){
        cd(null, Date.now()+ path.extname(file.originalname))
     }
  })
      
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(multer({storage:storage}).single('images'))
      
app.use(indexRouter.router);
app.use('/api/games',gameRouter.router);
 
app.use(express.static(path.join(__dirname,'public')));
    
export default app;

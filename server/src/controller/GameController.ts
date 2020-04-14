import {Request, Response, NextFunction} from 'express'
import database from '../database';
import fs, { pathExists } from 'fs-extra';
import path from 'path';

class GamesController {

    public  async  getGames(req:Request, res:Response){
        const pool = await database.getConnection();
        const games = await pool.query('SELECT * FROM games');
        console.log();
        res.json(games);
    }

    async  getOneGames(req:Request, res:Response){
        const {id}= req.params;
        const pool = await database.getConnection();
        const game = await pool.query('SELECT * FROM games WHERE id=?',[id]);
        res.json(game)
    }

    async  saveGame(req:Request, res:Response){
        const {title, description} = req.body
        const newGames = {
            title,
            description,
            image:'/upload/'+req.file.filename
        }
        const pool  = await database.getConnection();
           await pool.query('INSERT INTO games SET ?',[newGames]);
        res.json({message:"game saved "});
    }

async deleteGames(req:Request, res:Response){
         const {id}= req.params;
         const pool = await database.getConnection();
         const imageSelected= await pool.query('SELECT * FROM games WHERE id=?', [id]);
         await pool.query('DELETE FROM games WHERE id=?', [id]);
         await fs.unlink(path.resolve('./src/public'+imageSelected[0].image));
         res.json({message:"deleted"});

}
 async updateGame(req:Request, res:Response){
    const {title, description} = req.body
    const {id}= req.params
    const newGames = {
        title,
        description,
        image:'/upload/'+req.file.filename
    }
   
    const pool = await database.getConnection();
     //busca la imagen de la carpeta
    const imageSelected= await pool.query('SELECT * FROM games WHERE id=?', [id]);
    //la elimina de la carpeta
    await fs.unlink(path.resolve('./src/public'+imageSelected[0].image));
    //actualiza la lueva image
    await pool.query('UPDATE games SET ? WHERE id=?', [newGames,id]);
    res.json({ message: "The game was Updated" });

 }

}
export const gameController = new GamesController();
import { Request, Response } from "express";
import battleService from "../Services/battleService.js";


async function battleController(req:Request, res:Response){
   try {    
    const { firstUser, secondUser }:{ firstUser:string, secondUser:string }   = req.body

    const battle:any = await battleService.battleUsers({ firstUser, secondUser });
  
    return res.send(battle);
   } catch (error) {
        console.log(error);
        return  res.sendStatus(500);
   }
}

export default battleController;
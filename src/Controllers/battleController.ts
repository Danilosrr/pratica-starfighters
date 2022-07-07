import { Request, Response } from "express";
import { badRequestError, unprocessableEntityError } from "../middlewares/errorHandler.js";
import battleService from "../Services/battleService.js";


async function battleController(req:Request, res:Response){ 
    const { firstUser, secondUser }:{ firstUser:string, secondUser:string }   = res.locals.body

    const battle:any = await battleService.battleUsers({ firstUser, secondUser });
    if (battle.message){
        throw badRequestError;
    }
    return res.send(battle);
}

export default battleController;
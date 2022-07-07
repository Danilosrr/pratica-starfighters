import { Request, Response } from "express";
import rankingService from "../Services/rankingService.js";

export async function rankingController(req: Request, res: Response) {
    
    const ranking = await rankingService.ranking();

    res.send(ranking);
}
import { Router } from "express";
import battleController from "../Controllers/battleController.js";
import validSchema from "../middlewares/schemaValidation.js";
import battleSchema from "../Schemas/battleSchema.js";

const gitRouter = Router();

gitRouter.post('/battle', validSchema(battleSchema), battleController);
gitRouter.get('/ranking',);

export default gitRouter;
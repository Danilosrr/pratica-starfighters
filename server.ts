import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import gitRouter from "./src/Routes/gitRouter.js";
import handleErrors from "./src/middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(gitRouter);
app.use(handleErrors);

const port = +process.env.PORT || 4000;
app.listen(port,() => {
    console.log(`server is listening on port ${port}`)
});
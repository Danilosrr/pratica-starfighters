import connection from "../../database.js";

async function AddUsername(username){
    const query = await connection.query(
        `SELECT EXISTS (SELECT FROM "fighters" WHERE "fighters".username=$1) AS "response"`,[username]
    );
    const response:boolean = query.rows[0].response
    if (!response){
        await connection.query(
            `INSERT INTO "fighters" (username, wins, losses, draws) VALUES ($1,0,0,0)`,[username]
        );
    }
    return;
};

async function queryBattle( { winner, loser, draw }:{winner:string | null , loser:string | null, draw:boolean} ){
    await AddUsername(winner); 
    await AddUsername(loser);
    if ( draw ){
        await updateDraws(winner);
        await updateDraws(loser);
        return;   
    } else {
        await updateWins(winner);
        await updateLosses(loser);
        return;
    };
};

async function updateDraws(user:string){
    return await connection.query(
        `UPDATE "fighters" SET draws = "fighters".draws + 1
         WHERE "fighters".username =$1
        `,[user]
    );
};
async function updateWins(user:string){
    return await connection.query(
        `UPDATE "fighters" SET wins = "fighters".wins + 1
         WHERE "fighters".username =$1
        `,[user]
    );
};
async function updateLosses(user:string){
    return await connection.query(
        `UPDATE "fighters" SET losses = "fighters".losses + 1
         WHERE "fighters".username =$1
        `,[user]
    );
};

const battleRepository = {
    AddUsername,
    queryBattle,
};

export default battleRepository;
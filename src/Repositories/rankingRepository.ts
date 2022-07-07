import connection from "../../database.js";

async function getRanking(){
    return await connection.query(`
        SELECT * FROM fighters
        ORDER BY wins DESC, draws DESC
    `);
};

const rankingRepository = {
    getRanking
};

export default rankingRepository;
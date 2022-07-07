import rankingRepository from "../Repositories/rankingRepository.js";

async function ranking(){
    const ranking = await rankingRepository.getRanking();

    const result: object = {
        fighters: ranking.rows
    };

    return result;
}

const rankingService = {
    ranking
}

export default rankingService;
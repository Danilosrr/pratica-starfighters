import axios, { AxiosPromise, AxiosResponse } from "axios";
import { badRequestError } from "../middlewares/errorHandler.js";
import battleRepository from "../Repositories/battleRepository.js";

async function battleUsers({ firstUser, secondUser } : { firstUser:string, secondUser:string }){
    interface result{
        winner:string | null
        loser:string | null
        draw:boolean
    };

    let firstRequest:AxiosResponse;
    let secondRequest: AxiosResponse;

    try {
        firstRequest = await axios.get(`https://api.github.com/users/${firstUser}/repos`);
        secondRequest = await axios.get(`https://api.github.com/users/${secondUser}/repos`);
    } catch (err) {
        console.log(err)
        throw badRequestError('API request error.');
    }

    let firstUserCount = 0;
    firstRequest.data.map(repository => firstUserCount += repository.stargazers_count );

    let secondUserCount = 0;
    secondRequest.data.map(repository => secondUserCount += repository.stargazers_count );
    
    if(firstUserCount > secondUserCount){
        let result = {
            winner: firstUser.toLowerCase(),
            loser: secondUser.toLowerCase(),
            draw: false
        };
        battleRepository.queryBattle(result);
        return result;
    } else if (firstUserCount < secondUserCount){
        let result = {
            winner: secondUser.toLowerCase(),
            loser: firstUser.toLowerCase(),
            draw: false
        };
        battleRepository.queryBattle(result);
        return result;
    } else {
        let result = {
            winner: firstUser.toLowerCase(),
            loser: secondUser.toLowerCase(),
            draw: true
        }; 
        battleRepository.queryBattle(result);
        return {
            winner: null,
            loser: null,
            draw: true
        };
    };

}

const battleService = {
    battleUsers
}

export default battleService;
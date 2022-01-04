import axios from 'axios';
import { URL_ENDING } from '../constants'

const apiClient = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public'
})

export interface Character {
    userId: number,
    name: String,
    id: number,
    title: String
}

export interface GetCharactersResponse {
    data: {
        results: Character[]
    }
}

interface GetCharactersRequest {
    events: number[],
    series: number[],
    comics: number[]
}

const getCharacters = async ( { events, series, comics }: GetCharactersRequest): Promise<GetCharactersResponse> => {
    const response = await apiClient.get('/characters?' + URL_ENDING);
    return response.data;
  };

export default getCharacters
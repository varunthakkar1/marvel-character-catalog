import axios from 'axios';
import { URL_ENDING } from '../constants'
import { GetCharactersResponse, GetCharactersRequest } from './dto/getCharactersDto';

const apiClient = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public'
})

const getCharacters = async ( { events, series, comics }: GetCharactersRequest): Promise<GetCharactersResponse> => {
    const response = await apiClient.get('/characters?' + URL_ENDING + '&offset=520');
    return response.data;
  };

export default getCharacters
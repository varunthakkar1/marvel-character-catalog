import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/posts'
})

export interface Character {
    userId: number,
    id: number,
    title: String
}

const getCharacters = async (): Promise<Character[]> => {
    const response = await apiClient.get('');
    return response.data as Array<Character>;
  };

export default getCharacters
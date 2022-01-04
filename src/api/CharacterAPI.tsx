import axios from 'axios';

interface Character {

}

const getCharacters = async (key: String, events: String[], comics: String[], series: String[]): Promise<Character[]> => {
    const res = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
    );
    return res.data;
  };

export default getCharacters
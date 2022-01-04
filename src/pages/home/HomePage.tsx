import React from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import getCharacters from '../../api/CharacterAPI';
import { GetCharactersResponse } from '../../api/CharacterAPI';

interface HomePageProps {
    
}

const HomePage: React.FC<HomePageProps> = () => {
    const { isFetched, data } = useQuery<GetCharactersResponse, Error>(['characters', {"comics": [1], "events": [1], "series": [1]}], () => getCharacters({"comics": [1], "events": [1], "series": [1]}))
    data && console.log(data.data.results)

    return (
        <div>
            Testing
            {data && data.data.results.map(item => console.log(item))}
        </div>
    );
};

export default HomePage;
import React from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import getCharacters from '../../api/CharacterAPI';
import { Character } from '../../api/CharacterAPI';
import { HASH } from '../../constants'

interface HomePageProps {
    
}

const HomePage: React.FC<HomePageProps> = () => {
    const { isSuccess, data }: UseQueryResult<Character[], Error> = useQuery<Character[], Error>('characters', getCharacters)
    isSuccess && console.log(data)    
    return (
        <div>
            Testing
        </div>
    );
};

export default HomePage;
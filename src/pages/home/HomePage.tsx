import React from 'react';
import { useQuery } from 'react-query';
import getCharacters from '../../api/CharacterAPI';
import { HASH } from '../../constants'

interface HomePageProps {
    
}

const HomePage: React.FC<HomePageProps> = () => {
    const { isError, isLoading, data, error} = useQuery(['characters', ["test"], [], []], () => getCharacters)
    
    if (!isError && !isLoading) {
        console.log(data)
    }
    return (
        <div>
            Testing
        </div>
    );
};

export default HomePage;
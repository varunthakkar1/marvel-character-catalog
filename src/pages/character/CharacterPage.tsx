import React from 'react';
import { useParams } from 'react-router-dom';

interface CharacterPageProps {
    
}

const CharacterPage: React.FC<CharacterPageProps> = () => {
    let { id } = useParams();

    return (
        <div>
            This should work {id}
        </div>
    );
};

export default CharacterPage;
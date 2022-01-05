import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import getCharacters from "../../api/CharacterAPI";
import { GetCharactersResponse } from "../../api/dto/getCharactersDto";
import { Character } from "../../models/character";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const { isFetched, data } = useQuery<GetCharactersResponse, Error>(
    ["characters", { comics: [1], events: [1], series: [1] }],
    () => getCharacters({ comics: [1], events: [1], series: [1], page: 1 })
  );

  return (
    <div>
      Testing
      {data &&
        data.data.results.map((char: Character) => (
          <div key={char.id}>{char.name}</div>
        ))}
    </div>
  );
};

export default HomePage;

import React from "react";
import styled from "styled-components";
import { Character } from "../models/character";

interface CharacterCardProps {
  character: Character;
}

const Container = styled.div`
  display: flex;
  width: 350px;
  margin: 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Thumbnail = styled.img`
  display: inline-block;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin: 24px 0px;
`;

const CharacterName = styled.div`
  display: flex;
  font-weight: bolder;
  font-weight: 20px;
  margin-bottom: 16px;
`;

const CharacterDescription = styled.div`
  display: flex;
  width: 250px;
  margin-bottom: 16px;
  font-size: 12.5px;
  text-align: center;
  font-weight: light;
`;

const StatsContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-evenly;
  margin-bottom: 30px;
`;

const Stat = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 0px 1px;
  font-size: 13px;
`;

const StatDivider = styled.div`
  width: 0.5px;
  height: 100%;
  background-color: black;
`;

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <Container>
      <Thumbnail
        src={character.thumbnail.path + "." + character.thumbnail.extension}
      />
      <CharacterName>{character.name}</CharacterName>
      {character.description && (
        <CharacterDescription>{character.description}</CharacterDescription>
      )}
      <StatsContainer>
        <Stat>
          {character.events.available} event
          {character.events.available !== 1 && "s"}
        </Stat>
        <StatDivider />
        <Stat>
          {character.comics.available} comic
          {character.comics.available !== 1 && "s"}
        </Stat>
        <StatDivider />
        <Stat>{character.series.available} series</Stat>
      </StatsContainer>
    </Container>
  );
};

export default CharacterCard;

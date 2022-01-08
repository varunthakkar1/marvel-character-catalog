import React from "react";
import styled from "styled-components";
import { Character } from "../models/character";

interface CharacterCardProps {
  character: Character;
}

const Container = styled.div`
  display: flex;
  width: 350px;
  margin-bottom: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Thumbnail = styled.img`
  display: flex;
  max-width: 60%;
  max-height: 200px;
`;

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <Container>
      {character.name}
      <Thumbnail
        src={character.thumbnail.path + "." + character.thumbnail.extension}
      />
    </Container>
  );
};

export default CharacterCard;

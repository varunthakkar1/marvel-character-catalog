import React, { useState } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { useQuery } from "react-query";
import styled from "styled-components";
import getCharacters from "../api/characterApi";
import { API_OUTPUT_LIMIT } from "../api/client";
import { GetCharactersResponse } from "../api/dto/getCharactersDto";
import CharacterCard from "../components/CharacterCard";
import FilterModal from "../components/FilterModal";
import { Character } from "../models/character";
import { Filter } from "../models/filter";

const PRIMARY_BREAKPOINT = "768px";

interface HomePageProps {}

const Container = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  padding: 10px 0px;
`;

const PageButton = styled.button`
  cursor: pointer;
  width: 12.5%;
  border: none;
  background-color: white;
`;

const OuterPageButton = styled(PageButton)`
  @media screen and (max-width: ${PRIMARY_BREAKPOINT}) {
    display: none;
  }
`;

const PageNumberText = styled.div`
  display: flex;
  width: 12.5%;
  font-size: 20px;
  justify-content: center;
  white-space: nowrap;

  @media screen and (max-width: ${PRIMARY_BREAKPOINT}) {
    font-size: 13px;
  }
`;

const AddFiltersButton = styled.button`
  display: flex;
  width: 15%;
  font-size: 17px;
  cursor: pointer;
  justify-content: center;
  border: rgba(111, 191, 241, 0.8) 3px solid;
  padding: 10px 10px;
  white-space: nowrap;
  background-color: white;
  color: rgba(111, 191, 241, 0.8);
  font-style: bolder;
  border-radius: 5px;

  @media screen and (max-width: ${PRIMARY_BREAKPOINT}) {
    width: 25%;
    padding: 5px 10px;
    font-size: 15px;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding: 20px 0px;
`;

const SearchBar = styled.input`
  display: flex;
  border: rgba(111, 191, 241, 0.8) 3px solid;
  width: 50%;
  border-radius: 5px;

  &:active {
    border: none;
  }
`;

const CharacterCardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const StatusMessage = styled.div`
  display: flex;
  font-size: 25px;
  font-weight: bolder;
  margin: 25px 0px;
`;

const HomePage: React.FC<HomePageProps> = () => {
  // filter states
  const [eventFilters, setEventFilters] = useState<Filter[]>([]);
  const [seriesFilters, setSeriesFilters] = useState<Filter[]>([]);
  const [comicFilters, setComicFilters] = useState<Filter[]>([]);
  const [nameStartsWith, setNamesStartsWith] = useState<string>("");

  // modal states
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  // page state
  const [page, setPage] = useState<number>(1);

  // character query
  const {
    isLoading,
    isError,
    data: characters,
  } = useQuery<GetCharactersResponse, Error>(
    [
      "characters",
      {
        comics: comicFilters,
        events: eventFilters,
        series: seriesFilters,
        nameStartsWith: nameStartsWith,
        page: page,
      },
    ],
    () =>
      getCharacters({
        comics: comicFilters,
        events: eventFilters,
        series: seriesFilters,
        nameStartsWith: nameStartsWith,
        page: page,
      })
  );

  // page logic
  const maxPage =
    characters && Math.ceil(characters.data.total / API_OUTPUT_LIMIT);
  const increasePage = (pageChange: number): void => {
    if (maxPage && page + pageChange <= maxPage) {
      setPage(page + pageChange);
    }
  };
  const decreasePage = (pageChange: number): void => {
    if (page - pageChange > 0) {
      setPage(page - pageChange);
    }
  };

  // saving filter logic
  const saveFilters = (
    eventFilters: Filter[],
    comicFilters: Filter[],
    seriesFilters: Filter[]
  ): void => {
    setEventFilters(eventFilters);
    setComicFilters(comicFilters);
    setSeriesFilters(seriesFilters);
  };

  return (
    <Container>
      <SearchBarContainer>
        <SearchBar
          placeholder="search for a character"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNamesStartsWith(e.target.value);
            setPage(1);
          }}
        />
        <AddFiltersButton onClick={() => setShowFilterModal(!showFilterModal)}>
          Add Filters
        </AddFiltersButton>
      </SearchBarContainer>
      <ButtonContainer>
        <OuterPageButton onClick={() => decreasePage(50)}>
          <MdOutlineArrowBackIos />
          <MdOutlineArrowBackIos />
          <MdOutlineArrowBackIos />
        </OuterPageButton>
        <PageButton onClick={() => decreasePage(10)}>
          <MdOutlineArrowBackIos />
          <MdOutlineArrowBackIos />
        </PageButton>
        <PageButton onClick={() => decreasePage(1)}>
          <MdOutlineArrowBackIos />
        </PageButton>
        <PageNumberText>Page {page}</PageNumberText>
        <PageButton onClick={() => increasePage(1)}>
          <MdOutlineArrowForwardIos />
        </PageButton>
        <PageButton onClick={() => increasePage(10)}>
          <MdOutlineArrowForwardIos />
          <MdOutlineArrowForwardIos />
        </PageButton>
        <OuterPageButton onClick={() => increasePage(50)}>
          <MdOutlineArrowForwardIos />
          <MdOutlineArrowForwardIos />
          <MdOutlineArrowForwardIos />
        </OuterPageButton>
      </ButtonContainer>
      <CharacterCardContainer>
        {characters &&
          characters.data.results
            .filter(
              (char: Character) =>
                char.events.available > 0 ||
                char.series.available > 0 ||
                char.comics.available > 0
            )
            .map((char: Character) => (
              <CharacterCard key={char.id} character={char}>
                {char.name}
              </CharacterCard>
            ))}
        {isLoading && <StatusMessage>Loading...</StatusMessage>}
        {isError && <StatusMessage>Error!</StatusMessage>}
      </CharacterCardContainer>
      {showFilterModal && (
        <ModalContainer>
          <FilterModal
            setFiltersFunction={saveFilters}
            initialSelectedComicFilters={comicFilters}
            initialSelectedEventFilters={eventFilters}
            initialSelectedSeriesFilters={seriesFilters}
            closeModalFunction={() => {
              setPage(1);
              setShowFilterModal(!showFilterModal);
            }}
          />
        </ModalContainer>
      )}
    </Container>
  );
};

export default HomePage;

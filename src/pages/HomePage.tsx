import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import getCharacters from "../api/CharacterAPI";
import { GetCharactersResponse } from "../api/dto/getCharactersDto";
import FilterModal from "../components/FilterModal";
import { Character } from "../models/character";
import { Filter } from "../models/filter";

interface HomePageProps {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const HomePage: React.FC<HomePageProps> = () => {
  // filter states
  const [eventFilters, setEventFilters] = useState<Filter[]>([]);
  const [seriesFilters, setSeriesFilters] = useState<Filter[]>([]);
  const [comicFilters, setComicFilters] = useState<Filter[]>([]);

  // modal states
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  // page state
  const [page, setPage] = useState<number>(1);

  // character query
  const { data: characters } = useQuery<GetCharactersResponse, Error>(
    [
      "characters",
      {
        comics: comicFilters,
        events: eventFilters,
        series: seriesFilters,
        page: page,
      },
    ],
    () =>
      getCharacters({
        comics: comicFilters,
        events: eventFilters,
        series: seriesFilters,
        page: page,
      })
  );

  // page logic
  const maxPage = characters && Math.ceil(characters.data.total / 20);
  const nextPage = (): void => {
    if (maxPage && page !== maxPage) {
      setPage(page + 1);
    }
  };
  const prevPage = (): void => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  // saving filter logic
  const saveEventFilters = (filters: Filter[]): void => {
    setEventFilters(filters);
  };
  const saveSeriesFilters = (filters: Filter[]): void => {
    setSeriesFilters(filters);
  };
  const saveComicFilters = (filters: Filter[]): void => {
    setComicFilters(filters);
  };

  return (
    <Container>
      <button onClick={() => prevPage()}>Previous Page</button>
      <button onClick={() => nextPage()}>Next Page</button>
      <button onClick={() => setShowFilterModal(!showFilterModal)}>
        Add Filters
      </button>
      {characters &&
        characters.data.results.map((char: Character) => (
          <div key={char.id}>{char.name}</div>
        ))}
      {showFilterModal && (
        <ModalContainer>
          <FilterModal
            setEventFiltersFunction={saveEventFilters}
            setSeriesFiltersFunction={saveSeriesFilters}
            setComicFiltersFunction={saveComicFilters}
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

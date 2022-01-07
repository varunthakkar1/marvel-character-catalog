import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import getCharacters from "../../api/CharacterAPI";
import { GetCharactersResponse } from "../../api/dto/getCharactersDto";
import { GetEventsResponse } from "../../api/dto/getEventsDto";
import getEvents from "../../api/EventsAPI";
import FilterModal from "../../components/FilterModal";
import { Character, ListItem } from "../../models/character";
import { Event } from "../../models/event";
import { Filter } from "../../models/filter";
import { FilterOption } from "../../models/filterOption";

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

const EventFilterModal = styled(FilterModal)`
  position: fixed;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HomePage: React.FC<HomePageProps> = () => {
  // filter states
  const [eventFilters, setEventFilters] = useState<Filter[]>([]);
  const [seriesFilters, setSeriesFilters] = useState<Filter[]>([]);
  const [comicFilters, setComicFilters] = useState<Filter[]>([]);

  // modal states
  const [showEventFilterModal, setShowEventFilterModal] =
    useState<boolean>(false);
  const [showComicFilterModal, setShowComicFilterModal] =
    useState<boolean>(false);
  const [showSeriesFilterModal, setShowSeriesFilterModal] =
    useState<boolean>(false);

  // page state
  const [page, setPage] = useState<number>(1);

  // character query
  const { isFetched, data: characters } = useQuery<
    GetCharactersResponse,
    Error
  >(
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
  const nextPage = () => {
    if (maxPage && page !== maxPage) {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
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
  const saveComicsFilters = (filters: Filter[]): void => {
    setComicFilters(filters);
  };

  console.log(eventFilters);
  console.log(seriesFilters);
  console.log(comicFilters);

  return (
    <Container>
      <button onClick={() => prevPage()}>Previous Page</button>
      <button onClick={() => nextPage()}>Next Page</button>
      <button onClick={() => setShowEventFilterModal(!showEventFilterModal)}>
        Open Event Filters
      </button>
      {characters &&
        characters.data.results.map((char: Character) => (
          <div key={char.id}>{char.name}</div>
        ))}
      {showEventFilterModal && (
        <ModalContainer>
          <FilterModal
            setFiltersFunction={saveEventFilters}
            filterOption={FilterOption.Events}
            initialSelectedFilters={eventFilters}
            closeModalFunction={() =>
              setShowEventFilterModal(!showEventFilterModal)
            }
          />
        </ModalContainer>
      )}
    </Container>
  );
};

export default HomePage;

import React, { useState } from "react";
import { useQuery } from "react-query";
import getCharacters from "../../api/CharacterAPI";
import { GetCharactersResponse } from "../../api/dto/getCharactersDto";
import { GetEventsResponse } from "../../api/dto/getEventsDto";
import getEvents from "../../api/EventsAPI";
import { Character, ListItem } from "../../models/character";
import { Event } from "../../models/event";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [eventFilters, setEventFilters] = useState<number[]>([]);
  const [seriesFilters, setSeriesFilters] = useState<number[]>([]);
  const [comicFilters, seComictFilters] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
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

  const { data: events } = useQuery<GetEventsResponse, Error>(
    ["events", 1],
    () => getEvents({ page: 2 })
  );

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

  return (
    <div>
      <button onClick={() => prevPage()}>Previous Page</button>
      <button onClick={() => nextPage()}>Next Page</button>
      {characters &&
        characters.data.results.map((char: Character) => (
          <div key={char.id}>{char.name}</div>
        ))}
      {events &&
        events.data.results.map((event: Event) => (
          <div key={event.id}>{event.title}</div>
        ))}
    </div>
  );
};

export default HomePage;

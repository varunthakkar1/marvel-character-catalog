import React from "react";
import { useQuery } from "react-query";
import getCharacters from "../../api/CharacterAPI";
import { GetCharactersResponse } from "../../api/dto/getCharactersDto";
import { GetEventsResponse } from "../../api/dto/getEventsDto";
import getEvents from "../../api/EventsAPI";
import { Character, ListItem } from "../../models/character";
import { Event } from "../../models/event"

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const { isFetched, data: characters } = useQuery<
    GetCharactersResponse,
    Error
  >(["characters", { comics: [1], events: [1], series: [1] }], () =>
    getCharacters({ comics: [1], events: [1], series: [1], page: 1 })
  );

  const { data: events } = useQuery<GetEventsResponse, Error>(["events", 1], () => getEvents({ page: 1 }));
  events && console.log(events)

  return (
    <div>
      Testing
      {characters &&
        characters.data.results.map((char: Character) => (
          <div key={char.id}>
              {char.name}
          </div>
        ))}
        {
            events &&
            events.data.results.map((event: Event) => (
                <div key={event.id}>
                    {event.title}
                </div>
            ))
        }
    </div>
  );
};

export default HomePage;

import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { GetEventsResponse } from "../api/dto/getEventsDto";
import getEvents from "../api/EventsAPI";
import { Filter } from "../models/filter";
import { Event } from "../models/event";

interface FilterModalProps {
  closeModalFunction: () => void;
  addFilterFunction: (filterData: Filter) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  padding: 15px;
`;

const FilterModal: React.FC<FilterModalProps> = ({ closeModalFunction, addFilterFunction }) => {
  const [page, setPage] = useState<number>(1);
  const { data: events } = useQuery<GetEventsResponse, Error>(
    ["events", page],
    () => getEvents({ page: page })
  );

  // page logic
  const maxPage = events && Math.ceil(events.data.total / 20);
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
    <Container>
      <button onClick={() => prevPage()}>Previous Page</button>
      <button onClick={() => nextPage()}>Next Page</button>
      <button onClick={closeModalFunction}>Close Modal</button>
      {events &&
        events.data.results.map((event: Event) => (
          <div key={event.id}>{event.title}</div>
        ))}
    </Container>
  );
};

export default FilterModal;

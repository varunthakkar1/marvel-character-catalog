import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { GetEventsResponse } from "../api/dto/getEventsDto";
import getEvents from "../api/EventsAPI";
import { Filter } from "../models/filter";
import { Event } from "../models/event";
import FilterOption from "./FilterOption";

interface FilterModalProps {
  closeModalFunction: () => void;
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

const EventFilterModal: React.FC<FilterModalProps> = ({
  closeModalFunction,
}) => {
  const [page, setPage] = useState<number>(1);
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
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

  // adding filter logic
  const addFilter = (filterToAdd: Filter) => {
    setSelectedFilters(selectedFilters.concat(filterToAdd));
  };
  const removeFilter = (filterToRemove: Filter) => {
    setSelectedFilters(
      selectedFilters.filter((filter) => filter.id !== filterToRemove.id)
    );
  };

  console.log(selectedFilters);

  return (
    <Container>
      <button onClick={() => prevPage()}>Previous Page</button>
      <button onClick={() => nextPage()}>Next Page</button>
      <button onClick={closeModalFunction}>Close Modal</button>
      {events &&
        events.data.results.map((event: Event) => (
          <FilterOption
            filter={{ id: event.id, name: event.title }}
            addFilterFunction={addFilter}
            removeFilterFunction={removeFilter}
            key={event.id}
          />
        ))}
    </Container>
  );
};

export default EventFilterModal;

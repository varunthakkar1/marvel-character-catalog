import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { GetEventsResponse } from "../api/dto/getEventsDto";
import getEvents from "../api/EventsAPI";
import { Filter } from "../models/filter";
import { Event } from "../models/event";
import { FilterOption } from "../models/filterOption";
import FilterListItem from "./FilterListItem";

interface FilterModalProps {
  closeModalFunction: () => void;
  initialSelectedFilters: Filter[];
  filterOption: FilterOption;
  setFiltersFunction: (filters: Filter[]) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  padding: 15px;
`;

const FilterModal: React.FC<FilterModalProps> = ({
  closeModalFunction,
  filterOption,
  initialSelectedFilters,
  setFiltersFunction,
}) => {
  const [page, setPage] = useState<number>(1);
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>(
    initialSelectedFilters
  );
  const { data: events } = useQuery<GetEventsResponse, Error>(
    ["events", page],
    () => getEvents({ page: page })
  );

  // filter 'selected' prop logic helper
  const isFilterSelected = (id: number): boolean => {
    let result = false;
    selectedFilters.map((filter: Filter) => {
      if (filter.id === id) {
        result = true;
      }
    });
    return result;
  };

  // page logic
  const maxPage = events && Math.ceil(events.data.total / 20);
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

  // adding filter logic
  const addFilter = (filterToAdd: Filter): void => {
    setSelectedFilters(selectedFilters.concat(filterToAdd));
  };
  const removeFilter = (filterToRemove: Filter): void => {
    setSelectedFilters(
      selectedFilters.filter((filter) => filter.id !== filterToRemove.id)
    );
  };

  return (
    <Container>
      <button onClick={() => prevPage()}>Previous Page</button>
      <button onClick={() => nextPage()}>Next Page</button>
      <button onClick={closeModalFunction}>Close Modal</button>
      {events &&
        events.data.results.map((event: Event) => (
          <FilterListItem
            initialIsSelected={isFilterSelected(event.id)}
            filter={{ id: event.id, name: event.title }}
            addFilterFunction={addFilter}
            removeFilterFunction={removeFilter}
            key={event.id}
          />
        ))}
      <button onClick={() => setFiltersFunction(selectedFilters)}>
        Save filters
      </button>
    </Container>
  );
};

export default FilterModal;

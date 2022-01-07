import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { GetEventsResponse } from "../api/dto/getEventsDto";
import getEvents from "../api/EventAPI";
import getComics from "../api/ComicAPI";
import { Filter } from "../models/filter";
import { Event } from "../models/event";
import { FilterOption } from "../models/filterOption";
import FilterListItem from "./FilterListItem";
import { GetComicsResponse } from "../api/dto/getComicsDto";
import { Comic } from "../models/comic";
import { GetSeriesResponse } from "../api/dto/getSeriesDto";
import getSeries from "../api/SeriesAPI";
import { Series } from "../models/series";

interface FilterModalProps {
  closeModalFunction: () => void;
  initialSelectedEventFilters: Filter[];
  initialSelectedComicFilters: Filter[];
  initialSelectedSeriesFilters: Filter[];
  setEventFiltersFunction: (filters: Filter[]) => void;
  setSeriesFiltersFunction: (filters: Filter[]) => void;
  setComicFiltersFunction: (filters: Filter[]) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  padding: 15px;
`;

const FilterLabel = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
`;

const FilterLabelContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const FilterModal: React.FC<FilterModalProps> = ({
  closeModalFunction,
  initialSelectedEventFilters,
  initialSelectedSeriesFilters,
  initialSelectedComicFilters,
  setEventFiltersFunction,
  setSeriesFiltersFunction,
  setComicFiltersFunction,
}) => {
  // states
  const [page, setPage] = useState<number>(1);
  const [currentOption, setCurrentOption] = useState<FilterOption>(
    FilterOption.Comics
  );

  // filter states
  const [selectedEventFilters, setSelectedEventFilters] = useState<Filter[]>(
    initialSelectedEventFilters
  );
  const [selectedSeriesFilters, setSelectedSeriesFilters] = useState<Filter[]>(
    initialSelectedSeriesFilters
  );
  const [selectedComicFilters, setSelectedComicFilters] = useState<Filter[]>(
    initialSelectedComicFilters
  );

  // queries
  const { data: events } = useQuery<GetEventsResponse, Error>(
    ["events", page],
    () => getEvents({ page: page })
  );
  const { data: comics } = useQuery<GetComicsResponse, Error>(
    ["comics", page],
    () => getComics({ page: page })
  );
  const { data: series } = useQuery<GetSeriesResponse, Error>(
    ["series", page],
    () => getSeries({ page: page })
  );

  // filter 'selected' prop logic helper
  const isFilterSelected = (id: number): boolean => {
    let result = false;
    let currentSelectedFilters = selectedEventFilters;
    switch (currentOption) {
      case FilterOption.Events: {
        currentSelectedFilters = selectedEventFilters;
        break;
      }
      case FilterOption.Comics: {
        currentSelectedFilters = selectedComicFilters;
        break;
      }
      case FilterOption.Series: {
        currentSelectedFilters = selectedSeriesFilters;
        break;
      }
    }
    currentSelectedFilters.map((filter: Filter) => {
      if (filter.id === id) {
        result = true;
      }
    });
    return result;
  };

  // page logic
  const nextPage = (): void => {
    let maxPage;
    switch (currentOption) {
      case FilterOption.Events:
        maxPage = events && Math.ceil(events.data.total / 20);
        break;
      case FilterOption.Comics:
        maxPage = comics && Math.ceil(comics.data.total / 20);
        break;
      case FilterOption.Series:
        maxPage = series && Math.ceil(series.data.total / 20);
        break;
    }
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
    switch (currentOption) {
      case FilterOption.Events: {
        setSelectedEventFilters(selectedEventFilters.concat(filterToAdd));
        break;
      }
      case FilterOption.Comics: {
        setSelectedComicFilters(selectedComicFilters.concat(filterToAdd));
        break;
      }
      case FilterOption.Series: {
        setSelectedSeriesFilters(selectedSeriesFilters.concat(filterToAdd));
        break;
      }
    }
  };
  const removeFilter = (filterToRemove: Filter): void => {
    switch (currentOption) {
      case FilterOption.Events: {
        setSelectedEventFilters(
          selectedEventFilters.filter(
            (filter) => filter.id !== filterToRemove.id
          )
        );
        break;
      }
      case FilterOption.Comics: {
        setSelectedComicFilters(
          selectedComicFilters.filter(
            (filter) => filter.id !== filterToRemove.id
          )
        );
        break;
      }
      case FilterOption.Series: {
        setSelectedSeriesFilters(
          selectedSeriesFilters.filter(
            (filter) => filter.id !== filterToRemove.id
          )
        );
        break;
      }
    }
  };

  // rendering filters in modal content
  const renderListContent = (): JSX.Element[] | undefined => {
    let output;
    switch (currentOption) {
      case FilterOption.Events: {
        output =
          events &&
          events.data.results.map((event: Event) => (
            <FilterListItem
              initialIsSelected={isFilterSelected(event.id)}
              filter={{ id: event.id, name: event.title }}
              addFilterFunction={addFilter}
              removeFilterFunction={removeFilter}
              key={event.id}
            />
          ));
        break;
      }
      case FilterOption.Comics: {
        output =
          comics &&
          comics.data.results.map((comic: Comic) => (
            <FilterListItem
              initialIsSelected={isFilterSelected(comic.id)}
              filter={{ id: comic.id, name: comic.title }}
              addFilterFunction={addFilter}
              removeFilterFunction={removeFilter}
              key={comic.id}
            />
          ));
          break;
      }
      case FilterOption.Series: {
        output =
          series &&
          series.data.results.map((series: Series) => (
            <FilterListItem
              initialIsSelected={isFilterSelected(series.id)}
              filter={{ id: series.id, name: series.title }}
              addFilterFunction={addFilter}
              removeFilterFunction={removeFilter}
              key={series.id}
            />
          ));
      }
    }
    return output;
  };

  const saveFilters = (): void => {
    switch (currentOption) {
      case FilterOption.Events:
        setEventFiltersFunction(selectedEventFilters);
        break;
      case FilterOption.Comics:
        setComicFiltersFunction(selectedComicFilters);
        break;
      case FilterOption.Series:
        setSeriesFiltersFunction(selectedSeriesFilters);
        break;
    }
  };

  return (
    <Container>
      <FilterLabelContainer>
        <FilterLabel
          onClick={() => {
            setPage(1);
            setCurrentOption(FilterOption.Events);
          }}
        >
          Events
        </FilterLabel>
        <FilterLabel
          onClick={() => {
            setPage(1);
            setCurrentOption(FilterOption.Comics);
          }}
        >
          Comics
        </FilterLabel>
        <FilterLabel
          onClick={() => {
            setPage(1);
            setCurrentOption(FilterOption.Series);
          }}
        >
          Series
        </FilterLabel>
      </FilterLabelContainer>
      <button onClick={() => prevPage()}>Previous Page</button>
      <button onClick={() => nextPage()}>Next Page</button>
      <button onClick={closeModalFunction}>Close Modal</button>
      {renderListContent()}
      <button onClick={saveFilters}>Save filters</button>
    </Container>
  );
};

export default FilterModal;

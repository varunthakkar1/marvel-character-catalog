import React, { useState } from "react";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import { GetEventsResponse } from "../api/dto/getEventsDto";
import getEvents from "../api/eventApi";
import getComics from "../api/comicApi";
import { Filter } from "../models/filter";
import { Event } from "../models/event";
import { FilterOption } from "../models/filterOption";
import FilterListItem from "./FilterListItem";
import { GetComicsResponse } from "../api/dto/getComicsDto";
import { Comic } from "../models/comic";
import { GetSeriesResponse } from "../api/dto/getSeriesDto";
import getSeries from "../api/seriesApi";
import { Series } from "../models/series";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

interface FilterModalProps {
  closeModalFunction: () => void;
  initialSelectedEventFilters: Filter[];
  initialSelectedComicFilters: Filter[];
  initialSelectedSeriesFilters: Filter[];
  setFiltersFunction: (
    eventFilters: Filter[],
    comicFilters: Filter[],
    seriesFilter: Filter[]
  ) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 348px;
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  overflow: hidden;
`;

const FilterLabel = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34%;
  padding: 10px 0px;
  border: none;
  font-weight: bold;
  color: whitesmoke;
  font-size: 12px;
  cursor: pointer;
`;

const FilterLabelContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const PageNumberText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const PageChangeButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 10px 0px;
`;

const PageChangeButton = styled.button<{ size: string }>`
  display: flex;
  width: ${(props) => (props.size === "large" ? "33.34%" : "12.5%")};
  border: none;
  background-color: white;
  color: black;
  padding: 10px 0xp;
  margin-bottom: 5px;
  margin-top: 10px;
  font-weight: bold;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;

const StatusMessage = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 20px;
  margin: 25px 0px;
`;

const FilterModal: React.FC<FilterModalProps> = ({
  closeModalFunction,
  initialSelectedEventFilters,
  initialSelectedSeriesFilters,
  initialSelectedComicFilters,
  setFiltersFunction,
}) => {
  // states
  const [page, setPage] = useState<number>(1);
  const [currentOption, setCurrentOption] = useState<FilterOption>(
    FilterOption.Events
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
  const { data: events, isLoading: eventsLoading } = useQuery<GetEventsResponse, Error>(
    ["events", page],
    () => getEvents({ page: page })
  );
  const { data: comics, isLoading: comicsLoading } = useQuery<GetComicsResponse, Error>(
    ["comics", page],
    () => getComics({ page: page })
  );
  const { data: series, isLoading: seriesLoading } = useQuery<GetSeriesResponse, Error>(
    ["series", page],
    () => getSeries({ page: page })
  );

  // filter "selected" prop logic helper
  const isFilterSelected = (id: number): boolean => {
    let result: boolean = false;
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
  const increasePage = (pageChange: number): void => {
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
    if (maxPage && pageChange + page <= maxPage) {
      setPage(page + pageChange);
    }
  };
  const decreasePage = (pageChange: number): void => {
    if (page - pageChange >= 1) {
      setPage(page - pageChange);
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

  const saveFilters = (): void => {
    setFiltersFunction(
      selectedEventFilters,
      selectedComicFilters,
      selectedSeriesFilters
    );
  };

  const closeModal = (): void => {
    saveFilters();
    closeModalFunction();
  };

  // filter label button styling
  const EventsLabel = styled(FilterLabel)`
    background-color: ${(props) =>
      currentOption === FilterOption.Events
        ? css`rgba(149, 125, 173, 0.6)`
        : css`rgba(0, 0, 0, 0.4)`};
  `;
  const ComicsLabel = styled(FilterLabel)`
    background-color: ${(props) =>
      currentOption === FilterOption.Comics
        ? css`rgba(210, 145, 188, 0.6)`
        : css`rgba(0, 0, 0, 0.4)`};
  `;
  const SeriesLabel = styled(FilterLabel)`
    background-color: ${(props) =>
      currentOption === FilterOption.Series
        ? css`rgba(255, 85, 80, 0.6)`
        : css`rgba(0, 0, 0, 0.4)`};
  `;

  // other button styling
  const ApplyButton = styled.button`
    color: whitesmoke;
    cursor: pointer;
    font-weight: bold;
    border: none;
    padding: 10px 0px;
    background-color: ${(props) =>
      currentOption === FilterOption.Series
        ? css`rgba(255, 85, 80, 0.6)`
        : currentOption === FilterOption.Events
        ? css`rgba(149, 125, 173, 0.6)`
        : css`rgba(210, 145, 188, 0.6)`};
  `;

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

  // page control button rendering
  const renderPageControlButtons = (): JSX.Element | undefined => {
    const largeLeftArrow: JSX.Element = <MdOutlineArrowBackIos size="25px" />;
    const smallLeftArrow: JSX.Element = <MdOutlineArrowBackIos size="10px" />;
    const largeRightArrow: JSX.Element = (
      <MdOutlineArrowForwardIos size="25px" />
    );
    const smallRightArrow: JSX.Element = (
      <MdOutlineArrowForwardIos size="10px" />
    );

    switch (currentOption) {
      case FilterOption.Events:
        return (
          <PageChangeButtonContainer>
            <PageChangeButton size="large" onClick={() => decreasePage(1)}>
              {largeLeftArrow}
            </PageChangeButton>
            <PageNumberText>Page {page}</PageNumberText>
            <PageChangeButton size="large" onClick={() => increasePage(1)}>
              {largeRightArrow}
            </PageChangeButton>
          </PageChangeButtonContainer>
        );
      case FilterOption.Series:
      case FilterOption.Comics:
        return (
          <PageChangeButtonContainer>
            <PageChangeButton size="small" onClick={() => decreasePage(50)}>
              {smallLeftArrow}
              {smallLeftArrow}
              {smallLeftArrow}
            </PageChangeButton>
            <PageChangeButton size="small" onClick={() => decreasePage(10)}>
              {smallLeftArrow}
              {smallLeftArrow}
            </PageChangeButton>
            <PageChangeButton size="small" onClick={() => decreasePage(1)}>
              {smallLeftArrow}
            </PageChangeButton>
            <PageNumberText>Page {page}</PageNumberText>
            <PageChangeButton size="small" onClick={() => increasePage(1)}>
              {smallRightArrow}
            </PageChangeButton>
            <PageChangeButton size="small" onClick={() => increasePage(10)}>
              {smallRightArrow}
              {smallRightArrow}
            </PageChangeButton>
            <PageChangeButton size="small" onClick={() => increasePage(50)}>
              {smallRightArrow}
              {smallRightArrow}
              {smallRightArrow}
            </PageChangeButton>
          </PageChangeButtonContainer>
        );
    }
  };

  return (
    <Container>
      <FilterLabelContainer>
        <EventsLabel
          onClick={() => {
            setPage(1);
            setCurrentOption(FilterOption.Events);
          }}
        >
          Events
        </EventsLabel>
        <ComicsLabel
          onClick={() => {
            setPage(1);
            setCurrentOption(FilterOption.Comics);
          }}
        >
          Comics
        </ComicsLabel>
        <SeriesLabel
          onClick={() => {
            setPage(1);
            setCurrentOption(FilterOption.Series);
          }}
        >
          Series
        </SeriesLabel>
      </FilterLabelContainer>
      {(seriesLoading || eventsLoading || comicsLoading) ? <StatusMessage>Loading...</StatusMessage> : renderListContent()}
      {renderPageControlButtons()}
      <ApplyButton onClick={closeModal}>Apply</ApplyButton>
    </Container>
  );
};

export default FilterModal;

import React, { useState } from "react";
import { Filter } from "../models/filter";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";

interface FilterOptionProps {
  initialIsSelected: boolean;
  addFilterFunction: (filter: Filter) => void;
  removeFilterFunction: (filter: Filter) => void;
  filter: Filter;
}

const Container = styled.div<{ selected: boolean }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 5px;
  transition: transform 0.3s ease-out;
  background: ${(props) => (props.selected ? "#f54278" : "#42f572")};
`;

const TextContainer = styled.div`
  display: flex;
  font-size: 10px;
`;

const IconWrapper = styled(AiOutlinePlus)<{ selected: boolean }>`
  padding: 0;
  transition: transform 0.3s ease-out;
  transform: ${(props) => (props.selected ? `rotate(45deg)` : "")};
`;

const FilterListItem: React.FC<FilterOptionProps> = ({
  initialIsSelected,
  addFilterFunction,
  removeFilterFunction,
  filter,
}) => {
  const [selected, setSelected] = useState<boolean>(initialIsSelected);

  // filter selection logic
  const addFilter = () => {
    setSelected(true);
    addFilterFunction(filter);
  };
  const removeFilter = () => {
    setSelected(false);
    removeFilterFunction(filter);
  };
  return (
    <Container selected={selected}>
      <TextContainer>{filter.name}</TextContainer>
      <IconWrapper
        selected={selected}
        onClick={selected ? removeFilter : addFilter}
      />
    </Container>
  );
};

export default FilterListItem;

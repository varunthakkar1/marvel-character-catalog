import React, { useState } from "react";
import { Filter } from "../models/filter";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";

interface FilterOptionProps {
  addFilterFunction: (filter: Filter) => void;
  removeFilterFunction: (filter: Filter) => void;
  filter: Filter;
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const IconWrapper = styled(AiOutlinePlus)<{ checked: boolean }>`
  padding: 0;
  transition: transform 0.3s ease-out;
  transform: ${(props) => (props.checked ? `rotate(45deg)` : "")};
`;

const FilterOption: React.FC<FilterOptionProps> = ({
  addFilterFunction,
  removeFilterFunction,
  filter,
}) => {
  const [selected, setSelected] = useState<boolean>(false);

  const addFilter = () => {
    setSelected(true);
    addFilterFunction(filter);
  };

  const removeFilter = () => {
    setSelected(false);
    removeFilterFunction(filter);
  };
  return (
    <Container>
      {filter.name}
      <IconWrapper
        checked={selected}
        onClick={selected ? removeFilter : addFilter}
      />
    </Container>
  );
};

export default FilterOption;

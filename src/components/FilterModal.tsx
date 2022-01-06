import React from "react";
import styled from "styled-components";
import { Filter } from "../models/filter";

interface FilterModalProps {
  addFilterFunction: (filterData: Filter[]) => void;
}

const Container = styled.div`
  display: flex;
  width: 450px;
  background: white;
  border: black;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FilterModal: React.FC<FilterModalProps> = ({ addFilterFunction }) => {
  return <Container>Testing</Container>;
};

export default FilterModal;

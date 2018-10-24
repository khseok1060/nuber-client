import React from "react";
import { getRide } from "src/types/api";
import styled from "../../typed-components";

const Container = styled.div``;

interface IProps {
  data?: getRide;
}

const RidePresenter: React.SFC<IProps> = () => <Container>Ride</Container>;

export default RidePresenter;

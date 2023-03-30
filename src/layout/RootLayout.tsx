import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const RootLayout = () => {
  return (
    <RootLayoutContainer>
      <Main>
        <Outlet />
      </Main>
    </RootLayoutContainer>
  );
};

const RootLayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
const Main = styled.main``;

export default RootLayout;

import React from 'react';
import styled from 'styled-components';
import { RedberryLogo } from '../assets/images';

const HomeHeader = () => {
  return (
    <Container>
      <Logo src={RedberryLogo} alt='logo' />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;

  &::after {
    content: '';
    width: 100%;
    /* height: 1px; */
    border: 1px solid #1a1a1a;
    /* opacity: 0.5; */
  }
`;

const Logo = styled.img``;
export default HomeHeader;

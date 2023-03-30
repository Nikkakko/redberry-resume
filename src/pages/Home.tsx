import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MaingBg, MainBgLogo } from '../assets/images';
import { HomeHeader } from '../components';

const Home = () => {
  return (
    <Container>
      <HomeHeader />
      <Wrapper>
        <Link to='/resume'>
          <Button>რეზიუმეს დამატება</Button>
        </Link>
        <Logo src={MainBgLogo} alt='logo' />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background-image: url(${MaingBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;

  //disable scroll
  overflow: hidden;
  padding: 25px 70px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Logo = styled.img`
  position: absolute;
  width: 299px;
  height: 299px;
  left: 1076px;
  top: 423px;
  z-index: -1;
`;

const Button = styled.button`
  padding: 18px 126px;
  background: #1a1a1a;
  border-radius: 8px;
  border: none;

  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;

  color: #ffffff;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;

  cursor: pointer;

  &:hover {
    background: #000000;

    transition: 0.3s;
  }
`;

export default Home;

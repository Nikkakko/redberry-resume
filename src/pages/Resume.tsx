import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { LeftArrow } from '../assets/images';
import { InfoCard, DisplayCard } from '../components';
import { clearResume, setFinished } from '../features/resumeSlice';

const Resume = () => {
  const { isFinished } = useAppSelector(state => state.resume);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
    dispatch(clearResume());

    // clear redux store

    // clear local storage
    localStorage.clear();
  };

  useEffect(() => {
    // set timout to close modal after 3 seconds
    if (isFinished) {
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    }
  }, [isFinished]);
  return (
    <Container isFinished={isFinished}>
      {!isFinished && <InfoCard />}

      <DisplayCard />

      {
        // if isFinished is true then show modal
        isFinished && (
          <>
            {isModalOpen && (
              <ModalContainer>
                <p>რეზიუმე წარამტებით გაიგზავნა</p>
              </ModalContainer>
            )}
            <Arrow onClick={handleNavigate}>
              <img src={LeftArrow} alt='arrow' />
            </Arrow>
          </>
        )
      }
    </Container>
  );
};

const Container = styled.div<{
  isFinished: boolean;
}>`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: ${props => (props.isFinished ? 'center' : 'none')};
  align-items: ${props => (props.isFinished ? 'center' : 'none')};
`;

const ModalContainer = styled.div`
  position: absolute;
  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-shadow: 0px 4px 28px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  right: 70px;
  top: 53px;

  padding: 40px 30px;

  //transition to appear from top to bottom

  animation: appear 0.5s ease-in-out;

  @keyframes appear {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const Arrow = styled.div`
  position: absolute;
  left: 70px;
  top: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  cursor: pointer;
  width: 40px;
  height: 40px;
  box-shadow: 0px 4px 28px rgba(0, 0, 0, 0.25);
  background: #f9f9f9;
`;

export default Resume;

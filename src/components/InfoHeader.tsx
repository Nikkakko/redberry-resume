import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LeftArrow } from '../assets/images';

type Props = {
  title: string;
  currentStep: number;
  totalSteps: number;
  prevStep?: () => void;
};

const InfoHeader = ({ title, currentStep, totalSteps, prevStep }: Props) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (currentStep === 0) {
      navigate('/');
    } else {
      prevStep && prevStep();
    }
  };
  return (
    <Container>
      <Button type='button' onClick={handleBack}>
        <Arrow src={LeftArrow} />
      </Button>

      <Info>
        <Content>
          <h1>{title}</h1>
          <p>
            {' '}
            {currentStep + 1} / {totalSteps}
          </p>
        </Content>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  margin-left: 61px;
  flex-direction: column;

  h1 {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;

    /* off black */

    color: #1a1a1a;
  }

  p {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    /* identical to box height */

    text-align: right;

    /* off black */

    color: #1a1a1a;
  }

  &::after {
    content: '';
    width: 100%;
    margin-top: 12px;
    height: 1px;
    background: #1a1a1a;
    display: block;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Button = styled.button`
  background: #ffffff;
  border: none;
  border-radius: 50%;
  padding: 12px 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  cursor: pointer;
`;

const Arrow = styled.img``;

export default InfoHeader;

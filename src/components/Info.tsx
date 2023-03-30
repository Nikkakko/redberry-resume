import React from 'react';
import styled from 'styled-components';
import { useMultistepForm } from '../hooks/useMultiStepForm';
import InfoHeader from './InfoHeader';
import { Personal, Education, Experience } from './steps';

const Info = () => {
  const handleNextStep = () => {
    nextStep();
  };

  const handlePreviousStep = () => {
    previousStep();
  };

  const { step, currentStepIndex, steps, previousStep, nextStep } =
    useMultistepForm([
      <Personal
        // pass nextStep as a prop to the component
        goToNextStep={handleNextStep}
      />,
      <Experience
        goToPrevStep={handlePreviousStep}
        goToNextStep={handleNextStep}
      />,
      <Education
        title='განათლება'
        goToPrevStep={handlePreviousStep}
        goToNextStep={handleNextStep}
      />,
    ]);

  return (
    <Container>
      {currentStepIndex === 0 ? (
        <InfoHeader
          title='პირადი ინფო'
          currentStep={currentStepIndex}
          totalSteps={steps.length}
          prevStep={previousStep}
        />
      ) : currentStepIndex === 1 ? (
        <InfoHeader
          title='გამოცდილება'
          currentStep={currentStepIndex}
          totalSteps={steps.length}
          prevStep={previousStep}
        />
      ) : (
        <InfoHeader
          title='განათლება'
          currentStep={currentStepIndex}
          totalSteps={steps.length}
          prevStep={previousStep}
        />
      )}
      <Wrapper>{step}</Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 47px 150px 65px 48px;
  flex: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 77px;
  margin-left: 99px;
`;

export default Info;

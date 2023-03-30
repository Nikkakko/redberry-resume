import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addExperienceInfo } from '../../features/resumeSlice';
import ExpForm from '../form/expForm';

import StepButton from './StepButton';

type PersonalInfoProps = {
  goToNextStep: () => void;
  goToPrevStep: () => void;
};

type Inputs = {
  თანამდებობა: string;
  კომპანია: string;
  დაწყების_თარიღი: string;
  დამთავრების_თარიღი: string;
  აღწერა: string;
};

const ExperienceInfo = ({ goToNextStep, goToPrevStep }: PersonalInfoProps) => {
  const dispatch = useAppDispatch();
  const childRef = useRef<
    React.MutableRefObject<typeof ExpForm | null> | null | any
  >(null);

  const [formComponent, setFormComponent] = React.useState<JSX.Element[]>([
    <ExpForm key={0} index={0} ref={childRef} goToNextStep={goToNextStep} />,
  ]);

  const AddExperience = () => {
    // on click add experience form to the list
    setFormComponent([
      ...formComponent,
      <ExpForm
        key={formComponent.length}
        index={formComponent.length}
        ref={childRef}
        goToNextStep={goToNextStep}
      />,
    ]);

    // add new experience to the list
    dispatch(addExperienceInfo());
  };

  function handleSubmit() {
    childRef.current.onSubmit();
  }

  return (
    <Container>
      {formComponent}
      <Addexp>
        <AddExperienceButton
          type='button'
          onClick={AddExperience} // to add more experience
        >
          მეტი გამოცდილების დამატება
        </AddExperienceButton>
      </Addexp>

      <Buttons>
        <StepButton
          title='უკან'
          onClick={goToPrevStep} // to go to previous step
        />

        <StepButton
          title='შემდეგი'
          onClick={handleSubmit} // to go to next step
        />
      </Buttons>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 0 65px 0;
`;

const Addexp = styled.div`
  margin-top: 45px;
`;

const AddExperienceButton = styled.button`
  padding: 14px 21px;
  background: #62a1eb;
  border-radius: 4px;
  border: none;
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;

  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-top: 128px;
`;

export default ExperienceInfo;

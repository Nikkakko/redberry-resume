import React, { useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../app/hooks';
import { addEducationInfo, setFinished } from '../../features/resumeSlice';
import EduForm from '../form/eduForm';
import StepButton from './StepButton';

type EducationInfoProps = {
  title: string;
  goToPrevStep: () => void;
  goToNextStep: () => void;
};

const EducationInfo = ({
  title,
  goToPrevStep,
  goToNextStep,
}: EducationInfoProps) => {
  const dispatch = useAppDispatch();
  const childRef = useRef<
    React.MutableRefObject<typeof EduForm | null> | null | any
  >(null);
  const [educationForm, setEducationForm] = React.useState<JSX.Element[]>([
    <EduForm key={0} index={0} ref={childRef} goToNextStep={goToNextStep} />,
  ]);

  const AddEducation = () => {
    // on click add education form to the list
    setEducationForm([
      ...educationForm,
      <EduForm
        key={educationForm.length}
        index={educationForm.length}
        ref={childRef}
        goToNextStep={goToNextStep}
      />,
    ]);

    // add new education to the list
    dispatch(addEducationInfo());
  };

  function handleSubmit() {
    dispatch(setFinished(true));
  }
  return (
    <Container>
      {educationForm}
      <Addexp>
        <AddExperienceButton type='button' onClick={AddEducation}>
          სხვა სასწავლებლის დამატება
        </AddExperienceButton>
      </Addexp>

      <Buttons>
        <StepButton title='უკან' onClick={goToPrevStep} />

        <StepButton title='შემდეგი' onClick={handleSubmit} />
      </Buttons>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
export default EducationInfo;

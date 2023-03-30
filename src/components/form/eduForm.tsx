import React, { useEffect, useImperativeHandle } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addEducationInfo, setEducationInfo } from '../../features/resumeSlice';
import InputeField from '../InputeField';
import { ArrowDown } from '../../assets/images';

type Props = {
  index: number;
  goToNextStep: () => void;
};

type InputProps = {
  სასწავლებელი: string;
  ხარისხი: string;
  დამთავრების_თარიღი: string;
  აღწერა: string;
};

const EduForm = ({ index, goToNextStep }: Props, ref: any) => {
  const dispatch = useAppDispatch();
  const { educationInfoList } = useAppSelector(state => state.resume);
  const {
    register,
    handleSubmit,
    watch,
    control,

    formState: { errors },
  } = useForm({
    defaultValues: {
      სასწავლებელი: educationInfoList[index].სასწავლებელი,
      ხარისხი: educationInfoList[index].ხარისხი,
      დამთავრების_თარიღი: educationInfoList[index].დამთავრების_თარიღი,
      აღწერა: educationInfoList[index].აღწერა,
    },
  });

  const options = [
    { value: 'საშუალო სკოლის დიპლომი', label: 'საშუალო სკოლის დიპლომი' },
    {
      value: 'ზოგადსაგანმანათლებლო დიპლომი',
      label: 'ზოგადსაგანმანათლებლო დიპლომი',
    },
    { value: 'ბაკალავრი', label: 'ბაკალავრი' },
    { value: 'მაგისტრი', label: 'მაგისტრი' },
    { value: 'დოქტორი', label: 'დოქტორი' },
    { value: 'ასოცირებული ხარისხი', label: 'ასოცირებული ხარისხი' },
    { value: 'სტუდენტი', label: 'სტუდენტი' },
    { value: 'კოლეჯი (ხარისხის გარეშე)', label: 'კოლეჯი (ხარისხის გარეშე)' },
    { value: 'სხვა', label: 'სხვა' },
  ];

  const data = {
    id: index,
    სასწავლებელი: watch('სასწავლებელი'),
    ხარისხი: watch('ხარისხი'),
    დამთავრების_თარიღი: watch('დამთავრების_თარიღი'),
    აღწერა: watch('აღწერა'),
  };

  useEffect(() => {
    dispatch(setEducationInfo(data));
  }, [data.სასწავლებელი, data.ხარისხი, data.დამთავრების_თარიღი, data.აღწერა]);

  const onSubmit: SubmitHandler<InputProps> = data => {};

  useImperativeHandle(ref, () => ({
    onSubmit: () => {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Education>
        <InputeField
          label='სასწავლებელი'
          placeholder='სასწავლებელი'
          {...register('სასწავლებელი', { required: true })}
          errorText='მინიმუიმ 2 სიმბოლო'
          hasError={!!errors.სასწავლებელი}
          hasSuccess={!errors.სასწავლებელი && data.სასწავლებელი.length >= 2}
        />
      </Education>
      <Degree>
        <DegreeWrapper>
          <Label>ხარისხი</Label>
          <Controller
            control={control}
            rules={{ required: true, validate: value => value !== '' }}
            name='ხარისხი'
            render={({ field }) => (
              <StyledSelect
                {...field}
                hasError={!!errors.ხარისხი}
                hasSuccess={!errors.ხარისხი && data.ხარისხი !== ''}
              >
                <Option value='' disabled hidden>
                  აირჩიეთ ხარისხი
                </Option>
                {options.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </StyledSelect>
            )}
          />
        </DegreeWrapper>
        <InputeField
          label='დამთავრების რიცხვი'
          type='date'
          {...register('დამთავრების_თარიღი', { required: true })}
          hasError={!!errors.დამთავრების_თარიღი}
          hasSuccess={
            !errors.დამთავრების_თარიღი && data.დამთავრების_თარიღი !== ''
          }
          dateType
        />
      </Degree>
      <FieldOfStudy>
        <InputeField
          label='აღწერა'
          placeholder='განათლების აღწერა'
          {...register('აღწერა')}
          hasError={!!errors.აღწერა}
          hasSuccess={!errors.აღწერა && data.აღწერა.length >= 2}
          textArea
        />
      </FieldOfStudy>

      <Line />
    </Wrapper>
  );
};

const Wrapper = styled.form`
  &:not(:first-child) {
    margin-top: 37px;
  }
`;

const Education = styled.div``;

const Degree = styled.div`
  display: flex;
  gap: 56px;
  margin-top: 31px;

  // select img of InputeFIeld component
  & > div:nth-child(2) {
    /* position: relative; */
    & > img {
      /* position: absolute; */
      top: 50%;
      right: 16px;
    }
  }
`;

const DegreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledSelect = styled.select<{
  hasError: boolean;
  hasSuccess: boolean;
}>`
  padding: 13px 16px;
  position: relative;
  cursor: pointer;

  background: #ffffff;
  border: ${({ hasError, hasSuccess }) =>
    hasError
      ? '1px solid #ff0000'
      : hasSuccess
      ? '1px solid #00ff00'
      : '1px solid #bcbcbc'};

  ${({ hasError, hasSuccess }) =>
    !hasError && !hasSuccess && 'border-color: #bcbcbc;'};
  border-radius: 4px;

  /* Inside auto layout */

  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  /* identical to box height, or 131% */

  &:focus {
    outline: none;
  }

  // remove arrow
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  // add custom arrow
  background-image: url(${ArrowDown});
  background-position: right 16px center;
  background-repeat: no-repeat;
  background-size: 16px;

  // set first option color to grey
`;

const Option = styled.option``;

const FieldOfStudy = styled.div`
  margin-top: 34px;
`;

const Line = styled.div`
  border: 1px solid #c1c1c1;
  margin-top: 50px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  /* identical to box height, or 131% */

  color: #000000;

  /* Inside auto layout */
`;
export default React.forwardRef(EduForm);

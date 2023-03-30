import React, { useEffect, useImperativeHandle } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setExperienceInfo } from '../../features/resumeSlice';
import InputeField from '../InputeField';

type ExpFormProps = {
  index: number;
  goToNextStep: () => void;
};

type InputProps = {
  თანამდებობა: string;
  დამსაქმებელი: string;
  დაწყების_თარიღი: string;
  დამთავრების_თარიღი: string;
  აღწერა: string;
};

const ExpForm = ({ index, goToNextStep }: ExpFormProps, ref: any) => {
  const { experienceInfoList } = useAppSelector(state => state.resume);

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      თანამდებობა: experienceInfoList[index]?.თანამდებობა,
      დამსაქმებელი: experienceInfoList[index]?.დამსაქმებელი,
      დაწყების_თარიღი: experienceInfoList[index]?.დაწყების_თარიღი,
      დამთავრების_თარიღი: experienceInfoList[index]?.დამთავრების_თარიღი,
      აღწერა: experienceInfoList[index]?.აღწერა,
    },
  });

  const data = {
    id: index,
    თანამდებობა: watch('თანამდებობა'),
    დამსაქმებელი: watch('დამსაქმებელი'),
    დაწყების_თარიღი: watch('დაწყების_თარიღი'),
    დამთავრების_თარიღი: watch('დამთავრების_თარიღი'),
    აღწერა: watch('აღწერა'),
  };

  useEffect(() => {
    dispatch(setExperienceInfo(data));
  }, [
    data.აღწერა,
    data.დაწყების_თარიღი,
    data.დამთავრების_თარიღი,
    data.დამსაქმებელი,
    data.თანამდებობა,
  ]);

  const onSubmit: SubmitHandler<InputProps> = data => {
    goToNextStep();
  };

  useImperativeHandle(ref, () => ({
    onSubmit: () => {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Position>
        <InputeField
          label='თანამდებობა'
          placeholder='დეველოპერი, დიზაინერი, ა.შ.'
          {...register('თანამდებობა', {
            required: 'თანამდებობა აუცილებელია',
            minLength: {
              value: 2,
              message: 'მინიმუმ 2 სიმბოლო',
            },
          })}
          error={errors.თანამდებობა?.message}
          errorText='მინიმუმ 2 სიმბოლო'
          hasError={!!errors.თანამდებობა}
          hasSuccess={!errors.თანამდებობა && data.თანამდებობა.length >= 2}
        />
      </Position>
      <Company>
        <InputeField
          label='დამსაქმებელი'
          placeholder='დამსაქმებელი'
          {...register('დამსაქმებელი', {
            required: 'დამსაქმებელი აუცილებელია',
            minLength: {
              value: 2,
              message: 'მინიმუმ 2 სიმბოლო',
            },
          })}
          error={errors.დამსაქმებელი?.message}
          errorText='მინიმუმ 2 სიმბოლო'
          hasError={!!errors.დამსაქმებელი}
          hasSuccess={!errors.დამსაქმებელი && data.დამსაქმებელი.length >= 2}
        />
      </Company>
      <Date>
        <StartDate>
          <Label>დაწყების თარიღი</Label>
          <InputeField
            type='date'
            {...register('დაწყების_თარიღი', {
              required: 'დაწყების თარიღი აუცილებელია',
            })}
            error={errors.დაწყების_თარიღი?.message}
            errorText='დაწყების თარიღი აუცილებელია'
            hasError={!!errors.დაწყების_თარიღი}
            hasSuccess={!errors.დაწყების_თარიღი && data.დაწყების_თარიღი !== ''}
            dateType
          />
        </StartDate>

        <EndDate>
          <Label>დამთავრების თარიღი</Label>
          <InputeField
            type='date'
            {...register('დამთავრების_თარიღი')}
            error={errors.დამთავრების_თარიღი?.message}
            hasError={!!errors.დამთავრების_თარიღი}
            hasSuccess={
              !errors.დამთავრების_თარიღი && data.დამთავრების_თარიღი !== ''
            }
            dateType
          />
        </EndDate>
      </Date>

      <Description>
        <Label>აღწერა</Label>
        <InputeField
          placeholder='როლი თანამდებობაზე და ზოგადი აღწერა'
          {...register('აღწერა', {})}
          textArea
        />
      </Description>

      <Line />
    </Wrapper>
  );
};

const Wrapper = styled.form`
  // margin top 20px but not first child
  &:not(:first-child) {
    margin-top: 37px;
  }
`;

const Line = styled.div`
  border: 1px solid #c1c1c1;
  margin-top: 50px;
`;

const Position = styled.div``;

const Company = styled.div`
  margin-top: 31px;
`;

const Date = styled.div`
  margin-top: 31px;
  gap: 56px;
  display: flex;
  flex-direction: row;
`;

const StartDate = styled.div`
  width: 100%;
`;

const EndDate = styled.div`
  width: 100%;
`;

const Description = styled.div`
  margin-top: 61px;
`;

const Input = styled.input`
  background: #ffffff;
  border: 1px solid #bcbcbc;
  border-radius: 4px;
  width: 100%;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  padding: 13px 16px;
  color: rgba(0, 0, 0, 0.6);
`;

const TextAreaInput = styled.textarea`
  background: #ffffff;
  border: 1px solid #bcbcbc;
  border-radius: 4px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;
  resize: none;
  padding: 13px 16px 89px 16px;
  color: rgba(0, 0, 0, 0.6);
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  /* identical to box height, or 131% */

  display: flex;
  align-items: center;

  color: #000000;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin-bottom: 8px;
`;

const Error = styled.span`
  font-weight: 300px;
  font-size: 14px;
  color: #2e2e2e;
`;

export default React.forwardRef(ExpForm);

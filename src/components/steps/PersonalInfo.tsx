import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { InputField } from '..';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setPersonalInfo, setUploadFile } from '../../features/resumeSlice';

type Inputs = {
  სახელი: string;
  გვარი: string;
  ჩემ_შესახებ: string;
  მეილი: string;
  ტელეფონი: string;
};

type Props = {
  goToNextStep: () => void;
};

const PersonalInfo = ({ goToNextStep }: Props) => {
  const { personalInfo, uploadFile } = useAppSelector(state => state.resume);
  const [imageError, setImageError] = useState(false);

  const dispatch = useAppDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(setUploadFile(e.target.files[0]));
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem('resume-image', reader.result as string);
      dispatch(setUploadFile(reader.result as File | null));
    };

    reader.readAsDataURL(e.target.files![0]);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      სახელი: personalInfo.სახელი,
      გვარი: personalInfo.გვარი,
      ჩემ_შესახებ: personalInfo.ჩემ_შესახებ,
      მეილი: personalInfo.მეილი,
      ტელეფონი: personalInfo.ტელეფონი,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(setPersonalInfo(data));
    // check if photo is uploaded
    if (localStorage.getItem('resume-image')) {
      goToNextStep();
    }

    // set error if no photo is uploaded
    setImageError(true);
  };

  const data = {
    სახელი: watch('სახელი'),
    გვარი: watch('გვარი'),
    ჩემ_შესახებ: watch('ჩემ_შესახებ'),
    მეილი: watch('მეილი'),
    ტელეფონი: watch('ტელეფონი'),
  };

  useEffect(() => {
    dispatch(setPersonalInfo(data));
  }, [data.სახელი, data.გვარი, data.ჩემ_შესახებ, data.მეილი, data.ტელეფონი]);

  useEffect(() => {
    if (localStorage.getItem('resume-image')) {
      setImageError(false);
    }
  }, [uploadFile]);

  return (
    <Container>
      <FirstLastName onSubmit={handleSubmit(onSubmit)}>
        <InputField
          {...register('სახელი', {
            required: 'სახელი აუცილებელია',
            minLength: {
              value: 2,
              message: 'სახელის ველი უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსგან',
            },
            pattern: {
              value: /^[ა-ჰ]+$/i,
              message: 'სახელის ველი უნდა შეიცავდეს მხოლოდ ანბანის ასოებს',
            },
          })}
          label='სახელი'
          placeholder='ანზორი'
          errorText='მინიმუმ 2 ასო, ქართული ასოები'
          type='text'
          hasError={!!errors.სახელი}
          error={errors.სახელი?.message}
          hasSuccess={
            !errors.სახელი &&
            data.სახელი.length >= 2 &&
            /^[ა-ჰ]+$/i.test(data.სახელი) // to match pattern
          }
          // error={errors.სახელი?.message}
        />
        <InputField
          {...register('გვარი', {
            required: 'გვარი აუცილებელია',
            minLength: {
              value: 2,
              message: 'გვარის ველი უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსგან',
            },
            pattern: {
              value: /^[ა-ჰ]+$/i,
              message: 'გვარის ველი უნდა შეიცავდეს მხოლოდ ანბანის ასოებს',
            },
          })}
          label='გვარი'
          placeholder='ანზორიშვილი'
          errorText='მინიმუმ 2 ასო, ქართული ასოები'
          type='text'
          hasError={!!errors.გვარი}
          hasSuccess={
            !errors.გვარი &&
            data.გვარი.length >= 2 &&
            /^[ა-ჰ]+$/i.test(data.გვარი)
          }
          error={errors.გვარი?.message}
        />
      </FirstLastName>

      <UploadPersonalPhoto>
        <Label>პირადი ფოტოს ატვირთვა</Label>
        <UploadPhotoInput
          type='file'
          id='personal-photo'
          onChange={handleImageChange}
        />

        <UploadPhotoLabel htmlFor='personal-photo'>ატვირთვა</UploadPhotoLabel>
        {imageError && <Error>ატვირთეთ ფოტო</Error>}
      </UploadPersonalPhoto>

      <AboutMe>
        <InputField
          {...register('ჩემ_შესახებ', {})}
          label='ჩემ შესახებ (არასავალდებულო)'
          placeholder='მე ვარ ანზორი ანზორიშვილი'
          textArea
        />
      </AboutMe>

      <ContactInfo>
        <InputField
          {...register('მეილი', {
            required: 'ელ ფოსტა აუცილებელია',

            pattern: {
              value: /^[a-zA-Z0-9._%+-]{3,}@redberry.ge$/i,
              message: 'ელ ფოსტა უნდა მთავრდებოდეს @redberry.ge-ით',
            },
          })}
          label='ელ ფოსტა'
          placeholder='anzor666@redberry.ge'
          errorText='უნდა მთავრდებოდეს @redberry.ge-ით'
          type='email'
          hasError={!!errors.მეილი}
          hasSuccess={
            !errors.მეილი &&
            data.მეილი.length >= 2 &&
            /@redberry.ge$/i.test(data.მეილი)
          }
          error={errors.მეილი?.message}
        />

        <InputField
          {...register('ტელეფონი', {
            required: 'მობილურის ნომერი აუცილებელია',
            pattern: {
              //pattern for this +995599112272
              value: /^(\+995)?5[0-9]{8}$/,
              message: 'უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს',
            },
            //pattern for this +995599112272
          })}
          label='მობილურის ნომერი'
          placeholder='+995 555 55 55 55'
          errorText='უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს'
          hasError={!!errors.ტელეფონი}
          hasSuccess={
            !errors.ტელეფონი &&
            data.ტელეფონი.length >= 2 &&
            /^(\+995)?5[0-9]{8}$/.test(data.ტელეფონი)
          }
          error={errors.ტელეფონი?.message}
        />

        <ButtonWrapper>
          <NextButton type='button' onClick={handleSubmit(onSubmit)}>
            შემდეგი
          </NextButton>
        </ButtonWrapper>
      </ContactInfo>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FirstLastName = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  column-gap: 56px;
  justify-content: space-between;
  /* border: 1px solid red; */
`;

const ContactInfo = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 21px;
`;

const AboutMe = styled.div`
  margin-top: 49px;
`;

const UploadPersonalPhoto = styled.div`
  display: flex;
  margin-top: 46px;
  gap: 19px;
`;

const UploadPhotoLabel = styled.label`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  color: #ffffff;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  border: none;
  background: #0e80bf;
  border-radius: 4px;
  padding: 4px 19px;

  cursor: pointer;

  &:hover {
    background: #0e81bfd1;
  }
`;

const UploadPhotoInput = styled.input`
  display: none;
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
`;

const NextButton = styled.button`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;

  /* identical to box height */

  letter-spacing: 0.08em;

  color: #ffffff;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  padding: 15px 35px;

  background: #6b40e3;
  border-radius: 4px;

  border: none;

  cursor: pointer;

  &:hover {
    background: #6b40e3d6;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 64px;
`;

const Error = styled.span`
  font-weight: 300px;
  font-size: 14px;
  color: #2e2e2e;
`;

export default PersonalInfo;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../app/hooks';
import { MailIcon, PhoneIcon, StarLogo } from '../assets/images';
import ExperienceDisplay from './ExperienceDisplay';

const DisplayInfo = () => {
  const {
    personalInfo,
    isFinished,
    uploadFile,
    experienceInfoList,
    educationInfoList,
  } = useAppSelector(state => state.resume);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  // loop though personalInfo and check if there is any empty string

  useEffect(() => {
    // get item from local storage
    const image = localStorage.getItem('resume-image');
    if (image) {
      setAvatarImage(image);
    }
  }, [uploadFile]);
  return (
    <Container isFinished={isFinished}>
      <PersonalInfoWrapper>
        <InfoContainer>
          <InfoWrapper>
            <Title>
              {personalInfo.სახელი} {personalInfo.გვარი}
            </Title>
            <Mail>
              {personalInfo.მეილი.length > 0 && (
                <>
                  <img src={MailIcon} alt='mail icon' />
                  <p>{personalInfo.მეილი}</p>
                </>
              )}
            </Mail>
            <Phone>
              {personalInfo.ტელეფონი.length > 0 && (
                <>
                  <img src={PhoneIcon} alt='phone icon' />
                  <p>{personalInfo.ტელეფონი}</p>
                </>
              )}
            </Phone>
            <AboutMe>
              {personalInfo.ჩემ_შესახებ.length > 0 && (
                <>
                  <h3>ჩემ შესახებ</h3>

                  <p>{personalInfo.ჩემ_შესახებ}</p>
                </>
              )}
            </AboutMe>
          </InfoWrapper>
          <AvatarWrapper>
            {avatarImage && <AvatarImg src={avatarImage} alt='avatar' />}
          </AvatarWrapper>
        </InfoContainer>
        {personalInfo.სახელი.length > 0 && <Line />}
      </PersonalInfoWrapper>
      <ExperienceWrapper>
        {experienceInfoList.map((exp, index) => (
          <ExperienceDisplay
            key={index}
            experienceInfo={exp}
            title='გამოცდილება'
          />
        ))}
      </ExperienceWrapper>
      <EducationWrapper>
        {educationInfoList.map((edu, index) => (
          <ExperienceDisplay
            key={index}
            experienceInfo={edu}
            title='განათლება'
          />
        ))}
      </EducationWrapper>
      <StarImg src={StarLogo} alt='star logo' />
    </Container>
  );
};

const Container = styled.div<{
  isFinished: boolean;
}>`
  display: flex;
  position: relative;
  flex-direction: column;
  background: #ffff;
  flex: ${props => (props.isFinished ? 'none' : '1')};

  width: ${props => (props.isFinished ? '50%' : '100%')};
  height: ${props => (props.isFinished ? '90vh' : 'auto')};

  border: ${props => (props.isFinished ? '1px solid #c1c1c1' : 'none')};
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StarImg = styled.img`
  position: absolute;
  left: 78px;
  bottom: 44px;
`;

const PersonalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 75px 0px 80px;
`;

const ExperienceWrapper = styled.div`
  padding: 0px 75px 0px 80px;

  display: flex;
  flex-direction: column;
`;

const EducationWrapper = styled.div`
  padding: 0px 75px 0px 80px;

  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #c1c1c1;
  margin-top: 19px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;

  flex-direction: row;
  flex: 1;
  width: 100%;
`;

const InfoWrapper = styled.div`
  flex: 1;
  width: 100%;
  padding: 20px 0 0 0;
`;

const AvatarWrapper = styled.div``;

const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 42px;
  /* identical to box height */

  color: #f93b1d;
`;

const Mail = styled.div`
  display: flex;
  align-items: center;
  margin-top: 19px;
  gap: 10px;

  p {
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;

    /* off black */

    color: #1a1a1a;
  }
`;

const Phone = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 10px;

  p {
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;

    /* off black */

    color: #1a1a1a;
  }
`;

const AboutMe = styled.div`
  margin-top: 34px;
  height: auto;
  max-width: 450px;

  h3 {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    color: #f93b1d;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    /* or 138% */

    text-transform: lowercase;

    color: #000000;
    margin-top: 15px;

    overflow-wrap: break-word;
  }
`;

export default DisplayInfo;

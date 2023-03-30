import styled from 'styled-components';

type Props = {
  experienceInfo: any;
  title: string;
};

const ExperienceDisplay = ({ experienceInfo, title }: Props) => {
  const {
    თანამდებობა,
    დამსაქმებელი,
    დაწყების_თარიღი,
    დამთავრების_თარიღი,
    აღწერა,
    სასწავლებელი,
    ხარისხი,
  } = experienceInfo;

  console.log(experienceInfo);

  console.log(თანამდებობა);
  return (
    <Wrapper>
      {თანამდებობა?.length > 0 && <Title>{title}</Title>}
      {სასწავლებელი && <Title>{title}</Title>}
      <JobType>
        {თანამდებობა && (
          <>
            <p>{თანამდებობა}</p>
            <h3>{დამსაქმებელი}</h3>
          </>
        )}
        {სასწავლებელი && (
          <>
            <p>{სასწავლებელი}</p>
            <h3>{ხარისხი}</h3>
          </>
        )}
      </JobType>
      <Date>
        {დაწყების_თარიღი && <p>{დაწყების_თარიღი}</p>}
        {დამთავრების_თარიღი && (
          <>
            {დაწყების_თარიღი && <p> - </p>}
            <p>{დამთავრების_თარიღი}</p>
          </>
        )}
      </Date>
      {აღწერა && (
        <AboutMe>
          <span>{აღწერა}</span>
        </AboutMe>
      )}
      {თანამდებობა && <Line />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #c1c1c1;
  margin-top: 19px;
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  color: #f93b1d;
`;

const JobType = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;

  h3,
  p {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    margin-right: 10px;
    /* identical to box height */

    /* off black */

    color: #1a1a1a;
  }
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  margin-top: 7px;
  gap: 5px;

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #919191;
  }
`;

const AboutMe = styled.div`
  margin-top: 16px;

  span {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    /* or 138% */

    text-transform: capitalize;

    color: #000000;
  }
`;
export default ExperienceDisplay;

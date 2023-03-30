import styled from 'styled-components';

type StepButtonProps = {
  title: string;
  onClick: () => void;
};

const StepButton = ({ onClick, title }: StepButtonProps) => {
  return <Button onClick={onClick}>{title}</Button>;
};

const Button = styled.button`
  padding: 14px 35px;
  background: #6b40e3;
  border-radius: 4px;

  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */

  letter-spacing: 0.08em;

  color: #ffffff;

  border: none;

  cursor: pointer;

  &:hover {
    background: #6b40e3d6;
  }
`;

export default StepButton;

import React, { ComponentProps } from 'react';
import styled from 'styled-components';
import { SuccessLogo, ErrorLogo } from '../assets/images';

type Props = ComponentProps<'input'> & {
  label?: string;
  errorText?: string;
  textArea?: boolean;
  hasError?: boolean;
  hasSuccess?: boolean;
  error?: string;
  dateType?: boolean;
};

const InputeField = (
  {
    label,
    errorText,
    hasError,
    error,
    hasSuccess,
    textArea,
    dateType,
    ...rest
  }: Props,
  ref: any
) => {
  return (
    <FormGroup>
      {label && <Label>{label}</Label>}
      <Input
        ref={ref}
        {...rest}
        hasError={hasError}
        hasSuccess={hasSuccess}
        textArea={textArea}
        dateType={dateType}
      />
      {!error && <ErrorText>{errorText}</ErrorText>}

      {error && <Error>{error}</Error>}
      {hasSuccess && <SuccessIcon src={SuccessLogo} alt='success' />}
    </FormGroup>
  );
};

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  position: relative;
`;

const Input = styled.input<{
  hasError?: boolean;
  hasSuccess?: boolean;
  textArea?: boolean;
  dateType?: boolean;
}>`
  background: #ffffff;
  border: 1px solid #bcbcbc;
  border: ${({ hasError, hasSuccess }) =>
    hasError
      ? '1px solid #ff0000'
      : hasSuccess
      ? '1px solid #00ff00'
      : '1px solid #bcbcbc'};

  ${({ hasError, hasSuccess }) =>
    !hasError && !hasSuccess && 'border-color: #bcbcbc;'};

  border-radius: 4px;
  width: 100%;

  height: ${({ textArea }) => (textArea ? '103px' : 'auto')};
  padding: ${({ textArea }) =>
    textArea ? '13px 16px 69px 16px' : '13px 16px'};

  /* Inside auto layout */

  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  /* identical to box height, or 131% */

  display: flex;
  align-items: center;

  color: rgba(0, 0, 0, 0.6);

  &:focus {
    outline: none;
  }

  cursor: pointer;

  // change image padding when dateType is true
  ${({ dateType }) => dateType && 'padding-right: 40px;'}
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  /* identical to box height, or 131% */

  color: #000000;

  /* Inside auto layout */
`;
const Error = styled.span`
  font-weight: 300px;
  font-size: 14px;
  color: #2e2e2e;
`;

const ErrorText = styled(Error)`
  font-weight: 300px;
  font-size: 14px;
  color: #2e2e2e;
`;

const Required = styled.span``;

const SuccessIcon = styled.img`
  width: 16.5px;
  height: 16.5px;
  position: absolute;
  right: 15px;
  bottom: 40px;
`;

export default React.forwardRef(InputeField);

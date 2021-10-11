import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 2rem;

  label {
    display: block;
    font-size: var(--smallText);
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
  .input-box {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: var(--borderRadius);
    background: var(--grey-100);
    border: 2px solid;
    border-color: transparent;
    &:focus-within {
      border-color: black;
    }
  }
  .fixed-placeholder {
    padding-left: 12px;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: var(--letterSpacing);
  }
  .error-message {
    color: red;
    font-size: var(--font-size-xs);
    margin-top: 0.5rem;
  }
  .error-message::first-letter {
    text-transform: capitalize;
  }
`;

const FormRow = ({ children, label, fixedPlaceholder, errorMessages }) => {
  console.log(children);
  return (
    <Wrapper>
      <label htmlFor={label}>{label}</label>
      <div className="input-box">
        {fixedPlaceholder && (
          <div className="fixed-placeholder">{fixedPlaceholder}</div>
        )}
        {children}
      </div>
      {errorMessages && <div className="error-message">{errorMessages}</div>}
    </Wrapper>
  );
};

export default FormRow;

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.form`
  padding-bottom: 1rem;
  margin-bottom: 0.5rem;

  fieldset {
    border: 0;
  }

  input,
  textarea {
    outline-color: black;
    border-radius: var(--borderRadius);
    width: 100%;
    padding: 12px;
    background: none;
    border: none;
    font-size: 1rem;
  }
  input:focus,
  input:active {
    background: none;
    outline: none;
  }
  input::placeholder {
    color: var(--grey-400);
  }

  .submit-btn {
    width: 100%;
  }
`;

const StyledForm = ({ children, isDisabled, ...rest }) => {
  return (
    <Wrapper {...rest}>
      <fieldset disabled={[...isDisabled].some((val) => val)}>
        {children}
      </fieldset>
    </Wrapper>
  );
};

export default StyledForm;

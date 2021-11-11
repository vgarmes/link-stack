import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  bottom: 5%;
  z-index: 100;
  padding: 0.375rem 0.75rem;
  margin: 0 auto;
  border-color: transparent;
  border-radius: var(--borderRadius);
  width: var(--fluid-width);
  max-width: var(--fixed-width);
  text-align: center;
  text-transform: capitalize;

  &.danger {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &.success {
    color: var(--green-dark);
    background: var(--green-light);
  }
  &.loading {
    color: black;
    background: yellow;
  }
`;

const Alert = ({ type, children }) => {
  return <Wrapper className={type}>{children}</Wrapper>;
};

export default Alert;

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 48px 80px;
  max-width: 640px;
  margin: 64px auto;
  border: 1px solid var(--grey-200);
  border-radius: var(--borderRadius);
  h1 {
    padding-bottom: 48px;
  }
  .login-link {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: var(--grey-500);

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SectionCenter = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default SectionCenter;

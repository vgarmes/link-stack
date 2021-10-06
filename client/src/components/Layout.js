import React from 'react';
import { Navbar } from './';
import styled from 'styled-components';

const StyledContent = styled.main`
  margin-top: var(--nav-height);
  overflow-x: hidden;
  min-height: 100vh;
  padding: 0 48px;
  @media (max-width: 1080px) {
    padding: 0 24px;
  }
  @media (max-width: 768px) {
    padding: 0 12px;
  }
  @media (max-width: 480px) {
    padding: 0 6px;
  }
  transition: var(--transition);
`;

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <StyledContent>{children}</StyledContent>
    </div>
  );
};

export default Layout;

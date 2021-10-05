import React from 'react';
import { Navbar } from './';
import styled from 'styled-components';

const StyledContent = styled.div`
  padding-top: var(--nav-height);
  min-height: 100vh;
  height: 100%;
  overflow-x: hidden;
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

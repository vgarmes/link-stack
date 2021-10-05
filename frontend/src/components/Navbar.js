import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  background-color: var(--color-background);
  position: fixed;
  top: 0;
  height: var(--nav-height);
  z-index: 11;
  transition: var(--transition);
  width: 100%;
`;

const StyledNav = styled.nav`
  padding: 0px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;

  .nav-links {
    display: flex;
    align-items: center;

    > :not(:last-child) {
      margin-right: 32px;
    }
  }

  .logo {
    font-weight: 700;
    margin-right: 32px;
  }
`;

const Navbar = () => {
  return (
    <StyledHeader>
      <StyledNav>
        <div className="nav-links">
          <Link to="/" className="logo">
            linkstack
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/login">Log in</Link>
          <Link to="/register">
            <button className="btn-small">Sign up</button>
          </Link>
        </div>
      </StyledNav>
    </StyledHeader>
  );
};

export default Navbar;

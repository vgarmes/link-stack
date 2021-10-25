import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useSessionContext } from '../context/session-context';
import { IoPerson } from 'react-icons/io5';
import { Button } from './';

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

    > :first-child:hover {
      text-decoration: underline;
    }

    > :not(:last-child) {
      margin-right: 32px;
    }
  }

  .logo {
    font-weight: 700;
    margin-right: 32px;
  }

  .user {
    display: flex;
    align-items: center;
    text-transform: capitalize;
    > :first-child {
      margin-right: 0.5em;
    }
  }
`;

const Navbar = () => {
  const location = useLocation();
  const { user, logoutUser } = useSessionContext();
  const hideNavLinks = ['/register', '/login'].some((path) =>
    location.pathname.includes(path)
  );

  return (
    <StyledHeader>
      <StyledNav>
        <div className="nav-links">
          <Link to="/" className="logo">
            linkstack
          </Link>
        </div>

        {!hideNavLinks && (
          <div className="nav-links">
            {user ? (
              <>
                <Link to="/dashboard" className="user">
                  {<IoPerson />}
                  {user.username}
                </Link>
                <Button
                  size="sm"
                  colorScheme="secondary"
                  onClick={() => {
                    logoutUser();
                  }}
                >
                  <span style={{ textTransform: 'uppercase' }}>Log out</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">Log in</Link>
                <Link to="/register">
                  <Button size="sm" colorScheme="secondary">
                    <span style={{ textTransform: 'uppercase' }}>Sign up</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </StyledNav>
    </StyledHeader>
  );
};

export default Navbar;

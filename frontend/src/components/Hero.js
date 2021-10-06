import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;

  .heading {
    margin-bottom: 32px;
    text-align: center;

    h1 {
      text-transform: capitalize;
      font-size: 48px;
      font-weight: normal;
    }

    h2 {
      font-size: 24px;
      padding-top: 16px;
      font-weight: normal;
    }
  }
  .sign-in-cta {
    padding-top: 16px;
    a:not(:hover) {
      text-decoration: underline;
    }
  }
`;

const Hero = () => {
  return (
    <StyledHero>
      <div className="heading">
        <h1>The only link you'll ever need</h1>
        <h2>
          The open source alternative to connect audiences with just one link
        </h2>
      </div>
      <Link to="/register">
        <button className="btn-big">Get started for free</button>
      </Link>
      <div className="sign-in-cta">
        <p>
          Already on Linkstack? <Link to="/login">Log in</Link>
        </p>
      </div>
    </StyledHero>
  );
};

export default Hero;

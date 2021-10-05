import React from 'react';
import styled from 'styled-components';

const StyledHero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    margin-bottom: 32px;
    text-transform: capitalize;
  }
`;

const Hero = () => {
  return (
    <StyledHero>
      <div className="title">
        <h1>The only link you'll ever need</h1>
      </div>
    </StyledHero>
  );
};

export default Hero;

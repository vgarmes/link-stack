import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.img`
  border-radius: 50%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: block;
  object-fit: contain;
  object-position: initial;
`;

Wrapper.defaultProps = {
  size: 96,
};

const Avatar = ({ children, size, ...rest }) => {
  return (
    <Wrapper size={size} {...rest}>
      {children}
    </Wrapper>
  );
};

export default Avatar;

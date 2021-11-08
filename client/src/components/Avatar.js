import React from 'react';
import styled from 'styled-components';

const StyledImg = styled.img`
  border-radius: 50%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: block;
  object-fit: contain;
  object-position: initial;
`;

StyledImg.defaultProps = {
  size: 96,
};

const Avatar = ({ size, ...rest }) => {
  return <StyledImg size={size} {...rest} />;
};

export default Avatar;

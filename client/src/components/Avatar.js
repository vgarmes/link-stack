import React from 'react';
import styled, { css } from 'styled-components';

const hoverStyle = css`
  &:hover:after {
    position: absolute;
    content: '';
    background-color: ${({ theme }) => theme.colors['hover-overlay']};
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  ${({ hoverEffect }) => (hoverEffect ? hoverStyle : ``)}

  img {
    width: 100%;
    display: block;
    object-fit: cover;
    object-position: initial;
  }
`;

Wrapper.defaultProps = {
  size: 96,
  hoverEffect: false,
};

const Avatar = ({ src, alt, hoverEffect, ...rest }) => {
  return (
    <Wrapper hoverEffect={hoverEffect} {...rest}>
      <img src={src} alt={alt} />
    </Wrapper>
  );
};

export default Avatar;

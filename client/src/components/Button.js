import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  ${({ theme, size }) => theme.mixins.buttons[size]}
  width: ${({ theme, isFullWidth, width }) =>
    isFullWidth ? '100%' : theme.sizes[width]};
  background: ${({ theme, colorScheme }) => theme.colors[colorScheme]};
`;

Wrapper.defaultProps = {
  size: 'md',
  colorScheme: 'primary',
};

const Button = ({ children, ...rest }) => {
  console.log(rest);
  return <Wrapper {...rest}>{children}</Wrapper>;
};

export default Button;

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  ${({ size, theme }) => theme.mixins.buttons[size]}

  background: ${({ colorScheme, theme }) => theme.colors[colorScheme]}
`;

Wrapper.defaultProps = {
  size: 'md',
  colorScheme: 'primary',
};

const Button = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Button;

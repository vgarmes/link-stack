import React from 'react';
import styled, { css } from 'styled-components';

const getStyleMixin = (props) => {
  const { variant, colorScheme } = props;
  let styleMixin = css`
    color: var(--color-white);
    background: ${({ theme }) => theme.colors[colorScheme]};
    &:hover {
      background: ${({ theme }) => theme.colors[colorScheme + '-600']};
    }
  `;

  switch (variant) {
    case 'solid':
      return styleMixin;
    case 'outline':
      return (styleMixin = css`
        color: ${({ theme }) => theme.colors[colorScheme + '-600']};
        background: transparent;
        border: 1px solid ${({ theme }) => theme.colors[colorScheme + '-600']};
        &:hover {
          background: ${({ theme }) => theme.colors[colorScheme + '-50']};
        }
      `);
    case 'ghost':
      return (styleMixin = css`
        color: ${({ theme }) => theme.colors[colorScheme + '-600']};
        background: transparent;
        &:hover {
          background: ${({ theme }) => theme.colors[colorScheme + '-50']};
        }
      `);
    case 'link':
      return (styleMixin = css`
        color: ${({ theme }) => theme.colors[colorScheme + '-300']};
        background: transparent;
        &:hover {
          text-decoration: underline;
        }
      `);
    default:
      return styleMixin;
  }
};

const Wrapper = styled.button`
  ${({ size, theme }) => theme.mixins.buttons[size]}

  width: ${({ theme, isFullWidth, width }) =>
    isFullWidth ? '100%' : theme.sizes[width]};

  ${(props) => getStyleMixin(props)}
`;

Wrapper.defaultProps = {
  size: 'md',
  colorScheme: 'primary',
  variant: 'solid',
  isFullWidth: false,
  width: 'auto',
};

const Button = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Button;

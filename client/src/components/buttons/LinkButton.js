import React from 'react';
import styled from 'styled-components';
import * as FontAwesome from 'react-icons/fa';

const Wrapper = styled.a`
  position: relative;
  border: 2px solid black;
  width: 100%;
  padding: 16px 20px;
  font-weight: 700;
  font-size: var(--font-size-md);
  text-align: center;
  background: var(--color-background);
  .button-icon {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
  }
  &:hover {
    background: var(--color-text);
    color: var(--color-background);
    border-color: var(--color-background);
  }
`;

const LinkButton = ({ iconName, label, url, ...rest }) => {
  return (
    <Wrapper
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      {...rest}
    >
      {React.createElement(FontAwesome[iconName], {
        className: 'button-icon',
      })}
      <p>{label}</p>
    </Wrapper>
  );
};

export default LinkButton;

import React from 'react';
import styled from 'styled-components';
import * as FontAwesome from 'react-icons/fa';

const Wrapper = styled.a`
  padding: 12px 8px;
  .button-icon {
    width: 32px;
    height: 32px;
    &:hover {
      transform: scale(1.075);
    }
  }
`;

const SocialButton = ({ icon, url, label, ...rest }) => {
  return (
    <Wrapper
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      {...rest}
    >
      {React.createElement(FontAwesome[icon], {
        className: 'button-icon',
      })}
    </Wrapper>
  );
};

export default SocialButton;

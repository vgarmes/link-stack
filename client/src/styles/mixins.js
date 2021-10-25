import { css } from 'styled-components';

const button = css`
  cursor: pointer;
  width: auto;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  letter-spacing: var(--letterSpacing);
  color: var(--color-background);
`;

const mixins = {
  buttons: {
    sm: css`
      ${button}
      height: 32px;
      padding: 0 16px;
      border-radius: 8px;
    `,
    md: css`
      ${button}
      height: 48px;
      padding: 0 24px;
      border-radius: 12px;
    `,
    lg: css`
      ${button}
      height: 64px;
      padding: 0 32px;
      border-radius: 16px;
    `,
  },
};

export default mixins;

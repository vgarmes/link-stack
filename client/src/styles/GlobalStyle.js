import { createGlobalStyle } from 'styled-components';
import variables from './variables';

const GlobalStyle = createGlobalStyle`
${variables};

*,
::after,
::before {
  margin:0;
  padding:0;
  box-sizing:border-box
}

body {
  font-family: var(--ff-primary);
  background: var(--color-background);
  font-weight: 400;
  line-height: 1.75;
  color: var(--color-text);
}

h1,
h2,
h3,
h4,
h5 {
  line-height: 1.3;
  letter-spacing: var(--letterSpacing);
  font-weight: normal;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  border: none;
  outline: none;
}

button:disabled {
  cursor: default;
  background: var(--grey-200);
  color: var(--grey-400);
}
`;

export default GlobalStyle;

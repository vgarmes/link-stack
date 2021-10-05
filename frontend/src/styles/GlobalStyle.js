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

a {
  text-decoration: none;
  color: inherit;
}

button {
  border: none;
  outline: none;
}

.btn-small {
  height: 32px;
  padding: 0 16px;
  border-radius: 8px;
  cursor: pointer;
  width: auto;
  position:relative;
  display:flex;
  flex-direction: row;
  justify-content:center;
  align-items:center;
  color: var(--color-text);
  background: var(--color-secondary);
  font-weight: bold;
  text-transform: uppercase;
}

.btn {
  cursor:pointer;
  color: var(--white);
  background: var(--primary-500);
  border: transparent;
  border-radius: var(--borderRadius);
  letter-spacing: var(--leterSpacing);
  padding: 0.375rem 0.75rem;
  box-shadow: var(--shadow-1);
  transition: var(--transition);
  text-transform: capitalize;
  display: inline-block;
}
.btn:hover {
  background: var(--primary-700);
  box-shadow: var(--shadow-3);
}
.btn-block {
  width: 100%;
}
`;

export default GlobalStyle;

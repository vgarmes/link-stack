import { css } from 'styled-components';
import { COLORS } from './colors';

const colorMode = 'light';

const variables = css`
  :root {
    /* colors */
    --color-background: ${COLORS[colorMode].background};
    --color-subtle-background: ${COLORS[colorMode]['subtle-background']};
    --color-text: ${COLORS[colorMode].text};
    --color-primary: ${COLORS[colorMode].primary};
    --color-secondary: ${COLORS[colorMode].secondary};
    --color-tertiary: ${COLORS[colorMode].tertiary};
    --color-primary-accent: ${COLORS[colorMode]['primary-accent']};

    /* grey */
    --color-grey-50: ${COLORS[colorMode]['gray-50']};
    --color-grey-100: ${COLORS[colorMode]['gray-100']};
    --color-grey-200: ${COLORS[colorMode]['gray-200']};
    --color-grey-300: ${COLORS[colorMode]['gray-300']};
    --color-grey-400: ${COLORS[colorMode]['gray-400']};
    --color-grey-500: ${COLORS[colorMode]['gray-500']};
    --color-grey-600: ${COLORS[colorMode]['gray-600']};
    --color-grey-700: ${COLORS[colorMode]['gray-700']};
    --color-grey-900: ${COLORS[colorMode]['gray-900']};
    /* rest of the colors */
    --color-black: #222;
    --color-white: #fff;
    --color-red-light: #f8d7da;
    --color-red-dark: #842029;
    --color-green-light: #d1e7dd;
    --color-green-dark: #0f5132;
    --color-subtle-floating: ${COLORS[colorMode]['subtle-floating']};
    --color-hover-overlay: ${COLORS[colorMode]['hover-overlay']};
    --color-alert: ${COLORS[colorMode]['alert']};
    --color-alert-text: ${COLORS[colorMode]['alert-text']};

    /* fonts  */
    --ff-primary: 'Karla', sans-serif;
    --headingFont: 'Karla', sans-serif;
    --bodyFont: 'Karla', sans-serif;
    --smallText: 0.7em;
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-xxl: 1.375rem;
    /* rest of the vars */
    --backgroundColor: var(--grey-50);
    --textColor: var(--grey-900);
    --borderRadius: 0.25rem;
    --letterSpacing: 1px;
    --transition: 0.3s ease-in-out all;
    --max-width: 1120px;
    --fixed-width: 400px;

    /* box shadow*/
    --shadow-1: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-2: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-3: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-4: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);

    /* other */
    --nav-height: 74px;
  }
`;

export default variables;

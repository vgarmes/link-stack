import { css } from 'styled-components';

const variables = css`
  :root {
    /* colors */
    --color-background: white;
    --color-text: rgb(38, 50, 56);
    --color-primary: #7551e9;
    --color-secondary: rgb(57, 224, 155);
    --primary-100: #e2e0ff;
    --primary-200: #c1beff;
    --primary-300: #a29dff;
    --primary-400: #837dff;
    --primary-500: #645cff;
    --primary-600: #504acc;
    --primary-700: #3c3799;
    --primary-800: #282566;
    --primary-900: #141233;

    /* grey */
    --grey-50: #f8fafc;
    --grey-100: #f1f5f9;
    --grey-200: #e2e8f0;
    --grey-300: #cbd5e1;
    --grey-400: #94a3b8;
    --grey-500: #64748b;
    --grey-600: #475569;
    --grey-700: #334155;
    --grey-800: #1e293b;
    --grey-900: #0f172a;
    /* rest of the colors */
    --black: #222;
    --white: #fff;
    --red-light: #f8d7da;
    --red-dark: #842029;
    --green-light: #d1e7dd;
    --green-dark: #0f5132;

    /* fonts  */
    --ff-primary: 'Karla', sans-serif;
    --headingFont: 'Karla', sans-serif;
    --bodyFont: 'Karla', sans-serif;
    --smallText: 0.7em;
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
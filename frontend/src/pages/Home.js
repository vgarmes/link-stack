import React, { useState } from 'react';
import styled from 'styled-components';
const rootUrl = 'http://localhost:5000';

const LoginForm = styled.form`
width: 90vh;
max-width: 400px;
background: var(--white);
border-radius: var(--borderRadius);
box-shadow: var(--shadow-2);
padding: 2rem 2.5rem;
margin 0 auto;

label {
  display:block;
  font-size: var(--smallText);
  margin-bottom: 0.5rem;
  text-transform: capitalize;
  letter-spacing: var(--letterSpacing);
}
input,
textarea {
  width: 100%;
  padding: 0.375rem 0.75rem;
  border-radius: var(--borderRadius);
  background: var(--backgroundColor);
  border: 1px solid var(--grey-200);
}
.form-row {
  margin-bottom: 1rem;
}
.submit-btn {
  margin-top:0.5rem;
}
`;

const Home = () => {
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('secret');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const user = { email, password };

    try {
      const url = `${rootUrl}/api/v1/auth/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      console.log(result);
      setPassword('');
      setEmail('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-block submit-btn">
          submit
        </button>
      </LoginForm>
    </div>
  );
};

export default Home;

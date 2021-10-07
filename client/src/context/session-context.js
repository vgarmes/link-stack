import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SessionContext = React.createContext();

const SessionProvider = ({ children }) => {
  //const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const saveUser = (user) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/v1/users/showMe');
      saveUser(data.user);
    } catch (error) {
      removeUser();
    }
  };

  const logoutUser = async () => {
    try {
      await axios.get('/api/v1/auth/logout');
      removeUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <SessionContext.Provider value={{ saveUser, user, logoutUser }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  return useContext(SessionContext);
};

export { SessionProvider };

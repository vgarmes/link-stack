import { useState, useEffect } from 'react';

const useLocalState = () => {
  const [alert, setAlert] = useState({
    show: false,
    text: '',
    type: 'danger',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const showAlert = ({ text, type = 'danger' }) => {
    setAlert({ show: true, text, type });
  };

  const hideAlert = () => {
    setAlert({ show: false, text: '', type: 'danger' });
  };

  useEffect(() => {
    if (alert.show && (alert.type === 'danger' || alert.type === 'success')) {
      const timer = setTimeout(() => {
        hideAlert();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert]);

  return {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
    hideAlert,
  };
};

export default useLocalState;

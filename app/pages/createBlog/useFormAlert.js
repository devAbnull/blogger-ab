import { useState, useEffect, useCallback } from 'react';

export default function useFormAlert({ data, error }) {
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [shouldShowAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (error) {
      setAlertType('error');
      setAlertMessage('Sorry! could not save the blog');
      setShowAlert(true);
    } else if (data) {
      setAlertType('success');
      setAlertMessage('Blog was successfully saved.');
      setShowAlert(true);
    } else {
      setAlertType('');
      setAlertMessage('');
      setShowAlert(false);
    }
  }, [data, error]);

  const closeAlert = useCallback(() => {
    setShowAlert(false);
  }, []);

  return { alertType, alertMessage, shouldShowAlert, closeAlert };
}
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { hideNotification } from '../../redux/slices/notificationSlice';

const Notification = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.notification);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideNotification());
  };

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [open, dispatch]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;

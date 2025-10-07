import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  message: '',
  severity: 'info', // 'error', 'warning', 'info', 'success'
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || 'info';
    },
    hideNotification: (state) => {
      state.open = false;
      state.message = '';
      state.severity = 'info';
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const showSuccessNotification = (message) =>
  showNotification({ message, severity: 'success' });

export const showErrorNotification = (message) =>
  showNotification({ message, severity: 'error' });

export const showWarningNotification = (message) =>
  showNotification({ message, severity: 'warning' });

export const showInfoNotification = (message) =>
  showNotification({ message, severity: 'info' });

export default notificationSlice.reducer;

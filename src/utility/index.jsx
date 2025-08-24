import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessNotification = (message) =>
  toast.success(message, { position: 'top-right', autoClose: 3000, theme: 'light' });

export const showErrorNotification = (message) =>
  toast.error(message, { position: 'top-right', autoClose: 4000, theme: 'light' });

export const showDeleteNotification = (message) =>
  toast.error(message, { position: 'top-right', autoClose: 3000, theme: 'colored' });

export const showWarningNotification = (message) =>
  toast.warn(message, { position: 'top-right', autoClose: 3000, theme: 'light' });

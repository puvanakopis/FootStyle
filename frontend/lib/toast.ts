import toast, { ToastOptions } from 'react-hot-toast';

const defaultOptions: ToastOptions = {
  duration: 3000,
  style: {
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    fontFamily: 'inherit',
  },
};

export const showToast = (
  type: 'success' | 'error' | 'info',
  message: string
) => {
  if (type === 'success') {
    toast.success(message, {
      ...defaultOptions,
      style: {
        ...defaultOptions.style,
        background: '#f0fdf4',
        color: '#166534',
        border: '1px solid #bbf7d0',
      },
    });
  } else if (type === 'error') {
    toast.error(message, {
      ...defaultOptions,
      style: {
        ...defaultOptions.style,
        background: '#fef2f2',
        color: '#991b1b',
        border: '1px solid #fecaca',
      },
    });
  } else if (type === 'info') {
    toast(message, {
      ...defaultOptions,
      style: {
        ...defaultOptions.style,
        background: '#eff6ff',
        color: '#1e3a8a',
        border: '1px solid #bfdbfe',
      },
    });
  }
};
import React from 'react';
import { useTravel } from '../context/TravelContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useTravel();

  if (!toasts.length) return null;

  return (
    <div className="toast-container-custom">
      {toasts.map((t) => (
        <div key={t.id} className={`toast-item bg-${t.type}`}>
          <div className="d-flex align-items-center gap-2">
            <i
              className={`fa-solid ${
                t.type === 'success'
                  ? 'fa-circle-check'
                  : t.type === 'danger'
                  ? 'fa-circle-exclamation'
                  : t.type === 'warning'
                  ? 'fa-triangle-exclamation'
                  : 'fa-circle-info'
              }`}
            ></i>
            <span>{t.message}</span>
          </div>
          <button
            type="button"
            className="btn-close btn-close-white ms-3"
            onClick={() => removeToast(t.id)}
            aria-label="Close"
          ></button>
        </div>
      ))}
    </div>
  );
}

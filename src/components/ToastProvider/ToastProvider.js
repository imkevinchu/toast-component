import React, { useState, createContext, useCallback } from "react";

import useKeydown from "../../hooks/use-keydown";

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([
    {
      id: crypto.randomUUID(),
      message: "Something went wrong!",
      variant: "error",
    },
    {
      id: crypto.randomUUID(),
      message: "17 photos uploaded",
      variant: "success",
    },
  ]);

  const handleEscape = useCallback(() => setToasts([]), []);

  useKeydown("Escape", handleEscape);

  function createToast(message, selected) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message: message,
        variant: selected,
      },
    ];

    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider
      value={{
        toasts,
        createToast,
        dismissToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;

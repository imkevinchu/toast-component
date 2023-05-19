import React, { useState } from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";

import Toast from "../Toast/Toast";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import ToastShelf from "../ToastShelf/ToastShelf";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const defaultSelected = VARIANT_OPTIONS[0];
  const [message, setMessage] = useState("Welcome aboard!");
  const [selected, setSelected] = useState(defaultSelected);
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

  function handleCreateToast(e) {
    e.preventDefault();

    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message: message,
        variant: selected,
      },
    ];

    setMessage("");
    setSelected(defaultSelected);
    setToasts(nextToasts);
  }

  function handleDismissToast(id) {
    const nextToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(nextToasts);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} handleDismissToast={handleDismissToast} />

      <form className={styles.controlsWrapper} onSubmit={handleCreateToast}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variant) => {
              const id = `variant-${variant}`;
              const isSelected = selected === variant;

              return (
                <label htmlFor={id} key={variant}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={variant}
                    checked={isSelected}
                    onChange={(e) => setSelected(variant)}
                  />
                  {variant}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;

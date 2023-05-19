import React, { useContext, useState } from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";

import ToastShelf from "../ToastShelf/ToastShelf";
import { ToastContext } from "../ToastProvider/ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const { createToast } = useContext(ToastContext);

  const defaultSelected = VARIANT_OPTIONS[0];

  const [message, setMessage] = useState("Welcome aboard!");
  const [selected, setSelected] = useState(defaultSelected);

  function handleCreateToast(e) {
    e.preventDefault();

    createToast(message, selected);
    setMessage("");
    setSelected(defaultSelected);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

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

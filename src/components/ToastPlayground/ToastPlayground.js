import React, { useState } from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";

import Toast from "../Toast/Toast";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = useState("Welcome aboard!");
  const [selected, setSelected] = useState("notice");
  const [isToastShown, setIsToastShown] = useState(false);

  function handleShowToast() {
    setIsToastShown(true);
  }

  function handleDismissToast() {
    setIsToastShown(false);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {isToastShown ? (
        <Toast variant={selected} handleDismissToast={handleDismissToast}>
          {message}
        </Toast>
      ) : (
        ""
      )}

      <div className={styles.controlsWrapper}>
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
            <Button onClick={handleShowToast}>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;

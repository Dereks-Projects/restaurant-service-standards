/**
 * Button.js — Reusable button component
 *
 * HOW TO USE:
 *   <Button variant="primary" onClick={handleClick}>Submit</Button>
 *   <Button variant="secondary" fullWidth>Cancel</Button>
 *
 * PROPS:
 *   variant   — "primary" (gold) or "secondary" (outlined). Defaults to primary.
 *   fullWidth — if true, button stretches to fill its container.
 *   children  — the text/content inside the button.
 *   ...rest   — any other props (onClick, type, disabled, etc.) get passed through.
 */

import styles from "./Button.module.css";

export default function Button({
  variant = "primary",
  fullWidth = false,
  children,
  ...rest
}) {
  const classes = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : "",
  ]
    .filter(Boolean) /* removes empty strings */
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
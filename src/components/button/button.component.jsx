import { useCallback } from "react";
import "./button.component.css";

const Button = (props) => {
  const handleClick = useCallback(
    (event) => {
      if (
        !props.disabled &&
        props.onClick &&
        typeof props.onClick === "function"
      ) {
        props.onClick(event);
      }
    },
    [props]
  );

  return (
    <button
      className={`${props.disabled ? "disabled " : ""}`}
      type={props.type}
      onClick={(event) => handleClick(event)}
      id={props.id}
      style={{
        backgroundColor: props.background,
        color: props.color,
      }}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
};

const randomId = `random-id-button-${(1 + Date.now() + Math.random())
  .toString()
  .replace(".", "")}`;

Button.defaultProps = {
  id: randomId,
  background: "#299C39",
  color: "#F6F6F8",
  label: "Confirm",
  type: "submit",
};

export default Button;
